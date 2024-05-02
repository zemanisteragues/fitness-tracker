import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import axios from 'axios';
// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import {  AiFillDelete  } from "react-icons/ai";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const [workoutDetails, setWorkoutDetails] = useState(workouts);
  const [tmpVar, setTmpVar] = useState();

  const fetchWorkouts = async () => {
    const response = await fetch("http://localhost:4000/api/workouts");
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_WORKOUTS", payload: json });
    }
    setWorkoutDetails(json);
    setTmpVar(json);
  };

  useEffect(() => {
    fetchWorkouts();
  }, [dispatch]);

  const handleDelete = async (_id) => {
    const deletedWorkout = await axios.delete(`http://localhost:4000/api/workouts/${_id}`);

    setWorkoutDetails(deletedWorkout.data);
  }

  return (
    <div className="home">
      <div className="workouts">
        {workoutDetails &&
          workoutDetails.map((item) => {
            return (
              <>
                <AiFillDelete onClick={() => handleDelete(item._id)} />
                <WorkoutDetails workout={item} key={item._id} />
              </>
            );
          })}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
