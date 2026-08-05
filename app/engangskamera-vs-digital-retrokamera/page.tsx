import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Engångskamera vs digital retrokamera – vilken ska du välja?',
  description:
    'Funderar du på att köpa en engångskamera? Jämför pris, bildkvalitet och miljöpåverkan med en digital retrokamera – och se varför allt fler väljer digitalt.',
  alternates: { canonical: '/engangskamera-vs-digital-retrokamera' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Engångskamera vs digital retrokamera – vilken ska du välja?',
  inLanguage: 'sv-SE',
  author: { '@type': 'Organization', name: 'Smilo' },
  publisher: { '@type': 'Organization', name: 'Smilo', url: SITE_URL },
  mainEntityOfPage: `${SITE_URL}/engangskamera-vs-digital-retrokamera`,
}

const comparisonRows = [
  { feature: 'Retrokänsla i bilderna', disposable: true, smilo: true },
  { feature: 'Skärmfri – du lever i stunden', disposable: true, smilo: true },
  { feature: 'Återanvändbar', disposable: false, smilo: true },
  { feature: 'Bilderna direkt till mobilen', disposable: false, smilo: true },
  { feature: 'Inga framkallningskostnader', disposable: false, smilo: true },
  { feature: 'Fler än 27 bilder', disposable: false, smilo: true },
  { feature: 'Blixt för mörka miljöer', disposable: true, smilo: true },
]

const CellMark = ({ has }: { has: boolean }) =>
  has ? (
    <span className="inline-flex items-center justify-center">
      <Check className="h-5 w-5 text-smilo-olive" aria-hidden />
      <span className="sr-only">Ja</span>
    </span>
  ) : (
    <span className="inline-flex items-center justify-center">
      <X className="h-5 w-5 text-muted-foreground" aria-hidden />
      <span className="sr-only">Nej</span>
    </span>
  )

export default function DisposableVsDigitalPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={articleSchema} />
      <Header />

      <main>
        <section className="smilo-page-hero bg-gradient-to-b from-smilo-cream to-background pb-10 sm:pb-14">
          <div className="smilo-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="smilo-retro-label mb-4">Guide</p>
              <h1 className="smilo-heading-xl mb-4 text-smilo-brown">
                Engångskamera eller digital retrokamera?
              </h1>
              <p className="smilo-body text-muted-foreground">
                Engångskameran är tillbaka på festerna – men den har fått en smartare
                utmanare. Här är skillnaderna i pris, bildkvalitet och miljöpåverkan.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="smilo-container max-w-3xl">
            <article className="space-y-10">
              <div>
                <h2 className="smilo-heading-md mb-3 text-smilo-brown">
                  Varför engångskameran känns rätt – men blir dyr
                </h2>
                <p className="smilo-body-sm text-smilo-brown-light mb-3">
                  Charmen med en engångskamera är uppenbar: ingen skärm, ingen förhandsvisning,
                  bara 27 bilder och en blixt. Du fotar med känsla i stället för att
                  regissera om varje bild. Det är precis den känslan som gjort att
                  engångskameror dykt upp på bröllop och studentskivor igen.
                </p>
                <p className="smilo-body-sm text-smilo-brown-light">
                  Baksidan är ekonomin. En engångskamera kostar ofta 150–250 kr i butik och
                  ger 27 bilder. Sedan tillkommer framkallning och skanning, som brukar
                  landa på 100–200 kr till. Slutnotan blir lätt över 10 kr per bild – och
                  efter en enda rulle slänger du hela kameran.
                </p>
              </div>

              <div>
                <h2 className="smilo-heading-md mb-3 text-smilo-brown">
                  Den digitala retrokameran: samma känsla, utan slit och släng
                </h2>
                <p className="smilo-body-sm text-smilo-brown-light mb-3">
                  En digital retrokamera som Smilo behåller det som gör engångskameran
                  rolig: ingen skärm, inga omtagningar, äkta ögonblick. Skillnaden är att
                  bilderna sparas digitalt. Du för över dem till mobilen med en
                  USB-C-kabel, laddar kameran och fortsätter fota – om och om igen.
                </p>
                <p className="smilo-body-sm text-smilo-brown-light">
                  Ingen film att köpa, ingen framkallning att vänta på och inget som
                  hamnar i soporna efter festen. Efter två–tre &quot;rullar&quot; har kameran
                  betalat sig jämfört med engångsalternativet.
                </p>
              </div>

              <div>
                <h2 className="smilo-heading-md mb-4 text-smilo-brown">Jämförelsen i korthet</h2>
                <div className="overflow-hidden rounded-2xl border-2 border-smilo-brown/10 bg-white shadow-card">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-border bg-smilo-cream/60">
                        <th scope="col" className="p-3 sm:p-4 font-semibold text-smilo-brown">
                          &nbsp;
                        </th>
                        <th scope="col" className="p-3 sm:p-4 text-center font-semibold text-smilo-brown">
                          Engångskamera
                        </th>
                        <th scope="col" className="p-3 sm:p-4 text-center font-semibold text-smilo-brown">
                          Smilo
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {comparisonRows.map((row) => (
                        <tr key={row.feature}>
                          <th scope="row" className="p-3 sm:p-4 font-medium text-smilo-brown">
                            {row.feature}
                          </th>
                          <td className="p-3 sm:p-4 text-center">
                            <CellMark has={row.disposable} />
                          </td>
                          <td className="p-3 sm:p-4 text-center">
                            <CellMark has={row.smilo} />
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-smilo-cream/40">
                        <th scope="row" className="p-3 sm:p-4 font-medium text-smilo-brown">
                          Ungefärlig kostnad per bild
                        </th>
                        <td className="p-3 sm:p-4 text-center font-semibold text-smilo-brown">
                          ~10 kr
                        </td>
                        <td className="p-3 sm:p-4 text-center font-semibold text-smilo-olive">
                          nästan 0 kr
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="smilo-heading-md mb-3 text-smilo-brown">
                  När passar vad?
                </h2>
                <p className="smilo-body-sm text-smilo-brown-light mb-3">
                  Vill du ha fysiska negativ och tycker att framkallningsväntan är en del av
                  charmen? Då gör engångskameran fortfarande sitt jobb – en gång.
                </p>
                <p className="smilo-body-sm text-smilo-brown-light">
                  Vill du ha samma i-stunden-känsla på varje fest, resa och middag – utan
                  att köpa ny kamera varje gång – är en digital retrokamera det
                  självklara valet. Extra tydligt blir det på bröllop och stora fester,
                  där ett par engångskameror snabbt kostar mer än en Smilo som håller i åratal.
                </p>
              </div>

              <div className="rounded-2xl bg-smilo-cream p-6 text-center sm:p-8">
                <h2 className="smilo-heading-md mb-2 text-smilo-brown">
                  Redo för retrokänslan – utan soptunnan?
                </h2>
                <p className="smilo-body-sm mb-6 text-smilo-brown-light">
                  Smilo kostar från 749 kr, laddas via USB-C och kommer i sex färger.
                  30 dagars öppet köp och fri retur.
                </p>
                <Button variant="hero" size="lg" asChild className="smilo-shine">
                  <Link href="/#produkt">Se Smilo-kameran</Link>
                </Button>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
