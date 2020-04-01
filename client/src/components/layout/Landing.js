import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">MyGarage</h1>
          <p className="lead">
            Whether you are a DIY newbie, a skilled mechanic, or a hardcore
            gearhead, MyGarage is the essential tool you need to organize all
            your car mods and maintenance records.
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-secondary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
