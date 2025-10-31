import React from "react";

import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

function Lnading() {
    const { loginWithRedirect } = useAuth0();
    return (
        <div className="min-h-screen bg-black text-white">
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-blue-900/40 to-blue-500/10" />
                <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-200">
                            <span className="h-2 w-2 rounded-full bg-blue-400" />
                            Live weather at a glance
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                            AzureSky Weather
                        </h1>
                        <p className="mt-4 text-base text-zinc-300 sm:text-lg md:text-xl">
                            A sleek, real‑time weather experience. Track
                            forecasts, alerts, and maps across your favorite
                            cities with a clean, distraction‑free interface.
                        </p>
                        <div className="mt-8">
                            <Button
                                variant="outline"
                                className="group relative inline-flex items-center justify-center rounded-2xl px-8 md:px-12 py-3 md:text-lg font-semibold min-w-[200px] md:min-w-[260px] h-12 border-blue-400 bg-linear-to-r from-blue-900 via-blue-600 to-white text-white hover:text-white hover:from-white hover:via-blue-600 hover:to-blue-900 "
                                onClick={() => loginWithRedirect()}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl md:h-96 md:w-96" />
            </header>

            <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    Features
                </h2>
                <p className="mt-2 text-zinc-400">
                    Everything you need for clear, accurate, and fast weather
                    insights.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        title="Real‑time Forecasts"
                        desc="Minute‑by‑minute updates with hourly and 7‑day outlooks."
                        iconBg="bg-blue-500/20"
                    />
                    <FeatureCard
                        title="Severe Alerts"
                        desc="Instant notifications for rain, storms, and temperature drops."
                        iconBg="bg-blue-400/20"
                    />
                    <FeatureCard
                        title="Beautiful Maps"
                        desc="Radar and cloud layers with smooth, responsive interactions."
                        iconBg="bg-blue-600/20"
                    />
                </div>
            </section>

            <footer className="border-t border-white/10">
                <div className="mx-auto max-w-6xl px-6 py-6 text-center text-xs text-zinc-400">
                    © {new Date().getFullYear()} AzureSky. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default Lnading;

function FeatureCard({ title, desc, iconBg }) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
            <div
                className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md ${iconBg} text-blue-300`}
            >
                ★
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-1 text-sm text-zinc-400">{desc}</p>
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-transform group-hover:scale-125" />
        </div>
    );
}
