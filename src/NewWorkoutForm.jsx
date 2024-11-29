import { useState } from "react"
import "./NewWorkoutForm.css"

const currentDateTime = new Date()
const maxDateISOString = currentDateTime.toISOString().split('T')[0];
const currentTimeString = currentDateTime.toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit" })

function NewWorkoutForm({exercise, exerciseList}) {
    const [selectedExercise, setSelectedExercise] = useState(exercise)
    const [setCollection, setSetCollection] = useState([1,1,1,1]);
    const [date, setDate] = useState(maxDateISOString);
    const [time, setTime] = useState(currentTimeString)

    const removeSet = (set) => {
        let newSetCollection = [...setCollection];
        newSetCollection.pop();
        setSetCollection(newSetCollection);
    };

    const handleAddSet = () => {
        let newSetCollection = [...setCollection];
        newSetCollection.push(1);
        setSetCollection(newSetCollection);
    };

    const handleRepChange = (reps, index) => {
        let newSetCollection = [...setCollection];
        newSetCollection[index] = parseInt(reps);
        setSetCollection(newSetCollection);
    };

    const sets = setCollection.map((reps, index) =>
        <li key={`set-${index}`} className="set-item">
            <label>Set {index + 1}:</label>
            <input type="number" min="1" value={reps} onChange={e => handleRepChange(e.target.value, index)}></input>
            {index === setCollection.length - 1 && setCollection.length > 1 ? <button className="set-item--remove" onClick={() => removeSet(index)} >Remove</button>:null}
        </li>
    )

    const exerciseOptions = exerciseList.map(exc =>
        <option key={exc.exercise} value={exc.exercise}>{exc.exercise}</option>
    );

    const getCookie = (name='csrftoken') => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const response = fetch("/api/v1/workouts/create/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie() // Include the CSRF token in the header
            },
            body: JSON.stringify({ username: "example" }),
        });

        console.log('submitting event', response.status);
    };

    return <form className="form-container" onSubmit={handleSubmit}>
        <label>
            Choose a workout:
            <select name="workout" id="workout" value={selectedExercise} onChange={e => setSelectedExercise(e.target.value)}>
                {exerciseOptions}
            </select>
        </label>
        <ul className="set-list-container">
            {sets}
            <button className="set-item--add" onClick={handleAddSet}>Add Set</button>
        </ul>
        <label>
            Choose a date:
            <input type="date" id="date" value={date} max={maxDateISOString} onChange={e => new Date(e.target.value) < currentDateTime ? setDate(e.target.value):null} />
        </label>
        <label>
            Enter a time:
            <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} />
        </label>

        <button type="submit">Submit</button>
    </form>
}

export default NewWorkoutForm
