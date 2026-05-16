import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDog, getAllCities } from "../../apiManager";

export default function DogForm() {
    const [cities, setCities] = useState([]);
    const [name, setName] = useState("");
    const [cityId, setCityId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCities().then(setCities);
    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!name || cityId === 0) return;
        createDog(name, cityId).then(() => navigate("/"));
    };

    return (
        <div>
        <h2>Add a Dog</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div>
            <label>City:</label>
            <select value={cityId} onChange={(e) => setCityId(parseInt(e.target.value))}>
                <option value={0}>Select a city</option>
                {cities.map((city) => (
                <option key={city.id} value={city.id}>
                    {city.name}
                </option>
                ))}
            </select>
            </div>
            <button type="submit">Add Dog</button>
        </form>
        </div>
    )
}