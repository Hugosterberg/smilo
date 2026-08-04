'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

// Åtta inbyggda filter som väljs direkt i kameran innan bilden tas.
// Omblandade så liknande filter (Natural/Boost, Mono/Noir) inte ligger
// bredvid varandra — varken horisontellt eller vertikalt i 4-kolumnsrutnätet.
const filters = [
  { id: 'natural', name: 'Natural' },
  { id: 'mono', name: 'Mono' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'polar', name: 'Polar' },
  { id: 'filmic', name: 'Filmic' },
  { id: 'retro', name: 'Retro' },
  { id: 'boost', name: 'Boost' },
  { id: 'noir', name: 'Noir' },
] as const

const FilterSection = () => {
  return (
    <section id="filter" className="smilo-section smilo-scroll-anchor bg-background">
      <div className="smilo-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="smilo-heading-lg mb-4 text-smilo-brown">Åtta filter i kameran</h2>
          <motion.div
            className="smilo-accent-bar"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <p className="smilo-body text-smilo-brown-light max-w-xl mx-auto mb-2">
            Samma ögonblick, åtta stämningar. Välj känsla redan när du fotar.
          </p>
          <p className="smilo-body-sm text-smilo-brown-light/70 max-w-xl mx-auto">
            Filtret läggs på direkt i kameran — ingen redigering i efterhand.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:max-w-5xl sm:grid-cols-4 sm:gap-6">
          {filters.map((filter, index) => (
            <motion.figure
              key={filter.id}
              className="developed-photo group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <div className="developed-photo-print">
                <div className="developed-photo-image relative aspect-[4/3] overflow-hidden bg-smilo-brown/5">
                  <Image
                    src={`/assets/filter-${filter.id}.jpg`}
                    alt={`Bryggan vid sjön fotograferad med filtret ${filter.name}`}
                    fill
                    sizes="(min-width: 640px) 260px, 45vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="developed-photo-chin flex items-center justify-center px-2 pt-2">
                  <span className="font-heading text-base tracking-[0.06em] text-smilo-brown">
                    {filter.name}
                  </span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FilterSection
