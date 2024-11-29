import React from 'react';
import { useState, useEffect } from 'react';
import alertImg from "./assets/alertIcon.jpg";


const AlertElement = ({id, onRemove, data, onUpdate }) => {

  const [alertTitle, setAlertTitle] = useState(data.title);
  const [alertDescription, setAlertDescription] = useState(data.description);
  const [hours, setHours] = useState(Number(data.HH));
  const [minutes, setMinutes] = useState(Number(data.mm));
  const [alertTimeout, setAlertTimeout] = useState(data.HHtimeout);

  // update data when loaded data is available
  useEffect(()=>{
    setAlertTitle(data.title);
    setAlertDescription(data.description);
    setHours(data.HH);
    setMinutes(data.minutes);
    setAlertTimeout(data.timeout);
  },[data])

  

  const handleTitleChange = (e) => {
    setAlertTitle(e.target.value);
    onUpdate(id, { title: e.target.value });
  
  };

  const handleDescriptionChange = (e) => {
    setAlertDescription(e.target.value);
    onUpdate(id, { description: e.target.value });
 

  };

  const handleHourChange = (e) => {
    setHours(e.target.value);
    onUpdate(id, { HH: e.target.value });
   
 
  };

  const handleMinuteChange = (e) => {
    setMinutes(e.target.value);
    onUpdate(id, { mm: e.target.value });

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
        <div id={id}>
        <input  placeholder = "Title or case" type="text" onChange={handleTitleChange} value = {alertTitle} required/>
        <input  placeholder = "Description" type="text" onChange={handleDescriptionChange} value = {alertDescription} required/>
        </div>
        <input type="number" onChange={handleHourChange} id="hour" name="hour" min="0" max="2" placeholder="HH" value = {hours} required />
        <input type="number" onChange={handleMinuteChange} id="hour" name="hour" min="0" max="59" placeholder="mm"  value = {minutes} required />
        <button onClick={setTimer}>Set Timer</button>
        <button onClick={() =>onRemove(id)}>X</button>
    </>
  )
}

export default AlertElement;