import axios from "axios";

const API_KEY = "756ea9ce3919f0dbcc5deb5b0885a7b3";
const CACHE_DURATION = 5 * 60 * 1000;

const toTime = (unix, tzOffsetSec) => {
    try {
        const date = new Date((unix + (tzOffsetSec || 0)) * 1000);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return "";
    }
};

export const getWeatherData = async (cityCode) => {
    const cacheKey = `weather_${cityCode}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        const parsed = JSON.parse(cached);

        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            return parsed.data;
        }
    }

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}&units=metric`
    );
    const w = response.data;
    const windKph =
        typeof w.wind?.speed === "number"
            ? Math.round(w.wind.speed * 3.6)
            : undefined;
    const data = {
        code: String(cityCode),
        name: w.name,
        status: w.weather?.[0]?.main || w.weather?.[0]?.description || "",
        description: w.weather?.[0]?.description || "",
        temp: Math.round(w.main?.temp ?? 0),
        feelsLike: Math.round(w.main?.feels_like ?? w.main?.temp ?? 0),
        high: Math.round(w.main?.temp_max ?? 0),
        low: Math.round(w.main?.temp_min ?? 0),
        humidity: w.main?.humidity,
        pressure: w.main?.pressure,
        windKph,
        windDeg: w.wind?.deg,
        windGustKph:
            typeof w.wind?.gust === "number"
                ? Math.round(w.wind.gust * 3.6)
                : undefined,
        cloudsPct: w.clouds?.all,
        visibilityKm:
            typeof w.visibility === "number"
                ? Math.round(w.visibility / 1000)
                : undefined,
        country: w.sys?.country,
        sunrise: toTime(w.sys?.sunrise, w.timezone / 1),
        sunset: toTime(w.sys?.sunset, w.timezone / 1),
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
    };

    localStorage.setItem(
        cacheKey,
        JSON.stringify({
            data,
            timestamp: Date.now(),
        })
    );

    return data;
};
