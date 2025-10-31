import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Lnading from "./Lnading";
import Navigation from "@/components/ui/Navigation";
import Weathercard from "@/components/ui/weathercard";
import { getWeatherData } from "@/services/weatherService";
import citiesJson from "@/assets/cities.json";
function Home() {
    const { isAuthenticated, isLoading } = useAuth0();

    const defaultCity = useMemo(() => citiesJson?.List?.[0], []);
    const [cityCode, setCityCode] = useState(defaultCity?.CityCode || "");
    const [cityName, setCityName] = useState(defaultCity?.CityName || "");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadWeather = useCallback(async (code) => {
        if (!code) return;
        try {
            setLoading(true);
            setError("");
            const data = await getWeatherData(code);
            setWeather(data);
        } catch {
            setError("Failed to load weather");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadWeather(cityCode);
    }, [cityCode, loadWeather]);

    useEffect(() => {
        if (!cityCode) return;
        const key = `weather_${cityCode}`;
        const id = setInterval(() => {
            try {
                localStorage.removeItem(key);
            } catch {
                void 0;
            }
            loadWeather(cityCode);
        }, 5 * 60 * 1000);
        return () => clearInterval(id);
    }, [cityCode, loadWeather]);

    return (
        <div>
            <Navigation
                onCitySelect={(code, name) => {
                    setCityCode(code);
                    setCityName(name);
                }}
            />

            <div className="bg-black min-h-screen text-white">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    {isLoading && <div>Loading ...</div>}
                    {!isLoading && !isAuthenticated && <Lnading />}
                    {!isLoading && isAuthenticated && (
                        <>
                            <div className="flex flex-col items-center justify-center mb-8 mt-10">
                                <h2 className="text-4xl font-bold text-blue-100 mb-3 text-center tracking-tight">
                                    Discover the Weather, Instantly.
                                </h2>
                                <p className="text-lg text-zinc-200 mb-1 text-center max-w-2xl mt-6">
                                    AzureSky brings you real-time weather
                                    insights, beautifully presented.
                                    Effortlessly track conditions, forecasts,
                                    and alerts wherever you are &mdash; at a
                                    glance.
                                </p>
                                <p className="text-base text-blue-200 font-medium mt-4 text-center">
                                    <span>To check weathe:</span> <br />
                                    <span>
                                        Click the{" "}
                                        <span className="underline decoration-blue-500">
                                            search bar above
                                        </span>{" "}
                                        and select your location.
                                    </span>
                                </p>
                            </div>

                            {error && (
                                <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                                    {error}
                                </div>
                            )}

                            <div className="mt-4">
                                {loading && (
                                    <div className="text-zinc-300">
                                        Loading weather…
                                    </div>
                                )}
                                {!loading && weather && (
                                    <Weathercard
                                        city={weather.name || cityName}
                                        code={weather.code || cityCode}
                                        temp={weather.temp}
                                        status={weather.status}
                                        humidity={weather.humidity}
                                        windKph={weather.windKph}
                                        windDeg={weather.windDeg}
                                        windGustKph={weather.windGustKph}
                                        feelsLike={weather.feelsLike}
                                        high={weather.high}
                                        low={weather.low}
                                        pressure={weather.pressure}
                                        visibilityKm={weather.visibilityKm}
                                        cloudsPct={weather.cloudsPct}
                                        country={weather.country}
                                        sunrise={weather.sunrise}
                                        sunset={weather.sunset}
                                        time={weather.time}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
