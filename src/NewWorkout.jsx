import { useState, useEffect } from 'react'
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


      const listItems = exercises.map(exc => <li key={exc.exercise}><strong>{exc.exercise}</strong>: {exc.description}</li>);

    return (
      <>
        <h2>Choose a Workout</h2>
        <ul>{listItems}</ul>
      </>
    )
  }

  export default NewWorkout
