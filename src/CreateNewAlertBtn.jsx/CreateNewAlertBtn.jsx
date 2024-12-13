import React, { useState, useEffect } from "react";
import AlertElement from "../AlertElement/AlertElement.jsx";
import "./CreateNewAlertBtn.css";

const CreateNewAlertBtn = () => {
  const [elements, setElements] = useState([]) || []; // State to store elements
  const [idCounter, setIdCounter] = useState(elements.id || 0); // Counter for generating unique IDs

  // Load elements from chrome storage on component mount
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.get("elements", (items) => {
      // Get elements from Chrome storage
      let storedElements = items.elements || []; // Default to an empty array if no elements are found
      setElements(storedElements); // Set elements state
      // Set idCounter based on stored elements
      if (storedElements.length > 0) {
        // Check if there are elements in the array
        setIdCounter(storedElements[storedElements.length - 1].id + 1); // Context the last element's ID and increment it by 1 to generate a unique ID
      }
    });
  }, []); // Empty dependency array means this effect runs once on component mount

  // save data everytime it changes in the local storage
  useEffect(() => {
    //localStorage.setItem("elements",  JSON.stringify(elements)); // Save elements to localStorage
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ elements }, () => {
      // Save elements to Chrome storage
      // eslint-disable-next-line no-undef
      if (chrome.runtime.lastError) {
        // Check for errors
        // eslint-disable-next-line no-undef
        console.error("Error saving elements:", chrome.runtime.lastError); //  Log error
      }
    });
  }, [elements]);

  // Function to add a new element
  const addElement = () => {
    const newId = idCounter + 1; // Generate unique ID
    setIdCounter(newId); // Increment ID counter

    const newElementData = {
      // Create new element data
      id: newId, // Add new ID
    };
    setElements((prevElements) => [...prevElements, newElementData]); // Creates a new array by copying the previous elements
    //and appending the new element (newElementData) to it.
  };

  // Function to remove an element
  const removeElement = (id) => {
    setElements(
      (
        prevElements // Update elements array
      ) => prevElements.filter((element) => element.id !== id) // Filter out the element with the given ID // Remove the element from the state
    ); // Remove the ID from the state
  };

  // Function to update element data
  const updateElementData = (id, updatedData) => {
    // Update element data
    setElements((prevElements ) => prevElements.map((element) => ( // Update elements array 
        element.id === id ? { ...element, ...updatedData } : element) // Update the element with the given ID
        )
    );

    console.log(elements)
  };

  return (
    <>
      <div className="create-alert-Container">
        {elements.map((element) => (
          <div className="alerts-Container" key={element.id}>
            <AlertElement
              id={element.id}
              onUpdate={updateElementData}
              onRemove={() => removeElement(element.id)}
              data={element}
            />
          </div>
        ))}
      </div>
      <div className="createAlertBtn">
        <button onClick={addElement}>+</button>
      </div>
      <a
        href="https://github.com/LdeAlejandro/Fup-helper-extension"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        About this App!
      </a>

      <p className="version-text">Version 1.2 Last update 12/12/24</p>
    </>
  );
};

export default CreateNewAlertBtn;
