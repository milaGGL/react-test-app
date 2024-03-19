import React from 'react';
import './App.css';
import Listener from './Listener';
import { addDoc, collection, getDocs, or, query, serverTimestamp, where } from '@firebase/firestore';
import db  from './firebase';

function App() {
  const [listeners, setListeners] = React.useState<{ [key: string]: any }>([]);
  const [count, setCount] = React.useState(0);

  async function getDocuments(type: String) { 
    const coll = collection(db, type === "messages" ? "messages" : "tasks")
    console.log("Caching documents from collection: ", coll.path.toString())
    const result = await getDocs(coll);
    console.log(result.size + "documents fetched from the collection:", coll.path.toString())
}
  function addListener(type: String) { 
      setCount(count + 1);
      setListeners({ ...listeners, [count + 1]: type })
  }
  async function addDocument(type: String) { 
    const coll = collection(db, type === "messages" ? "messages" : "tasks")
    await addDoc(coll, {
      docId: "doc"+Math.floor(Math.random()*100)
    });
  }
  function removeListener(id: number) {
    const filteredObject = listeners.remove(id);
    setListeners(filteredObject);
  }

  return (
    <div>
      <div className="App">
      <div>
          <button onClick={() => getDocuments("tasks")}>Cache "tasks" collection</button>
        </div>
        <div>
          <button onClick={() => addListener("tasks")}>Listen to "tasks" where "docId" larger than "doc10"</button>
        </div>
        <div>
          <button onClick={() => addListener("tasks from cache")}>Listen to "tasks" from CACHE where "docId" larger than "doc10"</button>
        </div>
        <div>
        <button onClick={() => addListener("messages")}>Listen to "messages" where "docId" larger than "doc10"</button>
        </div>
        <div>
        <button onClick={() => addDocument("tasks")}>Add a task</button>
        </div>
        <div>
        <button onClick={() => addDocument("messages")}>Add a message</button>
        </div>
      </div>

      <div>
        {Object.entries(listeners).map(([key, type]) => (
          <Listener key={key} id ={key} type= { type } onRemove= {removeListener}  />
            ))}
        </div>
      
      </div>

  );
}

export default App;
