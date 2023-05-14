const downloadQRCard = () => {
  const QRCard = document.getElementsByClassName("QRCard")[0];
  const QRButton = document.getElementById("downloadQRCardButton");

  /**
   * 3 main states in the app - loading, error and data
   */

  QRButton.addEventListener("click", async () => {
    // Set state to loading
    QRButton.innerHTML = "Loading...";
    QRButton.disabled = true;

    try {
      const canvas = await html2canvas(QRCard);

      // Resize the div card to fit
      const cardWidth = 400;
      const cardHeight = canvas.height * (cardWidth / canvas.width); // adjust height to suit

      //file types to convert for download
      const fileTypes = ["png", "eps", "svg", "pdf"];

      //create a zip file
      const zip = new JSZip();

      // image data of the canvas element as a base64 encoded string
      const pngImg = canvas.toDataURL("image/png");

      fileTypes.forEach((fileType) => {
        switch (fileType) {
          case "png":
            zip.file("QRCard.png", pngImg.split("base64,")[1], {
              base64: true,
            });
            break;
          case "eps":
            zip.file("QRCard.eps", pngImg.split("base64,")[1], {
              base64: true,
            });
            break;
          case "pdf":
            if (!window.jsPDF) window.jsPDF = window.jspdf.jsPDF;

            //PDF document - portrait, px sizing, a4
            const cardPdf = new jsPDF("p", "px", "a4");

            // Center the div on the page
            const x = (cardPdf.internal.pageSize.width - cardWidth) / 2;
            const y = (cardPdf.internal.pageSize.height - cardHeight) / 2;

            cardPdf.addImage(pngImg, "PNG", x, y, cardWidth, cardHeight);
            const pdfDoc = cardPdf.output("datauristring");
            zip.file("QRCard.pdf", pdfDoc.split("base64,")[1], {
              base64: true,
            });
            break;
        }
      });

      const zipContent = await zip.generateAsync({ type: "blob" });
      saveAs(zipContent, "QRCards.zip");
    } catch (error) {
      throw new Error(error);
    } finally {
      // Restore the button text
      QRButton.innerHTML = "Download";
      QRButton.disabled = false;
    }
  });
};

downloadQRCard();
