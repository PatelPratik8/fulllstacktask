const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, "./uploads");
  },
  filename: function (req: Request, file: any, cb: any) {
    // console.log(file);
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

export default upload
