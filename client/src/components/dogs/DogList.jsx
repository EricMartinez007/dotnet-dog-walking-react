import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDogs } from "../../apiManager";

export default function DogList() {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        getAllDogs().then(setDogs);
    }, []);

    return (
        <div>
            <h1>Dogs</h1>
            <ul>
                {dogs.map((dog) => (
                    <li key={dog.id}>
                        <Link to={`/dogs/${dog.id}`}>{dog.name}</Link> - {dog.city.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}