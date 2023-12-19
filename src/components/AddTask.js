import React, { useState } from 'react'

const AddTask = ({onAdd}) => {
    const [formData, setFormData] = useState({text:'', day:'', reminder: false});

    const handleSubmit = (e)=> {
        e.preventDefault();
        onAdd(formData);
        setFormData({text: '', day: '', reminder: false})
        
    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({ ...formData, [name]: newValue });
    }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-control">
            <label>Task</label>
            <input
                type="text"
                name='text'
                placeholder='Add Task'
                value={formData.text}
                onChange={handleChange}
            />
        </div>

        <div className="form-control">
            <label>Day & Time</label>
            <input 
                type="text" 
                name='day'
                placeholder='Add Day & Time'
                value={formData.day}
                onChange={handleChange}
            />
        </div>

        <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input 
                type="checkbox"
                name='reminder'
                checked={formData.reminder}
                value={formData.reminder}
                onChange={handleChange}
            />
        </div>

        <input className="btn btn-block" type="submit" value = 'Save Task' />

    </form>
  )
}

export default AddTask