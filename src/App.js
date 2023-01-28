import './style/App.css';
import Web from "./componentas/Qr_web"
import Phone from "./componentas/Qr_phone"
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from './componentas/Index';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <HashRouter>
        <Routes>
          <Route
          path='/'
          element={<Index/>}
          />
          <Route
            path="/Create QR for phone"
            element={<Phone/>}
          />
          <Route
            path="/Create QR for web"
            element={<Web/>}
          />
        </Routes>
      </HashRouter>
      </header>
    </div>
  );
}

export default App;
