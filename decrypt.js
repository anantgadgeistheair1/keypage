function rot13(str) {
    return str.replace(/[A-Za-z]/g, function(c) {
        return c <= 'Z'
            ? String.fromCharCode((c.charCodeAt(0) - 65 + 13) % 26 + 65)
            : String.fromCharCode((c.charCodeAt(0) - 97 + 13) % 26 + 97);
    });
}

function decryptKey(finalKey) {
    try {
        let rot13Key = atob(finalKey);
        let base64Key = rot13(rot13Key);
        let originalKey = atob(base64Key);
        return originalKey;
    } catch (e) {
        return null;
    }
}

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCIoD2Zy5yzUmAkO8H6Hk4Jg1EYrK73vUU",
    authDomain: "appdbs-45d54.firebaseapp.com",
    databaseURL: "https://appdbs-45d54-default-rtdb.firebaseio.com",
    projectId: "appdbs-45d54",
    storageBucket: "appdbs-45d54.appspot.com",
    messagingSenderId: "588555582889",
    appId: "1:588555582889:android:de5d432c39e9ae904cd8b8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Upload decrypted key + timestamp with key inside
function uploadKey(key) {
    const timestamp = new Date().toLocaleString();
    const keyRef = db.ref("public_keys/" + key);
    keyRef.set({
        key: key,
        time: timestamp
    });
}

// On page load
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const encrypted = urlParams.get("key");

    const outputEl = document.getElementById("output");
    if (!encrypted) {
        outputEl.innerText = "No key found in URL!";
        return;
    }

    const decrypted = decryptKey(encrypted);
    if (!decrypted) {
        outputEl.innerText = "Invalid or corrupted key";
        return;
    }

    outputEl.innerText = decrypted;

    // Upload to Firebase
    uploadKey(decrypted);
};
