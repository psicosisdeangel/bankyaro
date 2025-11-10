import React from 'react'

const cards = [
  {
    title: 'Cuentas sin comisiones',
    desc: 'Abre una cuenta de ahorros y mira tu dinero crecer sin cargos ocultos.'
  },
  {
    title: 'Tarjetas con beneficios',
    desc: 'Disfruta de recompensas, cashback y seguridad en todas tus compras.'
  },
  {
    title: 'Préstamos rápidos',
    desc: 'Obtén el financiamiento que necesitas con un proceso simple y transparente.'
  },
  {
    title: 'Invierte en tu futuro',
    desc: 'Pon tu dinero a trabajar con nuestras diversas opciones de inversión.'
  }
]

export function Features() {
  return (
    <section className="features">
      <h3 className="section-title">Soluciones financieras diseñadas para ti</h3>
      <div className="grid">
        {cards.map((c) => (
          <article key={c.title} className="feature-card">
            <div className="thumb" />
            <h4>{c.title}</h4>
            <p>{c.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}