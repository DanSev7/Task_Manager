// import './App.css';
import Header from './components/Header.js';
import Tasks from './components/Tasks.js'
import {useState, useEffect} from 'react';
import AddTask from './components/AddTask'


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    const fetchTasks = async ()=> {
      const res = await fetch('http://localhost:5000/tasks');
      
      if(res.ok){
        const data = await res.json();
        setTasks(data);
      }

    }
    fetchTasks();
  }, []);

    // Delete Task
  const deleteTask = async (id) => {
    await fetch (`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks((tasks).filter((task)=> task.id !== id));
}

  // Toggle Reminder
  const toggleReminder = (id) => {
   setTasks((tasks).map((task)=> (
    task.id === id ? {...task, reminder: !task.reminder} : task
    )))
  
  }

    // Add Task

  const addTask = async (newTask) => {

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });
    
    if(res.ok){
      const data = await res.json();
      setTasks([...tasks, data]);
    }

    /*
      // Find the maximum ID from the existing tasks or set to 0 if no tasks exist
        const newId = Math.max(...tasks.map((task) => task.id), 0) + 1;
    
      // Create a new array of tasks including the new task with an incremented ID
        const updatedTasks = [...tasks, { ...newTask, id: newId }];
    
      // Set the state of tasks to the updatedTasks array
        setTasks(updatedTasks);
    */
  };
  
  return (
    <div className="container">
      <Header onAdd = {()=> {setShowAddTask(!showAddTask)}} showAdd = {showAddTask} />
      {showAddTask && <AddTask  onAdd={addTask} />}
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
