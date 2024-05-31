import React, { useState, useEffect } from 'react';
import { TodoList } from '../models/TodoList';
import { BsTrash, BsCheckCircle } from 'react-icons/bs';
import "./Todo.css"

const TodoComponent: React.FC = () => {
  const todoManager = new TodoList();
  const [todos, setTodos] = useState(todoManager.todos);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setTodos(todoManager.todos);
  }, [todoManager.todos]);

  const handleAddTask = () => {
    try {
      todoManager.createJob(inputValue);
      setTodos([...todoManager.todos]);
      setInputValue('');
    } catch (error) {
      alert(handleError(error)); 
    }
  };

  const handleToggleCompleted = (id: number) => {
    todoManager.updateJob(id);
    setTodos([...todoManager.todos]);
  };

  const handleDeleteTask = (id: number) => {
    todoManager.deleteJob(id);
    setTodos([...todoManager.todos]);
  };

  const handleDeleteAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả công việc không?')) {
      todoManager.deleteAllJobs();
      setTodos([]);
    }
  };

  return (
    <div className="container">
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleAddTask}>Add new task</button>
      {todos.map(todo => (
        <div key={todo.id}>
          <input type="checkbox" checked={todo.completed} onChange={() => handleToggleCompleted(todo.id)} />
          {todo.name}
          <button onClick={() => handleDeleteTask(todo.id)}><BsTrash /></button>
        </div>
      ))}
      <button onClick={handleDeleteAll}>Delete all tasks</button>
    </div>
  );
};

function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Đã xảy ra lỗi không xác định';
}

export default TodoComponent;
