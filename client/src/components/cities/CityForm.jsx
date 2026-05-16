import { useEffect, useState } from "react";
import { createCity, getAllCities } from "../../apiManager";

export default function CityForm() {
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState("");

    useEffect(() => {
        getAllCities().then(setCities)
    }, [])

    const handleSubmitCity = (evt) => {
        evt.preventDefault()
        createCity(cityName).then(() => {
            setCityName("");
            getAllCities().then(setCities);
        });
    }

    return (
        <div>
            <h1>Cities</h1>
            <ul>
                {cities.map((city) => (
                    <li key={city.id}>
                        {city.name}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmitCity}>
                <input
                    type="text"
                    id="name"
                    value={cityName}
                    onChange={(evt) => setCityName(evt.target.value)}
                    className="form-cityname"
                    placeholder="Enter a city name"
                    required
                    autoFocus
                />
                <button
                    type="submit"
                >
                    Add City
                </button>
            </form>
        </div>
    )
}