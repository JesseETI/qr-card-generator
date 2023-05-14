const generateQR = () => {
  const QRInputElement = document.getElementById("QRInput");
  const QRCodeElement = document.getElementById("QRCode");
  const QRButton = document.getElementById("downloadQRCardButton");

  const githubPlug = "https://github.com/JesseETI";

  /**
   * Initial states - set to plug to my GitHub profile
   */
  QRInputElement.value = githubPlug;
  let QRCodeObj = new QRCode(QRCodeElement, {
    text: githubPlug,
  });

  /**
   *
   * When user enters the text, capture in inputText, clear previous QR Code and make new code,
   * if empty, hide QR Element
   * if errors occur, throw error object with desc.
   */
  QRInputElement.addEventListener("input", () => {
    const inputText = QRInputElement.value.trim();
    QRButton.disabled = inputText ? false : true;

    QRCodeObj.clear();

    try {
      QRCodeObj.makeCode(inputText);
      QRCodeElement.style.display = inputText ? "block" : "none";
    } catch (error) {
      throw new Error(error);
    }
  });
};

generateQR();
