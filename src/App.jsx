import { useState } from 'react'
import './App.css'
import NewWorkout from './NewWorkout';
import PastWorkouts from './PastWorkouts';

const HOME = 'home';
const ADD_NEW = 'new';
const VIEW_PAST = 'past';

const COMPONENTS = [
  HOME,
  ADD_NEW,
  VIEW_PAST
]


function App() {
  const [component, setComponent] = useState(COMPONENTS[0])

  const renderComponent = () => {
    if (component === HOME) {
      return (
        <>
          <button onClick={() => setComponent(() => ADD_NEW)}>
            Add New Workout
          </button>
          <button onClick={() => setComponent(() => VIEW_PAST)}>
            View Past Workouts
          </button>
        </>
      )
    }
    if (component === ADD_NEW) {
      return <NewWorkout />
    }
    if (component === VIEW_PAST) {
      return <PastWorkouts />
    }
  }

  return (
    <>
      <h1>Workout Tracker</h1>
      <div className="card">
        {renderComponent()}
      </div>
    </>
  )
}

export default App
