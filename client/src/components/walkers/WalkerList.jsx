import { useEffect, useState } from "react";
import { getAllCities, getWalkers } from "../../apiManager";

export default function WalkerList() {
    const [walkers, setWalkers] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getWalkers().then(setWalkers);
        getAllCities().then(setCities);
    }, [])

    const handleCitySelect = (evt) => {
        if (evt.target.value === "0") {
            getWalkers().then(setWalkers)
            return
        }
        getWalkers(evt.target.value).then(setWalkers)
    }

    return (
        <div>
            <h1>Walkers</h1>
            <select className="filter-bar" onChange={handleCitySelect}>
                <option value="0">All Cities</option>
                {cities.map((city) => (
                    <option value={city.id} key={city.id}>{city.name}</option>
                ))}
            </select>
            <ul>
                {walkers.map((walker) => (
                    <li key={walker.id}>
                        {walker.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}