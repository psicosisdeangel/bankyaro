import React from 'react'
import express from "express"
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Testimonials } from './components/Testimonials'
import { Footer } from './components/Footer'


export default function App() {
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
  )
}