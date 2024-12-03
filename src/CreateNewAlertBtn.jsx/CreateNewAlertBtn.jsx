import React, {useState, useEffect} from 'react';
import AlertElement from '../AlertElement/AlertElement.jsx';
import './CreateNewAlertBtn.css';

const CreateNewAlertBtn = () => {

  const [elements, setElements] = useState([]) || [];
  const [idCounter, setIdCounter] = useState(elements.id || 0); // Counter for generating unique IDs


  // Load elements from chrome storage on component mount
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.get('elements', (items) => {
      let storedElements = items.elements || [];
      console.log("USE EFFECT: ",storedElements)
      setElements(storedElements);

      // Set idCounter based on stored elements
      if (storedElements.length > 0) {
        setIdCounter(storedElements[storedElements.length - 1].id + 1);
      }
    });
  }, []);

    // save data everytime it changes in the local storage
    useEffect(()=>{
      //localStorage.setItem("elements",  JSON.stringify(elements)); // Save elements to localStorage 
      // eslint-disable-next-line no-undef
      chrome.storage.local.set({ elements }, () => {
        // eslint-disable-next-line no-undef
        if (chrome.runtime.lastError) {
          // eslint-disable-next-line no-undef
          console.error('Error saving elements:', chrome.runtime.lastError);
        }
      });
    },[elements])

    

    // CountDown Timer

    const addElement = () => { 
     
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
        <a href="https://github.com/LdeAlejandro/Fup-helper-extension" target="_blank" rel="noopener noreferrer"> About this App!</a>
      </>
  )
}

export default CreateNewAlertBtn;