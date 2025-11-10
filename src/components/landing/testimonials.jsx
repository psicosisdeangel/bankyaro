import React from 'react'

const t = [
  {
    text: 'simplemente that was epic...',
    name: 'Miguel Escobar',
    role: 'Cliente Satisfecho'
  },
  {
    text: 'god dammit...',
    name: 'Sebastian Gomez',
    role: 'Inversionista'
  },
  {
    text: 'welinton quiw es el campeon ...',
    name: 'Nicolas Martinez',
    role: 'Emprendedor'
  }
]

export function Testimonials() {
  return (
    <section className="testimonials">
      <h3 className="section-title alt">Lo que nuestros clientes dicen</h3>
      <div className="test-grid">
        {t.map((it, i) => (
          <blockquote key={i} className="test-card">
            <p>“{it.text}”</p>
            <footer>
              <strong>{it.name}</strong>
              <span>{it.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}