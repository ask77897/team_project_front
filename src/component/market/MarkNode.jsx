const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

// CORS 설정
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

app.post('/market/image/upload', upload.single('file'), (req, res) => {
  const imagePath = req.file.path;
  res.json({ imagePath });
});

// 기타 서버 설정 및 라우팅...

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});