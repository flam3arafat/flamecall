import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import phone from "../../assets/img/phone.svg";
import phonecreate from "../../assets/img/phone-create.png";
import phoneedit from "../../assets/img/phone-edit.png";
import phonedelete from "../../assets/img/phone-delete.png";
import phoneview from "../../assets/img/phone-view.png";
import "./landing.scss";

function Landing() {
  return (
    <div className="landing">
      <div className="hero">
        <div className="content">
          <h1>
            Manage your <span>phonebook</span> the easy way
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed
            tortor eget quam dapibus consectetur. Curabitur vel fringilla est.
          </p>
          <Link to="/signup">Signup</Link>
        </div>
        <div className="illustration">
          <object
            className="phone"
            data={phone}
            type="image/svg+xml"
            title="phone"
          >
            <p>No SVG support, here's a substitute</p>
            <img src={phone} alt="phone" />
          </object>
        </div>
      </div>
      <div className="boxes">
        <div className="item">
          <div className="text one">Create new contact</div>
          <div className="icon">
            <img src={phonecreate} alt="phone" />
          </div>
        </div>
        <div className="item">
          <div className="text two">Edit your contacts</div>
          <div className="icon">
            <img src={phoneedit} alt="phone" />
          </div>
        </div>
        <div className="item">
          <div className="text three">Delete your contact</div>
          <div className="icon">
            <img src={phonedelete} alt="phone" />
          </div>
        </div>
        <div className="item">
          <div className="text four">View all contact</div>
          <div className="icon">
            <img src={phoneview} alt="phone" />
          </div>
        </div>
      </div>
      <div className="action">
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Landing;
