import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

class Footer extends React.Component {
  render() {
    return (
      <footer id="footer" className="footer">
        <div id="copyright">
          <p>
            Copyright © 2019 <a href="https://lightrow.github.io">John Gro</a>. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
