import { useState, useEffect } from 'react'
import './NewWorkout.css'
import NewWorkoutForm from './NewWorkoutForm';

function NewWorkout() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');

  useEffect(() => {
      fetch('/api/v1/exercises/')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setExercises(data.exercises);
        });
    }, []);

  const handleClick = (exercise) => {
    setSelectedExercise(exercise);
  }

  const listItems = exercises.map(exc =>
    <li key={exc.exercise} className="exercise" onClick={() => handleClick(exc.exercise)}>
      <span className="exercise-description">{exc.exercise}</span> {exc.description}
    </li>
  );

  if (selectedExercise.length) {
    return <NewWorkoutForm exercise={selectedExercise} exerciseList={exercises}/>
  }
  else {
    return (
      <>
        <h2>Choose a Workout</h2>
        <ul className="exercise-list">{listItems}</ul>
      </>
    )
  }
}

  export default NewWorkout
