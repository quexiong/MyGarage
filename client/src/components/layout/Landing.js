import React from "react";

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
            <a href="register.html" className="btn btn-secondary">
              Sign Up
            </a>
            <a href="login.html" className="btn btn-secondary">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
