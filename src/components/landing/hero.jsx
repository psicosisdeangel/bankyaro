import React from "react";
import { Link } from "react-router-dom";
import "../landing/register/register.css";




export function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="kicker">La banca que se</h1>
        <h2 className="big">mueve contigo.</h2>
        <p className="lead">
          Gestiona tu dinero de forma fácil, segura y sin complicaciones. Únete
          a la nueva generación de la banca.
        </p>

        <div className="hero-cta">
          <Link to="/register" className="btn-primary">
            Crear cuenta
          </Link>

           <Link to="/about" className="more">
            Saber mas
          </Link>
        </div>
      </div>

      <div className="hero-right">
        <div className="card-3d">
          <div style={{ width: "100%", height: "100%" }}></div>
        </div>
      </div>
    </section>
  );
}
