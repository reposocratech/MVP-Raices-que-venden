import React from "react";
import "./footer.css";

const FooterApp = () => {
  return (
    <>
      <footer className="footer-padre">
        <div className="container">
          <div className="row justify-content-center mb-2">
            <div className="col d-flex justify-content-center mt-3 mb-2">
              <a href="https://www.instagram.com/almuyalma.copy" className="text-white mx-4">
                <i
                  className="bi bi-instagram "
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </a>
              <a href="https://www.facebook.com/" className="text-white mx-4">
                <i
                  className="bi bi-facebook "
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </a>
              <a href="https://www.linkedin.com/in/almudenatorreslopez" className="text-white mx-4">
                <i
                  className="bi bi-linkedin "
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </a>
              
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-8">
                <p className="mb-1 text-light">© 2025 Raíces que Venden · Almuyalma</p>
                <p className="mb-2 text-light">
                  Desde Castellón y la terreta, para toda España.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterApp;
