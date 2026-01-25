// Cyber Warfare Intrusion Detection - Main JavaScript

let simulationInterval = null;
let isSimulating = false;
let charts = {};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeButton(true);
    }

    loadStatistics();
    initializeCharts();
    addWelcomeMessage();
});

// Toggle theme function
function toggleTheme() {
    const body = document.body;
    const isLightMode = body.classList.toggle('light-mode');

    // Save preference
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');

    // Update button
    updateThemeButton(isLightMode);
}

// Update theme button text and icon
function updateThemeButton(isLightMode) {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    if (isLightMode) {
        themeIcon.textContent = '🌙';
        themeToggle.childNodes[2].textContent = ' Dark Mode';
    } else {
        themeIcon.textContent = '☀️';
        themeToggle.childNodes[2].textContent = ' Light Mode';
    }
}

// Load statistics from API
async function loadStatistics() {
    try {
        const response = await fetch('/api/stats');
        const data = await response.json();

        // Update stat cards
        document.getElementById('total-records').textContent = formatNumber(data.total_records);
        document.getElementById('normal-count').textContent = formatNumber(data.normal_count);
        document.getElementById('anomaly-count').textContent = formatNumber(data.anomaly_count);

        // Update new stat cards
        document.getElementById('protocol-count').textContent = Object.keys(data.protocols).length;
        document.getElementById('services-count').textContent = Object.keys(data.services).length;

        // Simulate active connections (random for demo)
        const activeConnections = Math.floor(Math.random() * 500) + 100;
        document.getElementById('connections').textContent = formatNumber(activeConnections);

        // Update blocked attacks (same as anomaly count)
        document.getElementById('blocked-attacks').textContent = formatNumber(data.anomaly_count);

        // Update charts with real data
        updateProtocolChart(data.protocols);
        updateServicesChart(data.services);
        updateFlagChart(data.flags);
        updateTrafficChart(data.normal_count, data.anomaly_count);

    } catch (error) {
        console.error('Error loading statistics:', error);
        addLogEntry('ERROR', 'Failed to load statistics', 'threat');
    }
}

