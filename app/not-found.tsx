import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-smilo-cream">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 pt-[calc(var(--header-height)+2rem)] pb-16">
        <div className="text-center">
          <p className="smilo-retro-label mb-4">Fel ruta på filmrullen</p>
          <h1 className="smilo-heading-xl mb-4 text-smilo-brown">404</h1>
          <p className="smilo-body mb-8 text-smilo-brown-light">
            Sidan du letar efter finns inte, men kameran gör det.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link href="/">Tillbaka till startsidan</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
