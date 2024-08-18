import { useState, useEffect } from 'react'
import './NewWorkout.css'

function NewWorkout() {
    const [exercises, setExercises] = useState([]);
    useEffect(() => {
        fetch('/api/v1/exercises/')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setExercises(data.exercises);
          });
      }, []);


      const listItems = exercises.map(exc => <li key={exc.exercise} class="exercise"><span class="exercise-description">{exc.exercise}</span> {exc.description}</li>);

    return (
      <>
        <h2>Choose a Workout</h2>
        <ul class="exercise-list">{listItems}</ul>
      </>
    )
  }

  export default NewWorkout
