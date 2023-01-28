import React, { useState, useRef } from "react";
import QRious from "qrious";
import "../style/Pages.css";
import 'primeicons/primeicons.css';
import { Link } from "react-router-dom";

export default function MyComponent() {
  const [qrcodeString, setQrcodeString] = useState(null);
  const phoneRef = useRef(null);
  const txtRef = useRef(null);
  const imgRef = useRef(null);
  const [location, setLocation] = useState("Israel");
  const [phone, setPhone] = useState("");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  let pattern;
  switch (location) {
    case "Israel":
      pattern = "[+]{1}[972]{3}[0-9]{7}";
      break;
    case "USA":
      pattern = "[+]{1}[1]{1}[0-9]{10}";
      break;
    case "UK":
      pattern = "[+]{1}[44]{2}[0-9]{9}";
      break;
    default:
      pattern = "[0-9]{11}";
  }

  const handleCreateQR = () => {
    if (!phoneRef.current || phone === "") return;
    const qr = new QRious({
      element: imgRef.current,
      value: `https://api.whatsapp.com/send?phone=${phoneRef.current.value}&text=${txtRef.current.value}`,
      size: 200,
      level: "H",
      background: "rgba(0, 0, 0, 0)",
    });
    setQrcodeString(qr.toDataURL());
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
      <div className="select-container">
        <h1>create Qr for your whatsApp</h1>
        <label htmlFor="location" className="label">
          Location:
        </label>
        <select id="location" value={location} onChange={handleLocationChange}>
          <option value="Israel">Israel</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
      </div>
      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        pattern={pattern}
        value={phone}
        ref={phoneRef}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={`+${location === "Israel" ? "972" : "1"}...`}
      /><br/>
      <label htmlFor={"message"}>Message:</label>
      <input type="text" ref={txtRef} placeholder="Enter Text" />
      <br />
      <button onClick={handleCreateQR}>Create QR</button>
      {qrcodeString ? (
        <>
          <button onClick={handleSave}>Save</button>
          <br />
          <img ref={imgRef} src={qrcodeString} alt="QR code" />
        </>
      ) : null}
    </div>
  );
}
