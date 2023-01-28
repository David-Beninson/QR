import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Pages.css';
export default function Index() {
  return (
    <div style={{ textAlign: "center" }}>
    <Link to={"/Create QR for phone"}>
        <button>Create QR for phone</button>
      </Link> {''}
      <Link to={"/Create QR for web"}>
      <button>Create QR for web</button>
      </Link>
    </div>
  )
}
