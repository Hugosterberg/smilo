import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Camera, LogOut, Save, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isAdminAuthenticated, isAdminPasswordConfigured } from "@/lib/admin-auth";
import { getTotalCameraStock } from "@/lib/camera-colors";
import { readCameraInventory } from "@/lib/camera-inventory";
import { loginAdmin, logoutAdmin, saveCameraInventory } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - lager | Smilo",
  robots: { index: false, follow: false },
};

type AdminPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string
): string | undefined {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function AdminNotice({ status, error }: { status?: string; error?: string }) {
  if (status === "saved") {
    return (
      <div className="rounded-2xl border border-smilo-olive/20 bg-smilo-olive/10 px-4 py-3 text-sm text-smilo-olive">
        Lagerstatusen är uppdaterad.
      </div>
    );
  }

  if (status === "logged-in") {
    return (
      <div className="rounded-2xl border border-smilo-olive/20 bg-smilo-olive/10 px-4 py-3 text-sm text-smilo-olive">
        Du är inloggad i admin.
      </div>
    );
  }

  const messages: Record<string, string> = {
    login: "Fel lösenord.",
    session: "Sessionen har gått ut. Logga in igen.",
    stock: "Ange ett heltal mellan 0 och 9999 för varje färg.",
    stale: "Lagersaldot har ändrats av en order sedan sidan laddades. Uppdatera sidan och försök igen.",
    save: "Lagerstatusen kunde inte sparas. Kontrollera Supabase-konfigurationen.",
  };

  if (!error || !messages[error]) return null;

  return (
    <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      {messages[error]}
    </div>
  );
}

function LoginCard({ status, error }: { status?: string; error?: string }) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-[2rem] border border-smilo-brown/10 bg-smilo-paper p-6 shadow-card sm:p-8">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-smilo-olive text-smilo-cream-light">
            <ShieldCheck className="h-5 w-5" aria-hidden />
          </div>
          <p className="smilo-retro-label">Smilo admin</p>
          <h1 className="mt-2 text-2xl font-bold text-smilo-ink">Lagerhantering</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Logga in för att uppdatera antal kameror i lager per färg.
          </p>
        </div>

        <AdminNotice status={status} error={error} />

        {!isAdminPasswordConfigured() && (
          <div className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Sätt miljövariabeln SMILO_ADMIN_PASSWORD innan admin kan användas.
          </div>
        )}

        <form action={loginAdmin} className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Lösenord</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={!isAdminPasswordConfigured()}
              className="h-12 rounded-xl bg-white"
            />
          </div>
          <Button type="submit" className="w-full" disabled={!isAdminPasswordConfigured()}>
            Logga in
          </Button>
        </form>

        <Link href="/" className="mt-5 block text-center text-sm text-muted-foreground hover:text-smilo-olive">
          Tillbaka till startsidan
        </Link>
      </section>
    </main>
  );
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = searchParams ? await searchParams : {};
  const status = getParam(params, "status");
  const error = getParam(params, "error");
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <LoginCard status={status} error={error} />;
  }

  const inventoryResult = await readCameraInventory();
  const totalStock = getTotalCameraStock(inventoryResult.items);
  const formDisabled = Boolean(inventoryResult.error);

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-sm text-muted-foreground hover:text-smilo-olive">
            ← Till startsidan
          </Link>
          <form action={logoutAdmin}>
            <Button type="submit" variant="secondary" size="sm">
              <LogOut className="h-4 w-4" aria-hidden />
              Logga ut
            </Button>
          </form>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-smilo-brown/10 bg-smilo-paper shadow-card">
          <div className="border-b border-smilo-brown/10 bg-smilo-cream-light px-5 py-6 sm:px-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="smilo-retro-label">Smilo admin</p>
                <h1 className="mt-2 text-3xl font-bold text-smilo-ink sm:text-4xl">
                  Lager per färg
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Sätt saldot till 0 för att markera en färg som slutsåld på startsidan och
                  stoppa den från checkout.
                </p>
              </div>
              <div className="rounded-2xl border border-smilo-brown/10 bg-white px-5 py-4 text-center shadow-soft">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Totalt lager</p>
                <p className="mt-1 text-3xl font-bold text-smilo-brown">{totalStock}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-8">
            <AdminNotice status={status} error={error} />

            {inventoryResult.error && (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {inventoryResult.error} Kör migrationen för camera_inventory och kontrollera serverns
                Supabase-nycklar.
              </div>
            )}

            <form action={saveCameraInventory} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {inventoryResult.items.map((item) => {
                  const soldOut = item.stockQuantity <= 0;
                  return (
                    <div
                      key={item.id}
                      className={`rounded-3xl border bg-white p-4 shadow-soft transition ${
                        soldOut ? "border-destructive/25" : "border-smilo-brown/10"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 shrink-0 rounded-2xl bg-smilo-cream-light p-2">
                          <Image
                            src={item.image}
                            alt={item.fullName}
                            width={96}
                            height={96}
                            className={`h-full w-full object-contain ${soldOut ? "grayscale opacity-45" : ""}`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-xl font-semibold text-smilo-brown">{item.name}</h2>
                            {soldOut && (
                              <span className="rounded-full border border-destructive/25 bg-destructive/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-destructive">
                                Slutsåld
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.updatedAt
                              ? `Senast uppdaterad ${new Date(item.updatedAt).toLocaleString("sv-SE")}`
                              : "Ej synkad ännu"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <Label htmlFor={`stock-${item.id}`}>Antal i lager</Label>
                        <div className="flex items-center gap-3">
                          <Input
                            id={`stock-${item.id}`}
                            name={`stock-${item.id}`}
                            type="number"
                            min={0}
                            max={9999}
                            step={1}
                            required
                            defaultValue={item.stockQuantity}
                            disabled={formDisabled}
                            className="h-12 rounded-xl bg-white text-lg font-semibold"
                          />
                          <input type="hidden" name={`version-${item.id}`} value={item.version} />
                          <Camera className="h-5 w-5 text-smilo-olive" aria-hidden />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 border-t border-smilo-brown/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Saldot visas direkt på produktsidan efter sparning.
                </p>
                <Button type="submit" disabled={formDisabled} className="sm:w-auto">
                  <Save className="h-4 w-4" aria-hidden />
                  Spara lager
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
