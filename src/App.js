import React, { useState } from "react";
import axios from "axios";
import './App.css';



function App() {
  const [data, setData] = useState("");
  const [qrCode, setQRCode] = useState("");

  const handleInputChange = (event) => {
    setData(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/generate-qrcode", { data });
      setQRCode(response.data.qrCode);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCode;
    downloadLink.download = "qrcode.png";
    downloadLink.click();
  };

  return (
    <body>
      <h1>Convert Text to QR Code</h1>
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Data:
          <input type="text" value={data} onChange={handleInputChange} />
        </label>
        <button type="submit">Generate QR Code</button>
      </form>
      {qrCode && (
        <>
          <img src={qrCode} alt="QR code" />
          <button onClick={handleDownload}>Download QR Code</button>
        </>
      )}
    </div>
    </body>
  );
}

export default App;
