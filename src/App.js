import React, {useState, useEffect} from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/ToDo.jsx';
import './App.css';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, deleteDoc, setDoc, updateDoc } from 'firebase/firestore/lite';


function App() {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "to-do-cab39.firebaseapp.com",
    projectId: "to-do-cab39",
    storageBucket: "to-do-cab39.appspot.com",
    messagingSenderId: "170103431087",
    appId: "1:170103431087:web:fcaa10c40d3b629738995a"
  };

  const app = initializeApp(firebaseConfig);
  const [db] = useState(getFirestore(app));

  //Todos state
  const [toDo, setToDos] = useState([]);

  //Temp state
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTodos(db)
  }, [db]);


  async function getTodos(db) {
    setLoading(true);
      try {
        const todosCol = collection(db, 'todos');
        const todoSnapshot = await getDocs(todosCol);
        const todoList = todoSnapshot.docs.map(doc => doc.data());
        console.log(todoList)
        setToDos(todoList)
      }
      catch (e) {
        console.error(e);
      }
      setLoading(false);

    }
  
  // Add task 
  ///////////////////////////
  const addTask = async () => {
    if(newTask) {
      let num = toDo.length + 1; 
      let newEntry = { id: num, title: newTask, status: false }
      console.log(num, newEntry)
      await setDoc(doc(db, "todos", num.toString()), newEntry);
      await getTodos(db)
      setNewTask('');
    }
  }

  // Delete task 
  ///////////////////////////
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "todos", id.toString()));
    await getTodos(db)
  }

  // Mark task as done or completed
  ///////////////////////////
  const markDone = async (id) => {
    let foundTask = toDo.find(task => task.id === id)
    const docRef = doc(db, "todos", foundTask.id.toString());
    await updateDoc(docRef, {...foundTask, status: !foundTask.status})
    await getTodos(db)
  }

  // Cancel update
  ///////////////////////////
  const cancelUpdate = () => {
    setUpdateData('');
  }

  // Change task for update
  ///////////////////////////
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  // Update task
  ///////////////////////////
  const updateTask = async () => {
    const docRef = doc(db, "todos", updateData.id.toString());
    await updateDoc(docRef, updateData)
    await getTodos(db)
    setUpdateData('');
  }

  return (
    <div className="container App">
      <br/><br/>
      <h2>Todo List App (ReactJS)</h2>
      <br/><br/>

      {updateData ? (
      <UpdateForm
        loading={loading}
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm
        loading={loading}
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}

      {toDo && toDo.length ? '' : "No Tasks..."}

      <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    /> 

    </div>
  );
}

export default App;
