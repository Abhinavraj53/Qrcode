const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const qrcode = require("qrcode");
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/generate-qrcode", async (req, res) => {
  const { data } = req.body;
  try {
    const qrCode = await qrcode.toDataURL(data);
    res.send({ qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while generating the QR code.");
  }
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
