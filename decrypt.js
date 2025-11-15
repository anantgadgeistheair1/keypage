function rot13(str) {
    return str.replace(/[A-Za-z]/g, function(c) {
        return c <= 'Z'
            ? String.fromCharCode((c.charCodeAt(0) - 65 + 13) % 26 + 65)
            : String.fromCharCode((c.charCodeAt(0) - 97 + 13) % 26 + 97);
    });
}

function decryptKey(finalKey) {
    try {
        // Step 1: Base64 decode
        let rot13Key = atob(finalKey);

        // Step 2: ROT13 decode (same as encode)
        let base64Key = rot13(rot13Key);

        // Step 3: Base64 decode – original 10-char key
        let originalKey = atob(base64Key);

        return originalKey;
    } catch (e) {
        return "Invalid or corrupted key";
    }
}

// Read ?key= from URL
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const encrypted = urlParams.get("key");

    if (!encrypted) {
        document.getElementById("output").innerText = "No key found in URL!";
        return;
    }

    const decrypted = decryptKey(encrypted);
    document.getElementById("output").innerText = decrypted;
};
