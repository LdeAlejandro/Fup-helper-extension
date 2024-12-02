// eslint-disable-next-line no-undef
// Runs when the extension is installed or updated
// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Function to create a notification
function createNotification(title, message, iconUrl, timeout) {
  console.log('Notification will be shown in:', timeout);
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

  if (message.type === 'showNotification') {
    console.log("Triggering notification");
    createNotification(message.title, message.message, message.iconUrl, message.timeout);
  }
});

// Function to update the timeout in Chrome storage every second
setInterval(() => {
  
  // Get the current elements from Chrome storage
  // eslint-disable-next-line no-undef
  chrome.storage.local.get('elements', (items) => {
    let elements = items.elements || [];
    let updatedElements = elements.map(element => {
      if (element.timeout > 0) {
        // Decrease the timeout by 1000 milliseconds (1 second)
        element.timeout = Math.max(0, element.timeout - 1000);
      }
      return element;
    });

    // Save the updated elements back to Chrome storage
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ elements: updatedElements }, () => {
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

