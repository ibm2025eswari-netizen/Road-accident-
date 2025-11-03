// Function to update the UI when a pothole is detected
function triggerPotholeAlert() {
    const alertDisplay = document.getElementById('alert-display');
    const alertLog = document.getElementById('alert-log');

    // 1. Update Display (HTML & CSS)
    alertDisplay.textContent = '!!! POTHOLE AHEAD - SLOW DOWN !!!';
    alertDisplay.classList.remove('alert-safe');
    alertDisplay.classList.add('alert-warning');

    // 2. Voice Alert (Addresses: "voice alert like 'Pothole ahead - slow down'")
    speakAlert('Pothole ahead. Slow down immediately.');

    // 3. Log the Event (Addresses feedback: "store locations")
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    // In a real app, you would get the actual GPS location here
    const location = "Lat: 10.7N, Lon: 79.1E (Simulated)"; 
    
    const newLogEntry = document.createElement('li');
    newLogEntry.textContent = `[${timeString}] ALERT: Pothole detected at ${location}`;
    alertLog.prepend(newLogEntry); // Add to the top of the log

    // Set a timeout to reset the alert after 5 seconds
    setTimeout(resetAlert, 5000); 
}

// Function to reset the dashboard to a safe state
function resetAlert() {
    const alertDisplay = document.getElementById('alert-display');
    alertDisplay.textContent = 'Road Clear. Drive Safe.';
    alertDisplay.classList.remove('alert-warning');
    alertDisplay.classList.add('alert-safe');
}

// Function to use the browser's Text-to-Speech API
function speakAlert(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.2; // Speak a bit faster
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    } else {
        console.warn('Text-to-Speech not supported in this browser.');
    }
}

// SIMULATED SENSOR DATA COMMUNICATION:
// In a real application, you would replace the button click with
// an event listener that receives data from your C-programmed sensor device
/*
function initSensorConnection() {
    // Code here for Bluetooth/Serial connection to receive data
    // When data is received: triggerPotholeAlert();
}
// window.onload = initSensorConnection; 
*/