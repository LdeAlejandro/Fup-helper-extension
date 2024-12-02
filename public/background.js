// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  // Function to create a notification
  function createNotification(title, message, iconUrl, timeout) {
    console.log(timeout)
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
  
  // Listen for messages from the React app (popup or content script) to trigger notifications
  // eslint-disable-next-line no-undef
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)

      // // eslint-disable-next-line no-undef
      // chrome.storage.local.set({ message }, () => {
      //   // eslint-disable-next-line no-undef
      //   if (chrome.runtime.lastError) {
      //     // eslint-disable-next-line no-undef
      //     console.error('Error saving elements:', chrome.runtime.lastError);
      //   }
      // });

      // console.log(chrome.storage.local.get())

    if (message.type === 'showNotification') {
        console.log("fire extension alert")
      createNotification(message.title, message.message, message.iconUrl, message.timeout);
    }
  });
  