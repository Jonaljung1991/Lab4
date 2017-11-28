let loaded = function () {
    function generateNumber() {
        let xNumber = Math.floor(Math.random() * 10);
        return xNumber;
    };

    function generateString() {
        let randomLetter = "";
        let alphabet = "abcdefghijklmnopqrstuvwxyz";

        while (randomLetter < 6)
            randomLetter += alphabet[Math.floor(Math.random() * alphabet.length)];
        return randomLetter;
    };

    function generateKey() {
        let accessKey = "";

        accessKey += generateString() + generateNumber() + generateString().toUpperCase() + generateString().toUpperCase() + generateNumber();
        return accessKey;
    };

    console.log(generateKey());
};

window.addEventListener("load", loaded);