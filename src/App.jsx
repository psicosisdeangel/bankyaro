
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/landing/header.jsx';
import { Hero } from './components/landing/hero.jsx';
import { Features } from './components/landing/features.jsx';
import { Testimonials } from './components/landing/testimonials.jsx';
import { Footer } from './components/landing/footer.jsx';
import Login from './components/landing/login/login.jsx';
import Register from "./components/landing/register/register.jsx";
import About from "./components/landing/about/about.jsx";
import Dashboard from "./components/landing/dashboard/dashboard.jsx";




// Página de Landing completa
function LandingPage() {
  return (
    <div className="page-bg">
      <Header />
      <main className="container">
        <Hero />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

// App principal con rutas
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
}

