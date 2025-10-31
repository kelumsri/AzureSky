import React, { useMemo, useState } from "react";
import { Search, ChevronsUpDown, User } from "lucide-react";
import citiesJson from "@/assets/cities.json";
import { useAuth0 } from "@auth0/auth0-react";

function Navigation({ onCitySelect }) {
    const { user, isAuthenticated, logout } = useAuth0();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const cities = useMemo(
        () =>
            citiesJson?.List?.map((c) => ({
                code: c.CityCode,
                name: c.CityName,
            })) ?? [],
        []
    );

    const filtered = useMemo(
        () =>
            query.trim()
                ? cities
                      .filter((c) =>
                          c.name.toLowerCase().includes(query.toLowerCase())
                      )
                      .slice(0, 8)
                : cities.slice(0, 8),
        [cities, query]
    );

    return (
        <nav className="w-full border-b border-white/10 bg-linear-to-r from-blue-950 via-blue-900 to-black backdrop-blur">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
                <div className="flex items-center gap-2 text-white">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-semibold tracking-wide">
                        AzureSky
                    </span>
                </div>

                <div className="relative w-full max-w-md">
                    <div className="group relative flex items-center rounded-lg border border-white/10 bg-white/5 pr-2 focus-within:border-blue-400/50">
                        <Search className="ml-2 size-4 text-zinc-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setOpen(true)}
                            onBlur={() => setTimeout(() => setOpen(false), 150)}
                            placeholder="Search city..."
                            className="w-full bg-transparent px-2 py-2 text-sm text-white placeholder:text-zinc-400 focus:outline-none"
                        />
                        <ChevronsUpDown className="size-4 text-zinc-500" />
                    </div>

                    {open && (
                        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-zinc-900/95 shadow-xl">
                            {filtered.length === 0 ? (
                                <div className="px-3 py-2 text-xs text-zinc-400">
                                    No results
                                </div>
                            ) : (
                                <ul className="max-h-64 overflow-auto py-1">
                                    {filtered.map((city) => (
                                        <li key={city.code}>
                                            <button
                                                type="button"
                                                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-200 hover:bg-white/5"
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                onClick={() => {
                                                    setQuery(city.name);
                                                    onCitySelect &&
                                                        onCitySelect(
                                                            city.code,
                                                            city.name
                                                        );
                                                    setOpen(false);
                                                }}
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                <span className="flex-1">
                                                    {city.name}
                                                </span>
                                                <span className="text-xs text-zinc-500">
                                                    {city.code}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-sm text-white hover:bg-white/10"
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                    >
                        {isAuthenticated && user?.picture ? (
                            <img
                                src={user.picture}
                                alt={user?.name || "User"}
                                referrerPolicy="no-referrer"
                                className="size-7 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex size-7 items-center justify-center rounded-full bg-blue-600 text-white">
                                <User className="size-4" />
                            </div>
                        )}
                        <span className="sm:inline max-w-[160px] truncate">
                            {isAuthenticated ? user?.name || "User" : "Guest"}
                        </span>
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-lg border border-white/10 bg-zinc-900/95 p-1 text-sm shadow-xl">
                            <div className="my-1 h-px bg-white/10" />
                            <div className="px-1 py-1">
                                <button
                                    className=" text-white cursor-pointer"
                                    onClick={() =>
                                        logout({
                                            logoutParams: {
                                                returnTo:
                                                    window.location.origin,
                                            },
                                        })
                                    }
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
