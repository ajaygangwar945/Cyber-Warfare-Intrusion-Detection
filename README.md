<img align="center" src="Gemini_Generated_Image_xbjvkqxbjvkqxbjv.png" width="100%" height="200" style="object-fit: cover">
<h1 align="center"> 🛡️ Cyber Warfare Intrusion Detection System </h1>

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-Modeling-blue?style=for-the-badge)
![Cyber Security](https://img.shields.io/badge/Cyber-Security-critical?style=for-the-badge)
![Pandas](https://img.shields.io/badge/Pandas-Data%20Analysis-150458?style=for-the-badge&logo=pandas)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=for-the-badge&logo=scikitlearn)
![Matplotlib](https://img.shields.io/badge/Matplotlib-Visualization-11557C?style=for-the-badge)
![Flask](https://img.shields.io/badge/Flask-Web%20App-000000?style=for-the-badge&logo=flask&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge)
</div>

<div align="center">

### 🌐 **[Live Demo](https://cyber-warfare-intrusion-detection.onrender.com/)** 🌐

[![Render Deploy Status](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://cyber-warfare-intrusion-detection.onrender.com)

*An interactive, real-time intrusion detection dashboard with ML-powered threat analysis, featuring dark/light mode with optimized accessibility, 12 real-time statistics cards, and 6 interactive charts.*

</div>

---

<p align="center">
<b>Detecting, Analyzing, and Preventing Cyber Attacks Using Machine Learning</b>
</p>

---

## 📌 Project Overview

<p align="justify">
The <b>Cyber Warfare Intrusion Detection System</b> is a cybersecurity project designed to detect <b>malicious activities and cyber attacks</b> within a network. Using <b>machine learning algorithms</b>, the system classifies network traffic as <b>normal or intrusive</b>, helping to identify cyber warfare threats such as <b>DDoS attacks, probing, malware, and unauthorized access</b>.
</p>

<p align="justify">
This project demonstrates real-world applications of <b>Cyber Security</b>, <b>Data Analysis</b>, and <b>Machine Learning</b>.
</p>

---

## 🎯 Objectives

* 🔍 **Detect** cyber intrusions in network traffic  
* 🧠 **Apply** machine learning for attack classification  
* 📊 **Analyze** patterns in network data  
* 🚨 **Identify** cyber warfare threats early  
* 🛡️ **Improve** network security and reliability  

---

## ⚙️ Features

### 🔍 Core Functionality

* ✔️ Network traffic monitoring (Simulated)  
* ✔️ Intrusion detection (Normal vs Attack)  
* ✔️ Multi-attack classification  
* ✔️ Machine learning–based prediction (SVM with RBF Kernel)  
* ✔️ Data preprocessing & feature extraction  
* ✔️ **Simulated Live Traffic Generation** (for safe demonstration)  

### 🎨 Interactive Dashboard

* ✔️ **Dark/Light Mode Toggle** with optimized accessibility and high contrast  
* ✔️ **12 Real-Time Statistics Cards** displaying key metrics  
* ✔️ **Animated Threat Level Gauge** with color-coded status  
* ✔️ **Live Detection Feed** with timestamp logging  
* ✔️ **6 Interactive Charts** (Protocol Distribution, Attack Analysis, Services, Timeline, Flags, Traffic Volume)  
* ✔️ **Responsive Design** optimized for desktop and mobile devices  

---

## 🧠 Machine Learning Workflow

1. **Dataset Collection:** Gathering raw network traffic logs (e.g., NSL-KDD or UNSW-NB15).  
2. **Data Cleaning & Preprocessing:** Handling missing values and encoding categorical data.  
3. **Feature Selection & Scaling:** Identifying key indicators of attacks and normalizing data.  
4. **Model Training:** Training various supervised learning algorithms.  
5. **Model Evaluation:** Testing using Accuracy, Precision, Recall, and F1-Score.  
6. **Intrusion Prediction:** Real-time classification of incoming traffic.

---

## 🧪 Algorithms Used

* **Logistic Regression:** For baseline binary classification.
* **Decision Tree:** For capturing non-linear relationships.
* **Random Forest:** To improve accuracy through ensemble learning.
* **Support Vector Machine (SVM):** For high-dimensional data separation.
* **K-Nearest Neighbors (KNN):** For pattern-based proximity classification.

---

## 📂 Project Structure

```text
Cyber-Warfare-Intrusion-Detection/
│
├── static/                      # Frontend Assets
│   ├── css/
│   │   └── style.css           # Modern Cyber Theme CSS with Dark/Light Mode Variables
│   ├── images/
│   │   └── favicon.svg         # Shield Icon Favicon
│   └── js/
│       └── main.js             # Dashboard Logic, Chart.js Integration & Theme Toggle
│
├── templates/                   # Flask HTML Templates
│   └── index.html              # Main Dashboard with 12 Stats Cards & 6 Charts
│
├── app.py                       # Flask Backend API (Stats, Simulation, Model Inference)
├── intrusion_model.pkl          # Trained SVM Model (RBF Kernel, 98.5% Accuracy)
├── CyberWarfareIntrusionDetection.csv     # Network Traffic Dataset (25,192 records)
├── CyberWarfareIntrusionDetection.ipynb   # Jupyter Notebook (EDA, Training, Evaluation)
├── requirements.txt             # Python Dependencies (Flask, Scikit-Learn, Pandas, etc.)
├── run.bat                      # Windows Batch Script (Auto Setup & Launch)
├── .gitignore                   # Git Exclusions (venv, __pycache__, .pkl)
├── README.md                    # Project Documentation
└── Gemini_Generated_Image_xbjvkqxbjvkqxbjv.png  # Header Banner Image
```

---

## 🛠️ Technologies Used

<div align="left">

![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-Modeling-blue?style=for-the-badge)
![Pandas](https://img.shields.io/badge/Pandas-Data%20Analysis-150458?style=for-the-badge&logo=pandas)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=for-the-badge&logo=scikitlearn)
![Matplotlib](https://img.shields.io/badge/Matplotlib-Visualization-11557C?style=for-the-badge)

</div>

---

## 🚀 How to Run the Project

### 1️⃣ Clone the Repository

   ```bash
   git clone https://github.com/ajaygangwar945/Cyber-Warfare-Intrusion-Detection.git
   ```

### 2️⃣ Navigate to the project directory

   ```bash
   cd Cyber-Warfare-Intrusion-Detection
   ```

### 3️⃣ Run via Script (Windows)

Simply run the batch file to set up the environment and start the app:

```bash
./run.bat
```

---

## 📊 Exploratory Data Analysis (EDA)

The project includes as consolidated Jupyter Notebook for deep analysis. You can explore the dataset, model training, and visualizations:

* 📓 **Notebook**: [CyberWarfareIntrusionDetection.ipynb](CyberWarfareIntrusionDetection.ipynb)
* 📈 **Features**: Data visualization, correlation analysis, and algorithm comparison.

---

## 📊 Results & Performance

* 📈 **High Detection Accuracy** using ensemble models  
* 🔎 **Effective Attack Classification** (Normal vs Intrusion)  
* 📉 **Reduced False Positives** through feature selection  
* 📊 **Visual Insights** using confusion matrix & accuracy plots  

<div align="left">

![Accuracy](https://img.shields.io/badge/Model-High%20Accuracy-brightgreen?style=for-the-badge)
![Evaluation](https://img.shields.io/badge/Evaluation-Precision%20%7C%20Recall%20%7C%20F1-blue?style=for-the-badge)

</div>

---

## 📈 Evaluation Metrics

* Accuracy
* Precision
* Recall
* F1-Score
* Confusion Matrix

---

## 🔐 Cyber Warfare Use Cases

* 🪖 Military & defense networks  
* 🏛️ Government infrastructure  
* 💳 Financial institutions  
* 🏢 Enterprise security systems  
* ⚡ Critical infrastructure protection  

---

## 🎨 Interactive Dashboard Features

### 📊 Statistics & Monitoring

* **12 Real-Time Statistics Cards**: Total records, normal traffic, threats detected, detection accuracy, protocols monitored, active services, active connections, response time, blocked attacks, system uptime, packet loss, and server load
* **Animated Threat Level Gauge**: Circular indicator with rotating gradient showing current security status
* **Live Detection Feed**: Real-time scrolling log with color-coded entries (green=safe, red=threat) showing timestamp, protocol, service, and confidence levels

### 📈 Data Visualization

* **Protocol Distribution** (Doughnut Chart): TCP, UDP, ICMP traffic breakdown
* **Attack Type Analysis** (Pie Chart): Normal vs Anomaly classification
* **Top Services** (Bar Chart): Most active network services
* **Detection Timeline** (Line Chart): Real-time threat detection over time
* **Flag Distribution** (Polar Area Chart): Network flag analysis
* **Traffic Volume Analysis** (Bar Chart): Data transfer metrics

### 🎨 User Experience

* **Dark/Light Mode Toggle**: Seamlessly switch between themes with optimized contrast and accessibility
* **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
* **Modern Cyber Aesthetic**: Futuristic design with glowing accents, smooth animations, and glassmorphism effects
* **Real-Time Updates**: Live simulation with auto-start detection after 3 seconds

---

## 🚀 Deployment (Render)

### Direct Deploy Settings

* **Build Command:** `pip install -r requirements.txt`
* **Start Command:** `gunicorn app:app`

---

<div align="center">

⭐ Star this repository if you found it useful  
🛡️ Built with Machine Learning for Cyber Defense  

</div>
