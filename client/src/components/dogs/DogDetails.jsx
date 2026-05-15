import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDogById } from "../../apiManager";

export default function DogDetails() {
    const { id } = useParams();

    const [dog, setDog] = useState(null);

    useEffect(() => {
        getDogById(id).then(setDog);
    }, [id]);

    if (!dog) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{dog.name}'s Details</h1>
            <p>City: {dog.city.name}</p>
            <p>Walker: {dog.walker ? dog.walker.name : "None"}</p>
        </div>
    );
}
