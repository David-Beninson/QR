import React, { useState,  useRef } from "react";
import qrcode from "qrcode-generator";
import '../style/Pages.css';
import 'primeicons/primeicons.css';
import { Link } from "react-router-dom";

function MyComponent() {
  const refLink = useRef(null);
  const [qrcodeString, setQrcodeString] = useState("");
const [web, setweb] = useState('')
  const handleCreateQR = () => {
    if(!refLink.current || web === '')return
      const data = refLink.current.value;
      const typeNumber = 4;
      const errorCorrectionLevel = "L";
      const qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData(data);
      qr.make();

      const canvas = document.createElement("canvas");
      canvas.width = qr.getModuleCount() * 5;
      canvas.height = qr.getModuleCount() * 5;
      const ctx = canvas.getContext("2d");
      for (let row = 0; row < qr.getModuleCount(); row++) {
        for (let col = 0; col < qr.getModuleCount(); col++) {
          ctx.fillStyle = qr.isDark(row, col) ? "#000" :  "rgba(0, 0, 0, 0)";
          ctx.fillRect(col * 5, row * 5, 5, 5);
        }
      }
      setQrcodeString(canvas.toDataURL());
  };

  const handleSave = () => {
    // check if QR code has been generated
    if (qrcodeString) {
      // create a link element
      const link = document.createElement("a");
      // set link's href to QR code image data
      link.href = qrcodeString;
      // set the file name
      link.download = "qrcode.png";
      // trigger the download
      link.click();
    } else {
      alert("QR code has not been generated yet!");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
    <Link id="homePage" to={'/'}><i className="pi pi-arrow-left"></i></Link> 
    <h1>create Qr for a Web</h1>
      <input
        type="text"
        ref={refLink}
        value={web}
        onChange={(e) => setweb(e.target.value)}
        placeholder="Enter web page"/>
      <br />
      <button
        onClick={handleCreateQR} >
        Create QR
      </button>
      {qrcodeString ? (
        <>
          <button
            onClick={handleSave}>
            Save
          </button>
          <br />
          <img
            src={qrcodeString}
            alt="QR code"/>
        </>
      ) : null}
    </div>
  );
}
export default MyComponent;
