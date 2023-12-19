// import './App.css';
import Header from './components/Header.js';
import Tasks from './components/Tasks.js'
import {useState} from 'react';
import AddTask from './components/AddTask'


function App() {
  const [tasks, setTasks] = useState([
    {
      id:1,
      text: 'Doctors Appointment',
      day: 'Feb 4th at 1:45pm',
      reminder: true
    },
    {
      id:2,
      text: 'Meeting at School',
      day: 'Feb 5th at 3:45pm',
      reminder: true
    },
    {
      id:3,
      text: 'Food Shopping',
      day: 'Feb 6th at 2:30pm',
      reminder: false
    },
  ]);

    // Delete Task
  const deleteTask = (id) => {
    setTasks((tasks).filter((task)=> task.id !== id));
}

  // Toggle Reminder
  const toggleReminder = (id) => {
   setTasks((tasks).map((task)=> (
    task.id === id ? {...task, reminder: !task.reminder} : task
    )))
  
  }

    // Add Task

  const addTask = (newTask) => {
    // Find the maximum ID from the existing tasks or set to 0 if no tasks exist
    const newId = Math.max(...tasks.map((task) => task.id), 0) + 1;
  
    // Create a new array of tasks including the new task with an incremented ID
    const updatedTasks = [...tasks, { ...newTask, id: newId }];
  
    // Set the state of tasks to the updatedTasks array
    setTasks(updatedTasks);
  };
  
  return (
    <div className="container">
      <Header />
      <AddTask  onAdd={addTask} />
      {tasks.length > 0 ?
      (
      <Tasks tasks = {tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
      ) :
      'No Tasks to Show'
      }
    </div>
  );
}

export default App;