// Initialize all charts
function initializeCharts() {
    // Protocol Distribution Chart
    const protocolCtx = document.getElementById('protocolChart').getContext('2d');
    charts.protocol = new Chart(protocolCtx, {
        type: 'doughnut',
        data: {
            labels: ['TCP', 'UDP', 'ICMP'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(0, 255, 159, 0.8)',
                    'rgba(0, 212, 255, 0.8)',
                    'rgba(255, 0, 85, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 255, 159, 1)',
                    'rgba(0, 212, 255, 1)',
                    'rgba(255, 0, 85, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Rajdhani',
                            size: 14
                        }
                    }
                }
            }
        }
    });

    // Attack Type Chart
    const attackCtx = document.getElementById('attackChart').getContext('2d');
    charts.attack = new Chart(attackCtx, {
        type: 'pie',
        data: {
            labels: ['Normal', 'Anomaly'],
            datasets: [{
                data: [70, 30],
                backgroundColor: [
                    'rgba(0, 255, 159, 0.8)',
                    'rgba(255, 0, 85, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 255, 159, 1)',
                    'rgba(255, 0, 85, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Rajdhani',
                            size: 14
                        }
                    }
                }
            }
        }
    });

    // Services Chart
    const servicesCtx = document.getElementById('servicesChart').getContext('2d');
    charts.services = new Chart(servicesCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Requests',
                data: [],
                backgroundColor: 'rgba(0, 212, 255, 0.8)',
                borderColor: 'rgba(0, 212, 255, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Timeline Chart
    const timelineCtx = document.getElementById('timelineChart').getContext('2d');
    charts.timeline = new Chart(timelineCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Normal',
                data: [],
                borderColor: 'rgba(0, 255, 159, 1)',
                backgroundColor: 'rgba(0, 255, 159, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Threats',
                data: [],
                borderColor: 'rgba(255, 0, 85, 1)',
                backgroundColor: 'rgba(255, 0, 85, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Rajdhani',
                            size: 14
                        }
                    }
                }
            }
        }
    });

    // Flag Distribution Chart
    const flagCtx = document.getElementById('flagChart').getContext('2d');
    charts.flag = new Chart(flagCtx, {
        type: 'polarArea',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgba(0, 255, 159, 0.7)',
                    'rgba(0, 212, 255, 0.7)',
                    'rgba(255, 0, 85, 0.7)',
                    'rgba(255, 170, 0, 0.7)',
                    'rgba(138, 43, 226, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 255, 159, 1)',
                    'rgba(0, 212, 255, 1)',
                    'rgba(255, 0, 85, 1)',
                    'rgba(255, 170, 0, 1)',
                    'rgba(138, 43, 226, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Rajdhani',
                            size: 12
                        }
                    }
                }
            },
            scales: {
                r: {
                    ticks: {
                        color: '#e0e0e0',
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });

    // Traffic Volume Chart
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    charts.traffic = new Chart(trafficCtx, {
        type: 'bar',
        data: {
            labels: ['Normal', 'Anomaly'],
            datasets: [{
                label: 'Bytes Transferred',
                data: [0, 0],
                backgroundColor: [
                    'rgba(0, 255, 159, 0.8)',
                    'rgba(255, 0, 85, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 255, 159, 1)',
                    'rgba(255, 0, 85, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Rajdhani'
                        },
                        callback: function (value) {
                            return value.toLocaleString() + ' MB';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Update protocol chart with real data
function updateProtocolChart(protocols) {
    if (charts.protocol && protocols) {
        const labels = Object.keys(protocols);
        const data = Object.values(protocols);

        charts.protocol.data.labels = labels;
        charts.protocol.data.datasets[0].data = data;
        charts.protocol.update();
    }
}

// Update services chart with real data
function updateServicesChart(services) {
    if (charts.services && services) {
        const labels = Object.keys(services);
        const data = Object.values(services);

        charts.services.data.labels = labels;
        charts.services.data.datasets[0].data = data;
        charts.services.update();
    }
}

// Update flag chart with real data
function updateFlagChart(flags) {
    if (charts.flag && flags) {
        const labels = Object.keys(flags);
        const data = Object.values(flags);

        charts.flag.data.labels = labels;
        charts.flag.data.datasets[0].data = data;
        charts.flag.update();
    }
}

// Update traffic chart with real data
function updateTrafficChart(normalCount, anomalyCount) {
    if (charts.traffic) {
        // Simulate bytes transferred (in MB)
        const normalBytes = Math.floor(normalCount * 0.5); // Avg 0.5 MB per normal connection
        const anomalyBytes = Math.floor(anomalyCount * 0.3); // Avg 0.3 MB per anomaly

        charts.traffic.data.datasets[0].data = [normalBytes, anomalyBytes];
        charts.traffic.update();
    }
}

// Start/Stop simulation
function startSimulation() {
    const btn = document.getElementById('sim-btn-text');

    if (!isSimulating) {
        isSimulating = true;
        btn.textContent = 'Stop Detection';
        addLogEntry('SYSTEM', 'Live detection started', 'safe');

        simulationInterval = setInterval(simulateDetection, 2000);
    } else {
        isSimulating = false;
        btn.textContent = 'Start Live Detection';
        clearInterval(simulationInterval);
        addLogEntry('SYSTEM', 'Live detection stopped', 'safe');
    }
}

// Simulate detection
async function simulateDetection() {
    try {
        const response = await fetch('/api/simulate');
        const data = await response.json();

        const timestamp = new Date(data.timestamp).toLocaleTimeString();
        const traffic = data.traffic;
        const prediction = data.prediction;
        const confidence = data.confidence;

        const logType = prediction === 'anomaly' ? 'threat' : 'safe';
        const icon = prediction === 'anomaly' ? '⚠️' : '✅';
        const message = `${icon} [${timestamp}] ${traffic.protocol_type.toUpperCase()} | ${traffic.service} | ${prediction.toUpperCase()} (${confidence}% confidence)`;

        addLogEntry('DETECTION', message, logType);

        // Update threat status if anomaly detected
        if (prediction === 'anomaly') {
            updateThreatStatus('ELEVATED');
            setTimeout(() => updateThreatStatus('SECURE'), 5000);
        }

        // Update timeline chart
        updateTimelineChart(timestamp, prediction);

    } catch (error) {
        console.error('Error in simulation:', error);
    }
}

// Add log entry
function addLogEntry(type, message, logType = 'safe') {
    const logContainer = document.getElementById('detection-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${logType}`;
    entry.innerHTML = `<strong>[${type}]</strong> ${message}`;

    logContainer.insertBefore(entry, logContainer.firstChild);

    // Keep only last 50 entries
    while (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// Update threat status
function updateThreatStatus(status) {
    const statusElement = document.getElementById('threat-status');
    statusElement.textContent = status;

    if (status === 'ELEVATED') {
        statusElement.style.color = 'var(--accent-red)';
        statusElement.style.textShadow = 'var(--glow-red)';
    } else {
        statusElement.style.color = 'var(--accent-green)';
        statusElement.style.textShadow = 'var(--glow-green)';
    }
}

// Update timeline chart
function updateTimelineChart(timestamp, prediction) {
    if (charts.timeline) {
        const labels = charts.timeline.data.labels;
        const normalData = charts.timeline.data.datasets[0].data;
        const threatData = charts.timeline.data.datasets[1].data;

        labels.push(timestamp);
        normalData.push(prediction === 'normal' ? 1 : 0);
        threatData.push(prediction === 'anomaly' ? 1 : 0);

        // Keep only last 20 data points
        if (labels.length > 20) {
            labels.shift();
            normalData.shift();
            threatData.shift();
        }

        charts.timeline.update();
    }
}

// Add welcome message
function addWelcomeMessage() {
    setTimeout(() => {
        addLogEntry('SYSTEM', 'All systems operational. Ready for threat detection.', 'safe');
    }, 1000);
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Auto-start simulation after 3 seconds
setTimeout(() => {
    if (!isSimulating) {
        startSimulation();
    }
}, 3000);
