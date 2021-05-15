import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import TodoList from './components/TodoList';


function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);;
  const [status, setStatus] = useState("all");
  const [filterTodos, setFilterTodos] = useState([]);
  useEffect(()=>{
    getLocalTodos()
  },[])
  useEffect(() =>{
    saveLocalTodos();
    filterHandler();
  },[todos,status]);
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilterTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilterTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilterTodos(todos);
        break;
    }
  }
  //save local
  const saveLocalTodos = () => {
      localStorage.setItem("todos",JSON.stringify(todos))
  }
  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos",JSON.stringify([]))
    }else{
      let toLocal =JSON.parse(localStorage.getItem("todos"))
      setTodos(toLocal)
    }
  }
 
  return (
    <div className="App">
      <Header/>
      <Form setStatus={setStatus} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText}/>
      <TodoList  filterTodos={filterTodos} setTodos={setTodos} todos={todos}/>
    </div>
  );
}

export default App;
