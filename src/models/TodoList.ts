export interface ITodoList {
    id: number;
    name: string;
    completed: boolean;
  }
  
  export class TodoList {
    todos: ITodoList[];
  
    constructor(todos: ITodoList[] = []) {
      const storedTodos = localStorage.getItem('todos');
      this.todos = storedTodos ? JSON.parse(storedTodos) : todos;
    }
  
    createJob(name: string) {
      if (!name) throw new Error("Tên nhiệm vụ không được để trống.");
      if (this.todos.some(todo => todo.name === name)) throw new Error("Tên nhiệm vụ phải là duy nhất.");
      const newTodo: ITodoList = {
        id: Date.now(), 
        name,
        completed: false,
      };
      this.todos.push(newTodo);
      this.saveTodos();
    }
  
    updateJob(id: number) {
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        this.todos[index].completed = !this.todos[index].completed;
        this.saveTodos();
      }
    }
  
    deleteJob(id: number) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveTodos();
    }
  
    deleteAllJobs() {
      this.todos = [];
      this.saveTodos();
    }
  
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
  