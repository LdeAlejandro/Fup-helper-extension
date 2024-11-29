import React, {useState, useEffect} from 'react';
import AlertElement from './AlertElement';

const CreateNewAlertBtn = () => {
  const localStorageElements = JSON.parse(localStorage.getItem("elements"));
  const [idCounter, setIdCounter] = useState(0); // Counter for generating unique IDs
  const [elements, setElements] = useState(localStorageElements);

  
    
    // save data everytime it changes in the local storage
    useEffect(()=>{
      console.log("save ***************************")
      localStorage.setItem("elements",  JSON.stringify(elements));
      console.log(elements)
      console.log(" ***************************")
    },[elements])

    // load data from localStorage

    const addElement = () => {
      const newId = idCounter + 1;
      setIdCounter(newId);
  
      const newElementData = {
        ...elements,
        id: newId
      };

  
      // Add new element to elements array
      setElements(prevElements => [...prevElements, newElementData]);
    };
  
   
    const removeElement = (id) => {
        console.log("Removing element with ID:", id);
        console.log(" Current elements:", elements);
        setElements(prevElements => 
          prevElements.filter(element => element.id !== id)
        ); // Remove the ID from the state
      };

      const updateElementData = (id, updatedData) => {

        setElements(prevElements => 
          prevElements.map(element => 
            element.id === id ? { ...element, ...updatedData } : element
          )
        );
      };

  return (
    <>
       {elements.map((element) => (
        <div key={element.id}>
          <AlertElement 
            id={element.id} 
            onUpdate={updateElementData}
            onRemove={() => removeElement(element.id)} 
            data={element} 
          />
        </div>
      ))}
    <button onClick={addElement}>+</button>
  </>
  )
}

export default CreateNewAlertBtn