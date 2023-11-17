import { useState, useEffect, useRef } from 'react';
import ActorCard from '../../components/ActorCard/ActorCard';
import * as actorAPI from "../../utilities/actor-api";
import PasteURLForm from '../../components/PasteURLForm/PasteURLForm';

export default function HomePage() {
    const [actors, setActors] = useState([]);
    const [actorURL, setActorURL] = useState('');
    const [intervalActive, setIntervalActive] = useState(false);
    const [background, setBackground] = useState('#000000');
    const [checked, setChecked] = useState(null);
    const selectedRef = useRef(false);

    async function fetchDataAndUpdate() {
        try {
            const data = await actorAPI.getActorsFromProxy(actorURL);
            const arrayOfNestedObjects = Object.values(data)

            if (!intervalActive) {
                const initialCheckedState = {};
                for (const actor of arrayOfNestedObjects) {
                    initialCheckedState[actor.id] = false;
                }
                setChecked(initialCheckedState);
            }

            setActors([...arrayOfNestedObjects]);   
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    useEffect(() => {
        if (intervalActive) {
            const fetchInterval = 2000;
            const intervalId = setInterval(fetchDataAndUpdate, fetchInterval);
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [intervalActive]);


    async function handleFormSubmit(evt) {
        evt.preventDefault();
        await fetchDataAndUpdate();
        setIntervalActive(true);
    };

    function handleSelectedActors(evt) {
        evt.preventDefault();
        selectedRef.current = true;
    }

    function handleCheckboxChange(actorId) {
        setChecked((prevChecked) => ({
            ...prevChecked,
            [actorId]: !prevChecked[actorId],
        }));
    }

    return (
        <main className='flex flex-col items-center justify-center w-full h-full' style={{
            backgroundColor: background
        }}>
            {!selectedRef.current &&
                <PasteURLForm actors={actors} background={background} setBackground={setBackground} actorURL={actorURL} setActorURL={setActorURL} handleFormSubmit={handleFormSubmit} />
            }
            {actors[0] && !selectedRef.current &&
                <section className="w-full flex flex-col items-center justify-center">
                    <form onSubmit={(evt) => handleSelectedActors(evt)}>
                        {actors.length && actors.map((actor, index) => (
                            <div className="form-control" key={index}>
                                <label className="cursor-pointer label">
                                    <span className="label-text">{actor.name}</span>
                                    <input
                                        type="checkbox"
                                        checked={checked[actor.id]}
                                        className="checkbox checkbox-info"
                                        onChange={() => handleCheckboxChange(actor.id)}
                                    />
                                </label>
                            </div>
                        ))}
                        <button className='btn btn-primary'>Generate Widgets</button>
                    </form>
                </section>
            }
            <section className="w-full flex flex-col items-center justify-center">
                {selectedRef.current &&
                    actors.filter(actor => {
                        return checked[actor.id];
                    }).map((actor, index) => (
                        <ActorCard actor={actor} key={actor.id} />
                    ))
                }
            </section>
        </main>
    );
}