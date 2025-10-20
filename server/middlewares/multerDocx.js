import multer from "multer";
import path from "path";

function uploadDocx(folder) {
  const storage = multer.diskStorage({
    destination: `./public/docs/${folder}`,
    filename: function (req, file, callback) {
      callback(null, "Doc-" + Date.now() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, callback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".docx") {
      callback(null, true);
    } else {
      callback(new Error("Formato de archivo incorrecto. Solo docx"), false);
    }
  };

  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
  }).single("docx");

  return upload;
}

export default uploadDocx;