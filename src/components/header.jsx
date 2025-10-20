import React from 'react'

export function Header() {
  return (
    <header className="header">
      <div className="logo">Bankyaro</div>
      <nav className="nav">
        <a>Productos</a>
        <a>Sobre Nosotros</a>
        <a>Blog</a>
      </nav>
      <button className="btn btn-ghost">Abrir cuenta</button>
    </header>
  )
}