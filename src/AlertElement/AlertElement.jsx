import React, { useState, useEffect, useRef } from 'react';
import alertImg from '../assets/alertIcon.jpg';
import './AlertElement.css';

const AlertElement = ({ id, onRemove, data, onUpdate }) => {


  const [alertTitle, setAlertTitle] = useState(data.title || "");
  const [alertDescription, setAlertDescription] = useState(data.description || "");
  const [hours, setHours] = useState(data.HH || "");
  const [minutes, setMinutes] = useState(data.mm || "");
  const [timeLeft, setTimeLeft] = useState(data.timeout || 0);
  const [showElements , setShowElements] = useState(true);
  let timerRef = useRef(null);

  useEffect(() => {
    setAlertTitle(data.title || "");
    setAlertDescription(data.description || "");
    setHours(data.HH || "");
    setMinutes(data.mm || "");
    setTimeLeft(data.timeout || 0);
  }, [data]);

  // Countdown logic and notification trigger
  useEffect(() => {
    if (timeLeft > 0) {
      //onUpdate(id, { timeout: timeLeft }); // update timeout 
      timerRef.current = setTimeout(() => { // set timer 
        setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1000, 0)); // update time left Math.max prevent negative time
        onUpdate(id, { timeout: timeLeft - 1000 });

      }, 1000);
    } else if (timeLeft === 0) {
      if (timerRef.current) { // check if the timer is different from null by the timer id
        clearTimeout(timerRef.current); // clear timeout 

        // if (Notification.permission === "granted") {
        //   new Notification( alertTitle, { // create notification
        //     body: alertDescription,
        //     icon: alertImg
        //   }); 
    
        
        // }
      }

            // // eslint-disable-next-line no-undef
            // chrome.runtime.sendMessage({
            //   type: 'showNotification',
            //   title: alertTitle,
            //   message: alertDescription,
            //   iconUrl: alertImg,
            //   timeout: timeLeft // Make sure this path is correct relative to the extension's root
            // });

        
      
    }

    return () => {
      if (timerRef.current) { // check if the timer is different from null by the timer id
        clearTimeout(timerRef.current); // clear timeout
      }
    };
  }, [timeLeft]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000); // convert milliseconds to hours
    const minutes = Math.floor((time % 3600000) / 60000); // convert milliseconds to minutes
    const seconds = Math.floor((time % 60000) / 1000); // convert milliseconds to seconds
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

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

  const handleEdit= ()=>{
    setShowElements(true);
  }

  const setTimer = () => {
  
    setShowElements(false);
    const hoursInMilliseconds = Number(hours) * 60 * 60 * 1000;
    const minutesInMilliseconds = Number(minutes) * 60 * 1000;
    const totalMilliseconds = hoursInMilliseconds + minutesInMilliseconds;

    setTimeLeft(totalMilliseconds);
    onUpdate(id, { timeout: totalMilliseconds });

      // eslint-disable-next-line no-undef
      chrome.runtime.sendMessage({
        id: id,
        type: 'showNotification',
        title: alertTitle,
        message: alertDescription,
        iconUrl: alertImg,
        timeout: totalMilliseconds 
      });

    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }
  };

  const handleLocalRemove = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onRemove(id);
  };

  return (
    <div className="alert-container">
              <p>
          Title: {alertTitle}
          <br />
          Time Left: {formatTime(timeLeft)}
        </p>
        {showElements && (
      <div id={id} className="title-description-container">
        <input
          placeholder="Title or case"
          type="text"
          onChange={handleTitleChange}
          value={alertTitle}
          required
        />
        <input
          placeholder="Description"
          type="text"
          onChange={handleDescriptionChange}
          value={alertDescription}
          required
        />
      </div>)} 
     
      <div className="time-container">
        {showElements && (<>
        <input
          type="number"
          onChange={handleHourChange}
          id="hour"
          name="hour"
          min="0"
          max="23"
          placeholder="HH"
          value={hours}
          required
        />
        <input
          type="number"
          onChange={handleMinuteChange}
          id="minutes"
          name="minutes"
          min="0"
          max="59"
          placeholder="mm"
          value={minutes}
          required
        />        
        </>
          
        )} 
        {showElements && (
        <button className="setTimer" onClick={setTimer}>
          Set 
        </button>)}
        {!showElements && (
        <button className="editElement" onClick={handleEdit}>
          Edit
        </button> )}
        <button className="deleteElement" onClick={handleLocalRemove}>
          X
        </button>
      </div>
      <hr />
    </div>
  );
};

export default AlertElement;
