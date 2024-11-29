import React from 'react';
import { useState, useEffect } from 'react';
import alertImg from "./assets/alertIcon.jpg";


const AlertElement = ({id, onRemove, title, desc, HH, mm, timeout }) => {

  const [elementId, setElementId] = useState(id);
  const [alertTitle, setAlertTitle] = useState(title || "sadasd");
  const [alertDescription, setAlertDescription] = useState(desc || "");
  const [hours, setHours] = useState(Number(HH) || 0);
  const [minutes, setMinutes] = useState(Number(mm) || 0);
  const [alertTimeout, setAlertTimeout] = useState(timeout || 0);

  // Saving elements to localStorage whenever elements change
  const saveData = () => {
    console.log("save")
    // Create an object with the data to be stored
    const elementInfo = {
      id,
      alertTitle,
      alertDescription,
      hours,
      minutes,
      alertTimeout,
    };
  
    // Store the element info as a JSON string in localStorage
    localStorage.setItem('elements', JSON.stringify(elementInfo));
    console.log(elementInfo)  
  }

  // useEffect(() => {
  //   // Create an object with the data to be stored
  //   const elementLoadedInfo =  JSON.parse(localStorage.getItem('elements'));
  //   console.log(elementLoadedInfo)
    
  //   setElementId(elementLoadedInfo.id)  
  //   setAlertTitle(elementLoadedInfo.alertTitle);
  //   setAlertDescription(elementLoadedInfo.alertDescription);
  //   setHours(elementLoadedInfo.hours);
  //   setMinutes(elementLoadedInfo.minutes);
  //   setAlertTimeout(elementLoadedInfo.alertTimeout);

    
  // }, []);

  const handleTitleChange = (e) => {
    setAlertTitle(e.target.value);
    saveData();
  };

  const handleDescriptionChange = (e) => {
    setAlertDescription(e.target.value);
    saveData();

  };

  const handleHourChange = (e) => {
    setHours(e.target.value);
    saveData();
 
  };

  const handleMinuteChange = (e) => {
    setMinutes(e.target.value);
    saveData();
 
  };

  const setTimer = (e) => {  

    console.log("timer set")
    setAlertTimeout ((hours * 60 * 1000) + (minutes * 60 * 1000));
    console.log(alertTimeout)
    console.log("text", alertTitle, alertDescription)
     if(window.location.href.includes("")){
      Notification.requestPermission().then((result) => { //request browser permission to send notifications

     if (result === "granted") {
      console.log("Granted Permisions");
     setTimeout(() => {
      console.log("Fire Notification");
      
      const notification = new Notification( alertTitle.toString(), {
        body: alertDescription.toString(),
        icon: alertImg
      }); 
    }, alertTimeout);
  }
   });
  }
  
}
  return (
    <>
        <div>
        <input  placeholder = "Title or case" type="text" onChange={handleTitleChange} required/>
        <input  placeholder = "Description" type="text" onChange={handleDescriptionChange} required/>
        </div>
        <input type="number" onChange={handleHourChange} id="hour" name="hour" min="0" max="2" placeholder="HH" required />
        <input type="number" onChange={handleMinuteChange} id="hour" name="hour" min="0" max="2" placeholder="mm" required />
        <button onClick={setTimer}>Set Timer</button>
        <button onClick={() =>onRemove(elementId)}>X</button>
    </>
  )
}

export default AlertElement;