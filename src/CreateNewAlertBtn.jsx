import React, {useState} from 'react';
import AlertElement from './AlertElement';

const CreateNewAlertBtn = () => {

    const [elements, setElements] = useState([]);
    const [idCounter, setIdCounter] = useState(0); // Counter for generating unique IDs


    const addElement = () => {
        const newId = idCounter + 1; // Generate a unique ID
        setIdCounter(newId); // Update the counter
        setElements([...elements, newId]); // Add the new ID to the state
      };
  
   
    const removeElement = (id) => {
        console.log("Removing element with ID:", id);
        console.log(" Current elements:", elements);
        setElements(elements.filter((elementId) => elementId !== id)); // Remove the ID from the state
      };

  return (
    <>
    {elements.map((id) => (
      <div key={id}>
        <AlertElement id={id} onRemove={() => removeElement(id)} />
      </div>
    ))}
    <button onClick={addElement}>+</button>
  </>
  )
}

export default CreateNewAlertBtn