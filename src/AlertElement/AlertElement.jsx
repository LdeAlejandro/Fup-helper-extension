import React, { useState, useEffect, useRef } from "react";
import alertImg from "../assets/alarme.png";
import "./AlertElement.css";

const AlertElement = ({ id, onRemove, data, onUpdate }) => {
  const [alertTitle, setAlertTitle] = useState(data.title || ""); // State to set title
  const [alertDescription, setAlertDescription] = useState(data.description || ""); // State to set description
  const [hours, setHours] = useState(data.HH || ""); // State to set hours
  const [minutes, setMinutes] = useState(data.mm || ""); // State to set minutes
  const [timeLeft, setTimeLeft] = useState(data.timeout || 0); // State to track time left
  const [showElements, setShowElements] = useState(data.showElements!==undefined ? data.showElements : true); // State to control element visibility
  let timerRef = useRef(null); // reference to the timer id

  // Initial state update on data change 
  useEffect(() => {
    setAlertTitle(data.title || "");
    setAlertDescription(data.description || "");
    setHours(data.HH || "");
    setMinutes(data.mm || "");
    setTimeLeft(data.timeout || 0);
    console.log("effect: ", data.showElements)
  }, [data]); // Add data as a dependency

  // Countdown logic and notification trigger
  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => { //
        // update time left 
        setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1000, 0)); // update time left Math.max prevent negative time
        onUpdate(id, { timeout: timeLeft - 1000 }); // update time left to parent
      }, 1000);
    } else if (timeLeft === 0) { // if time left is 0
      if (timerRef.current) { // if timer is not null
        // check if the timer is different from null by the timer id
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
      //   timeout: timeLeft 
      // });
    }
    return () => { // clean up function 
      if (timerRef.current) { // if timer is not null
        // check if the timer is different from null by the timer id
        clearTimeout(timerRef.current); // clear timeout
      }
    };
  }, [timeLeft]); 

  // Function to format time 
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000); // convert milliseconds to hours
    const minutes = Math.floor((time % 3600000) / 60000); // convert milliseconds to minutes
    const seconds = Math.floor((time % 60000) / 1000); // convert milliseconds to seconds
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; // return formatted time
  };

  // Function to handle changes in the Title input fields
  const handleTitleChange = (e) => {
    setAlertTitle(e.target.value);
    onUpdate(id, { title: e.target.value }); // update title to parent
  };

  // Function to handle changes in the Description input fields
  const handleDescriptionChange = (e) => {
    setAlertDescription(e.target.value);
    onUpdate(id, { description: e.target.value }); // update description to parent
  };

  // Function to handle changes in the Hours input fields
  const handleHourChange = (e) => {
    setHours(e.target.value);
    onUpdate(id, { HH: e.target.value }); // update hours to parent
  };

  //Function to handle changes in the Minutes input fields
  const handleMinuteChange = (e) => {
    setMinutes(e.target.value);
    onUpdate(id, { mm: e.target.value }); // update minutes to parent
  };

  // Function to handle the edit button
  const handleEdit = () => {
   
    setShowElements(true); // show elements 
   onUpdate(id, { showElements: true }); // update showElements to parent
    console.log(showElements)
    console.log("data: ",showElements)
  };

  // Function to handle the set timer button
  const setTimer = () => {
   
    setShowElements(false); // hide elements when the timer is set
    console.log(showElements)
   onUpdate(id, { showElements: false }); // update showElements to parent
    console.log("data: ",showElements)
    
    const hoursInMilliseconds = Number(hours) * 60 * 60 * 1000;
    const minutesInMilliseconds = Number(minutes) * 60 * 1000;
    const totalMilliseconds = hoursInMilliseconds + minutesInMilliseconds; //  calculate total milliseconds

    setTimeLeft(totalMilliseconds); // update time left 
    onUpdate(id, { timeout: totalMilliseconds }); // update time left to parent

    //  trigger notification 
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage({
      id: id, // send id of this element
      type: "showNotification", // send type
      title: alertTitle, // send title 
      message: alertDescription, // send description
      iconUrl: alertImg, // send to be shown in notification
      timeout: totalMilliseconds, // send timeout 
    });

    // if (Notification.permission !== "granted") {
    //   Notification.requestPermission().then((result) => {
    //     if (result === "granted") {
    //       console.log("Notification permission granted.");
    //     }
    //   });
    // }
  };

  // Function to handle the remove button
  const handleLocalRemove = () => {
    if (timerRef.current) { // if timer is not null
      
      clearTimeout(timerRef.current); // clear timeout
      // trigger notification to delete timer from background.js
      // eslint-disable-next-line no-undef
      chrome.runtime.sendMessage({
        id: id, // send id of this element
        type: "deleteNotification", // send type
        title: alertTitle, // send title 
        message: alertDescription, // send description
        iconUrl: alertImg, // send to be shown in notification 
      });
    }
    onRemove(id); // remove element
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
        </div>
      )}

      <div className="time-container">
        {showElements && (
          <>
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
          </button>
        )}
        {!showElements && (
          <button className="editElement" onClick={handleEdit}>
            Edit
          </button>
        )}
        <button className="deleteElement" onClick={handleLocalRemove}>
          X
        </button>
      </div>
      <hr />
    </div>
  );
};

export default AlertElement;
