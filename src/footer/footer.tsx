import React, { Component, CSSProperties } from "react";
import '../footer/footer.css'
class Footer extends Component {
  render() {
    const footerStyle: CSSProperties = {
        marginTop: "auto",  // Assurez-vous que le footer pousse vers le bas
        padding: "20px",
        backgroundColor: "transparent",
        textAlign: "center",
        width: "100%",  
      
    };

    return (
      <section className="footer_section" style={footerStyle}>
        <div className="social_box">
          <a href="#">
            <img src="images/facebook.png" alt="Facebook" />
          </a>
          <a href="#">
            <img src="images/twitter.png" alt="Twitter" />
          </a>
          <a href="#">
            <img src="images/linkedin.png" alt="LinkedIn" />
          </a>
          <a href="#">
            <img src="images/instagram.png" alt="Instagram" />
          </a>
          <a href="#">
            <img src="images/youtube.png" alt="YouTube" />
          </a>
        </div>
      </section>
    );
  }
}

export default Footer;
