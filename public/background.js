// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  // Function to create a notification
  function createNotification(title, message, iconUrl) {
    // eslint-disable-next-line no-undef
    chrome.notifications.create({
      type: 'basic',
      iconUrl: iconUrl,
      title: title,
      message: message,
      priority: 2,
    });
  }
  
  // Listen for messages from the React app (popup or content script) to trigger notifications
  // eslint-disable-next-line no-undef
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'showNotification') {
        console.log("fire extension alert")
      createNotification(message.title, message.message, message.iconUrl);
    }
  });
  