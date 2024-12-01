import React, {useState, useEffect} from 'react';
import AlertElement from '../AlertElement/AlertElement.jsx';
import './CreateNewAlertBtn.css';

const CreateNewAlertBtn = () => {
  let localStorageElements;
  try {
    localStorageElements = JSON.parse(localStorage.getItem("elements")) || [];
  } catch (error) {
    localStorageElements = [];
  }
  const [elements, setElements] = useState(localStorageElements);
  const [idCounter, setIdCounter] = useState(elements.id || 0); // Counter for generating unique IDs

  
    
    // save data everytime it changes in the local storage
    useEffect(()=>{
      localStorage.setItem("elements",  JSON.stringify(elements)); // Save elements to localStorage 
    },[elements])

    // load data from localStorage

    const addElement = () => { // Add new element to elements array 
      const newId = idCounter + 1; // Generate unique ID
      setIdCounter(newId); // Increment ID counter
  
      const newElementData = { // Create new element data
        id: newId // Add new ID 
      };
      setElements(prevElements => [...prevElements, newElementData]); // Creates a new array by copying the previous elements 
      //and appending the new element (newElementData) to it.
    }
   
    const removeElement = (id) => {
        setElements(prevElements => // Update elements array 
          prevElements.filter(element => element.id !== id) // Filter out the element with the given ID // Remove the element from the state
        ); // Remove the ID from the state
      };

      const updateElementData = (id, updatedData) => { // Update element data

        setElements(prevElements =>  // Update elements array 
          prevElements.map(element =>  // Map over the elements array
            element.id === id ? { ...element, ...updatedData } : element // Update the element with the given ID
          )
        );
      };

  return (
    <>
    <div className='create-alert-Container'>
       {elements.map((element) => (
        <div  className='alerts-Container' key={element.id}>
          <AlertElement 
            id={element.id} 
            onUpdate={updateElementData}
            onRemove={() => removeElement(element.id)} 
            data={element} 
          />
        </div>
      ))}
  </div>
  <div className='createAlertBtn'>
      <button onClick={addElement}>+</button>
     </div>
      </>
  )
}

export default CreateNewAlertBtn;