import React, { useState } from 'react';

const AddTodo = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(3); // Default to low priority
  const [todos, setTodos] = useState([]); // Store the list of todos
  const [editIndex, setEditIndex] = useState(null); // Track the index being edited

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editIndex !== null) {
      // Edit the existing todo
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = { text, priority };
      setTodos(updatedTodos);
      setEditIndex(null); // Clear edit state
    } else {
      // Add new todo to the list
      setTodos([...todos, { text, priority }]);
    }

    // Reset form fields
    setText('');
    setPriority(3); // Reset to default
  };

  const handleDelete = (index) => {
    // Remove the todo at the specified index
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    // Load the selected todo into the input fields
    setText(todos[index].text);
    setPriority(todos[index].priority);
    setEditIndex(index); // Set the edit index
  };

  // Function to get color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1:
        return 'red'; // High priority
      case 2:
        return 'yellow'; // Medium priority
      case 3:
        return 'green'; // Low priority
      default:
        return 'black'; // Default color
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
        <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
          <option value={1}>High Priority</option>
          <option value={2}>Medium Priority</option>
          <option value={3}>Low Priority</option>
        </select>
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
      </form>

      {/* Display the list of todos */}
      <ul className='listing'>
        {todos.map((todo, index) => (
          <li key={index} style={{ color: getPriorityColor(todo.priority) }}>
            {todo.text}
            <div className='button-container'>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTodo;
