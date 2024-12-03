// eslint-disable-next-line no-undef
// Runs when the extension is installed or updated
// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Function to create a notification
function createNotification(title, message, iconUrl, timeout) {
  console.log('Notification will be shown in:', timeout);

  // trigger notification after timeout finish  
  setTimeout(() => { 
    // eslint-disable-next-line no-undef
    chrome.notifications.create({
      type: 'basic',
      iconUrl: iconUrl,
      title: title,
      message: message,
      priority: 2,
    });
  }, timeout);
}

// Listen for messages from the React app (popup or content script)
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  console.log('Message received:', message);

  if (message.type === 'showNotification') { // if message type is showNotification
    console.log("Triggering notification");
    createNotification(message.title, message.message, message.iconUrl, message.timeout); // create notification 
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

