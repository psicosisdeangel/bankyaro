import React from 'react'
import { Link } from 'react-router-dom' 

export function Header() {
  return (
    <header className="header">
      <div className="logo">Bankyaro</div>
      <nav className="nav">
      </nav>

      {/*  Usa Link para ir al login sin recargar la página */}
      <Link to="/login" className="btn btn-ghost">
        Iniciar sesión
      </Link>
    </header>
  )
}
