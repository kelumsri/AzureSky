import React from "react";
import {
    Thermometer,
    Droplets,
    Wind,
    Gauge,
    Sunrise,
    Sunset,
    CloudSun,
    CloudRain,
} from "lucide-react";

function WeatherCard({
    city = "Colombo",
    code = "1248991",
    temp = 33.0,
    status = "Clouds",
    humidity = 68,
    windKph = 14,
    windDeg,
    windGustKph,
    feelsLike = 35,
    high = 34,
    low = 27,
    pressure = 1012,
    visibilityKm,
    cloudsPct,
    country,
    sunrise = "06:05",
    sunset = "17:56",
    time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    }),
}) {
    const isRain = /rain/i.test(status);
    const isClear = /clear/i.test(status);

    return (
        <div className="relative mx-auto w-full max-w-md">
            <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-linear-to-r from-blue-600/30 via-blue-400/20 to-blue-600/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-900/30 via-blue-700/20 to-transparent" />

                <div className="relative p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 text-sm text-blue-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                {city}
                                {country ? `, ${country}` : ""}
                                <span className="text-blue-400/60">•</span>
                                <span className="text-blue-200/80">{code}</span>
                            </div>
                            <div className="mt-1 text-xs text-zinc-400">
                                {time}
                            </div>
                        </div>

                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-100">
                            {isRain ? (
                                <CloudRain className="mr-1 size-3.5" />
                            ) : isClear ? (
                                <CloudSun className="mr-1 size-3.5" />
                            ) : (
                                <CloudSun className="mr-1 size-3.5" />
                            )}
                            {status}
                        </div>
                    </div>

                    <div className="mt-6 flex items-end justify-between">
                        <div>
                            <div className="flex items-baseline">
                                <span className="text-6xl font-extrabold leading-none text-white">
                                    {Math.round(temp)}
                                </span>
                                <span className="ml-1 mb-2 text-2xl text-blue-200/80">
                                    °C
                                </span>
                            </div>
                            <div className="mt-2 text-sm text-zinc-300">
                                Feels like {Math.round(feelsLike)}°
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
                            <div className="flex items-center gap-1.5">
                                <span className="text-blue-300">H</span>
                                <span>{Math.round(high)}°</span>
                            </div>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="flex items-center gap-1.5">
                                <span className="text-blue-300">L</span>
                                <span>{Math.round(low)}°</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <Metric
                            icon={<Droplets className="size-4 text-blue-300" />}
                            label="Humidity"
                            value={`${humidity}%`}
                        />
                        <Metric
                            icon={<Wind className="size-4 text-blue-300" />}
                            label="Wind"
                            value={`${windKph} km/h${
                                windDeg != null ? ` • ${windDeg}°` : ""
                            }`}
                        />
                        <Metric
                            icon={<Gauge className="size-4 text-blue-300" />}
                            label="Pressure"
                            value={`${pressure} hPa`}
                        />
                        <Metric
                            icon={
                                <Thermometer className="size-4 text-blue-300" />
                            }
                            label="Feels"
                            value={`${Math.round(feelsLike)}°C`}
                        />
                        {visibilityKm != null && (
                            <Metric
                                icon={
                                    <CloudSun className="size-4 text-blue-300" />
                                }
                                label="Visibility"
                                value={`${visibilityKm} km`}
                            />
                        )}
                        {cloudsPct != null && (
                            <Metric
                                icon={
                                    <CloudSun className="size-4 text-blue-300" />
                                }
                                label="Clouds"
                                value={`${cloudsPct}%`}
                            />
                        )}
                        {windGustKph != null && (
                            <Metric
                                icon={<Wind className="size-4 text-blue-300" />}
                                label="Gust"
                                value={`${windGustKph} km/h`}
                            />
                        )}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            <Sunrise className="size-4 text-blue-300" />
                            <div className="text-xs text-zinc-300">
                                <div className="text-zinc-400">Sunrise</div>
                                <div className="font-medium text-blue-100">
                                    {sunrise}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            <Sunset className="size-4 text-blue-300" />
                            <div className="text-xs text-zinc-300">
                                <div className="text-zinc-400">Sunset</div>
                                <div className="font-medium text-blue-100">
                                    {sunset}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Metric({ icon, label, value }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
                {icon}
                <span className="text-zinc-400">{label}</span>
            </div>
            <div className="text-sm font-medium text-blue-100">{value}</div>
        </div>
    );
}

export default WeatherCard;
