import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import {Button} from 'react-bootstrap';

function App() {
  const [listItems, setListItems] = useState([] as any[]);
  const [name, setName] = useState("");

  const handleOnChange = (event: any) => {
    setName(event.target.value);
  }

  const handleSubmit = () => {
    const newListItems = listItems.concat({name});
    setListItems(newListItems);
    setName('');
  }

  return (
    <div className='ms-5 mt-3'>
      <h1 className='mx-auto'>Simple Website Built With React</h1>
      <p>This html document allows you to add whatever you type in to an ordered list below.</p>
     <input value={name} onChange={handleOnChange} placeholder="Add Something To List Below"></input>
     <Button className='ms-3' variant="primary" onClick={handleSubmit}>Submit</Button>
     <ol>
      {
        listItems.map((item) => {
          return <li>{item.name}</li>;
        })
      }
     </ol>
    </div>
  );
}

export default App;