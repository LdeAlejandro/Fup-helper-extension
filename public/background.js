// eslint-disable-next-line no-undef
// Runs when the extension is installed or updated
// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Function to create a notification
let timers = [];
function createNotification(id,type, title, message, iconUrl, timeout) {
     const existingTimers = timers.filter(timer => timer.id === id); // check if there is an existing timer by the id

  if (existingTimers.length > 0) { // if there is a timer clear corresponding timeout
    for (const timer of existingTimers) {
      clearTimeout(timer.timerId);
    }
    timers = timers.filter(timer => timer.id !== id); // Remove the old timer from the array
  }
  
  if(type !=="deleteNotification"){
  // trigger notification after timeout finish 
  const timerId = setTimeout(() => { 
    // eslint-disable-next-line no-undef
    chrome.notifications.create({
      type: 'basic',
      iconUrl: iconUrl,
      title: title,
      message: message,
      priority: 2,
    });
    
        console.log("fire");
        const thisTimerIndex = timers.findIndex(time => time.id === id); // get the index of this timer by id
        if (thisTimerIndex !== -1) {// if the index is found
          timers.splice(thisTimerIndex, 1); // delete the element from the array
        }
  }, timeout);

  timers.push({ id: id, timerId: timerId });
  console.log(timers)
  }else{ // delete timer
    const index = timers.findIndex(element => element.id === id); // get index by id
    if (index !== -1) { // if the index is found
      clearTimeout(timer[index].timerId); // clear timeout of the element
      timers.splice(index, 1); // delete the element from the array
    }else{
      console.log("not timer id found")
    }
  }
}

// Listen for messages from the React app (popup or content script)
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  console.log('Message received:', message);

  if (message) { // if message type is showNotification
    createNotification(message.id, message.type, message.title, message.message, message.iconUrl, message.timeout); // create notification 
  }
});

// Function to update the timeout in Chrome storage every second
setInterval(() => {
  
  // Get the current elements from Chrome storage
  // eslint-disable-next-line no-undef
  chrome.storage.local.get('elements', (items) => {
    let elements = items.elements || []; // Default to an empty array if no elements are found
    let updatedElements = elements.map(element => {// Update elements array
      if (element.timeout > 0) { // if timeout is greater than 0
        // Decrease the timeout by 1000 milliseconds (1 second)
        element.timeout = Math.max(0, element.timeout - 1000); // set timeout to 0 if it is less than 0
      }
      return element; // return updated element 
    });

    // Save the updated elements back to Chrome storage
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ elements: updatedElements }, () => { // save updated elements
      // eslint-disable-next-line no-undef
      if (chrome.runtime.lastError) {
        // eslint-disable-next-line no-undef
        console.error('Error updating elements:', chrome.runtime.lastError);
      } else {
        console.log('Elements updated in storage.');
      }
    });
  });
}, 1000);
