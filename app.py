from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import pickle
import os
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.svm import SVC
import json

app = Flask(__name__)

# Global variables for model and data
model = None
scaler = None
label_encoders = {}
feature_columns = []
df_stats = None

def load_model_and_data():
    """Load the trained model and dataset statistics"""
    global model, scaler, label_encoders, feature_columns, df_stats
    
    try:
        # Load the dataset for statistics
        csv_path = os.path.join(os.path.dirname(__file__), '..', 'CyberWarfareIntrusionDetection.csv')
        df = pd.read_csv(csv_path)
        
        # Store statistics
        label_col = 'class' if 'class' in df.columns else 'label'
        df_stats = {
            'total_records': len(df),
            'normal_count': len(df[df[label_col] == 'normal']),
            'anomaly_count': len(df[df[label_col] == 'anomaly']),
            'protocols': df['protocol_type'].value_counts().to_dict(),
            'services': df['service'].value_counts().head(10).to_dict(),
            'flags': df['flag'].value_counts().to_dict()
        }
        
        # Prepare data for model training if model doesn't exist
        # Encode categorical variables
        categorical_columns = ['protocol_type', 'service', 'flag']
        
        for col in categorical_columns:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col])
            label_encoders[col] = le
        
        # Prepare features and target
        label_col = 'class' if 'class' in df.columns else 'label'
        X = df.drop(label_col, axis=1)
        y = df[label_col]
        
        # Encode target
        le_target = LabelEncoder()
        y = le_target.fit_transform(y)
        label_encoders['label'] = le_target
        
        # Scale features
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        feature_columns = X.columns.tolist()
        
        # Train a simple SVM model (or load if exists)
        model_path = 'intrusion_model.pkl'
        if os.path.exists(model_path):
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
        else:
            # Train a simple model for demonstration
            from sklearn.model_selection import train_test_split
            X_train, X_test, y_train, y_test = train_test_split(
                X_scaled, y, test_size=0.2, random_state=42
            )
            model = SVC(kernel='rbf', random_state=42)
            model.fit(X_train, y_train)
            
            # Save the model
            with open(model_path, 'wb') as f:
                pickle.dump(model, f)
        
        print("Model and data loaded successfully!")
        return True
        
    except Exception as e:
        print(f"Error loading model and data: {e}")
        return False

@app.route('/')
def index():
    """Main dashboard page"""
    return render_template('index.html')

@app.route('/api/stats')
def get_stats():
    """Get dataset statistics"""
    if df_stats is None:
        return jsonify({'error': 'Data not loaded'}), 500
    
    return jsonify(df_stats)

@app.route('/api/predict', methods=['POST'])
def predict():
    """Predict if network traffic is normal or anomaly"""
    try:
        data = request.json
        
        # Create a DataFrame from input
        input_df = pd.DataFrame([data])
        
        # Encode categorical variables
        for col in ['protocol_type', 'service', 'flag']:
            if col in input_df.columns and col in label_encoders:
                input_df[col] = label_encoders[col].transform(input_df[col])
        
        # Ensure all features are present
        for col in feature_columns:
            if col not in input_df.columns:
                input_df[col] = 0
        
        # Reorder columns to match training data
        input_df = input_df[feature_columns]
        
        # Scale features
        input_scaled = scaler.transform(input_df)
        
        # Make prediction
        prediction = model.predict(input_scaled)[0]
        prediction_proba = model.decision_function(input_scaled)[0]
        
        # Decode prediction
        prediction_label = label_encoders['label'].inverse_transform([prediction])[0]
        
        # Calculate confidence (normalize decision function output)
        confidence = abs(prediction_proba) / (abs(prediction_proba) + 1) * 100
        
        return jsonify({
            'prediction': prediction_label,
            'confidence': round(confidence, 2),
            'is_threat': prediction_label == 'anomaly'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/simulate')
def simulate_detection():
    """Simulate real-time detection for demonstration"""
    import random
    
    protocols = ['tcp', 'udp', 'icmp']
    services = ['http', 'ftp', 'smtp', 'ssh', 'dns']
    flags = ['SF', 'S0', 'REJ', 'RSTR']
    
    # Generate random network traffic
    traffic = {
        'protocol_type': random.choice(protocols),
        'service': random.choice(services),
        'flag': random.choice(flags),
        'src_bytes': random.randint(0, 10000),
        'dst_bytes': random.randint(0, 10000),
        'duration': random.randint(0, 1000)
    }
    
    # Random prediction for simulation
    is_anomaly = random.random() > 0.7  # 30% chance of anomaly
    
    return jsonify({
        'traffic': traffic,
        'prediction': 'anomaly' if is_anomaly else 'normal',
        'confidence': round(random.uniform(75, 99), 2),
        'timestamp': pd.Timestamp.now().isoformat()
    })

if __name__ == '__main__':
    # Load model and data on startup
    if load_model_and_data():
        print("Starting Flask application...")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("Failed to load model and data. Please check the files.")
