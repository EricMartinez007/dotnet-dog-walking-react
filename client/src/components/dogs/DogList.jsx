import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteDog, getAllDogs } from "../../apiManager";

export default function DogList() {
    const [dogs, setDogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllDogs().then(setDogs);
    }, []);


    const handleDeleteDog = (dogId) => {
        deleteDog(dogId).then(() => getAllDogs().then(setDogs))
    }
    
    return (
        <div>
            <h1>Dogs</h1>
            <button onClick={() => navigate("/dogs/add")}>Add Dog</button>
            <ul>
                {dogs.map((dog) => (
                    <li key={dog.id}>
                        <Link to={`/dogs/${dog.id}`}>{dog.name}</Link> - {dog.city.name} <button
                            className="dog-delete-btn"
                            onClick={() => handleDeleteDog(dog.id)}
                        >
                            Remove 
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}