import './App.css'
import { useState, useEffect } from 'react'

function App() {
 const [todo, setTodo] = useState(() => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
});

 const [idCounter, setIdCounter] = useState(() => {
  const saved = localStorage.getItem("idCounter");
  return saved ? JSON.parse(saved) : 0;
});

    useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
    localStorage.setItem("idCounter", JSON.stringify(idCounter));
  }, [todo, idCounter]);

  function createTodo (){

    const filter = {
      1:"priority-high",
      2:"priority-medium",
      3:"priority-low"
    }

    let textContent = document.getElementById("cText").value;
    let priority = filter[document.getElementById("cPriority").value];
    let prin = document.getElementById("cPriority").value;

      setTodo(todo => [
    ...todo,
    {
      Task: textContent,
      Pri: priority,
      Prin: prin,
      Id: idCounter,
      edit: false
    }
  ]);
  setIdCounter(prev => prev + 1);
  }

  function editTodoStart(id){
    setTodo(prev => prev.map(item => item.Id === id
      ? {...item, edit:true} : item
    ))
  }

  function saveEdit(id){
      const filter = {
      1:"priority-high",
      2:"priority-medium",
      3:"priority-low"
    }
let textContent = document.getElementById(`eText-${id}`).value;
let priority = filter[document.getElementById(`ePriority-${id}`).value];
 let prin = document.getElementById(`ePriority-${id}`).value;

 setTodo(prev => prev.map(item => item.Id === id
      ? {...item, 
      Task: textContent,
      Pri: priority,
      Prin: prin,
      edit:false} : item
    ));
  }

  function deleteTodo(id){
      setTodo(prev => prev.filter(item => item.Id !== id));
  }

  return (
    <>
    {/* Creatin' */}
      <h1>Very Simple Todo App</h1>
      <div className="CreateNewTest" class ="New">
      <label For='cText'>Write Description</label>
      <textarea data-testid="create-todo-text" rows= "4" cols="50" id = "cText"></textarea>
      <select data-testid="create-todo-priority" id = "cPriority">
        <option value = "1">High</option>
        <option value = "2">Medium</option>
        <option value = "3">Low</option>
      </select>
      <button data-testid="create-todo" onClick = {createTodo} >Create</button>
      </div>

         <div class ="Result">

      {/* Sortin' */}
  {[...todo]
   .sort((a, b) => a.Prin - b.Prin)
    .map((item, index) => (



  <div class = {item.Pri} data-testid= "todo-item" key={index.id} id = "result">
   {item.edit ? 
   /* Editin' */
   <div class ="Editing">
   <label For='eText'>Edit Description</label>
   <textarea data-testid="update-todo-text" rows= "4" cols="50" id = {`eText-${item.Id}`}>{item.Task}</textarea>
    <select id = {`ePriority-${item.Id}`}>
        <option value = "1">High</option>
        <option value = "2">Medium</option>
        <option value = "3">Low</option>
      </select>
      <button data-testid="update-todo" onClick = {() => saveEdit(item.Id)} >Save</button>
   </div>
   
   : null}
   
   {!item.edit ? (
    /* Listin' */
    <div>
    <p>{item.Task}</p>
    <button data-testid = "edit-todo" onClick = {() => editTodoStart(item.Id)}>Edit</button>
    <button data-testid = "delete-todo" onClick = {() => deleteTodo(item.Id)}>Delete</button>
    </div>
    
   ) : null}

  </div>
))}
    </div> 

    </>
  )
}

export default App
