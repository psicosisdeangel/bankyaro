import React from "react";
import "./about.css";
import { FaLock, FaHandshake, FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="about-container">
            <header className="about-header">
                <h1>Más allá de la banca tradicional</h1>
                <p>
                    En <strong>Bankyaro</strong>, creemos en una banca que impulsa tus sueños con propósito, innovación y confianza.
                </p>

                <Link to="/login" className="about-buttom">
                    Iniciar sesion
                </Link>
            </header>

            <section className="about-features">
                <div className="feature-card">
                    <FaLeaf className="feature-icon" />
                    <h3>Nuestra Filosofía</h3>
                    <p>Transparencia, bienestar y sostenibilidad como pilares fundamentales.</p>
                </div>

                <div className="feature-card">
                    <FaLock className="feature-icon" />
                    <h3>Tecnología</h3>
                    <p>Seguridad biométrica, plataformas intuitivas y soporte constante.</p>
                </div>

                <div className="feature-card">
                    <FaHandshake className="feature-icon" />
                    <h3>Impacto</h3>
                    <p>Iniciativas sociales y financieras 24/7 para tu comunidad.</p>
                </div>
            </section>

            <section className="about-tech">
                <div className="about-tech-text">
                    <h2>Tecnología que te impulsa</h2>
                    <p>
                        Promovemos un sistema financiero ético, seguro y orientado al bienestar social.
                    </p>
                    <ul>
                        <li>✔ Seguridad digital con respaldo biométrico</li>
                        <li>✔ Acceso 24/7 a tu cuenta</li>
                        <li>✔ Plataforma moderna y accesible</li>
                    </ul>

                    <Link to="/register" className="cta-buttom">
                        Abrir mi cuenta ahora
                    </Link>
                </div>

                <div className="about-tech-image">
                    <img
                        src="/images/imagenbank.png"
                        alt="Personas trabajando juntas"
                    />
                </div>
            </section>

            <footer className="about-footer">
                <footer>
                    <a href="https://facebook.com" target="_blank">Facebook</a> ·
                    <a href="https://twitter.com" target="_blank">Twitter</a> ·
                    <a href="https://linkedin.com" target="_blank">LinkedIn</a>
                </footer>

            </footer>
        </div>
    );
}
