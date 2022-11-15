const moment = require("moment");
const PDFDocument = require("pdfkit");
const path = require("path");





const genCert = async (req, res, next) => {

    const doc = new PDFDocument({
        layout: "landscape",
        size: "A4",
    });
    res.setHeader('Content-type', 'application/pdf');



    // The name
    const name = req.params.name
    const absPath = path.join(__dirname, "../certificate-Templates/cert2/images/certificate.png"); // <-- absolute path

    doc.image(absPath, 0, 0, { width: 842 });
    const absPath1 = path.join(__dirname, "../certificate-Templates/cert2/fonts/DancingScript-VariableFont_wght.ttf"); // <-- absolute path
    doc.font(absPath1);
    doc.fontSize(60).text(name, 60, 290, {
        align: "center"
    });
    doc.fontSize(17).text(moment().format("MMMM Do YYYY"), 375, 480, {
        align: "center"
    });
    doc.pipe(res);
    doc.end();
};

exports.genCert = genCert;