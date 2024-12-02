// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Function to create a notification
function createNotification(id, title, message, iconUrl, timeout) {
  let currentTimeOut = timeout;

  // Update the countdown value every second
  const countdownInterval = setInterval(() => {
    currentTimeOut = Math.max(Number(currentTimeOut) - 1000, 0);

    // Log the adjusted countdown for debugging
    console.log('Adjusted Timeout:', currentTimeOut);
    updateTimeOut(id, currentTimeOut);

    // Stop the interval when the countdown reaches 0
    if (currentTimeOut === 0) {
      clearInterval(countdownInterval);
      console.log('Countdown complete');
    }
  }, 1000);

  setTimeout(() => {
    console.log('timeout:', timeout);
    // Corrected chrome.notifications.create call
    // eslint-disable-next-line no-undef
    chrome.notifications.create(
      id, // Notification ID as a separate parameter
      {
        type: 'basic',
        iconUrl: iconUrl,
        title: title,
        message: message,
        priority: 2,
      },
      () => {// eslint-disable-next-line no-undef
        if (chrome.runtime.lastError) {
          // eslint-disable-next-line no-undef
          console.error('Notification error:', chrome.runtime.lastError);
        } else {
          console.log('Notification created successfully.');
        }
      }
    );
  }, timeout);
}

function updateTimeOut(id, currentTimeOut) {
  // eslint-disable-next-line no-undef
  chrome.storage.local.get(['elements'], (result) => {
    const elements = result.elements || []; // Ensure we have an array
    const updatedElements = elements.map(element => {
      if (element.id === id) {
        return { ...element, timeout: currentTimeOut }; // Update the timeout for the matching element
      }
      return element; // Leave other elements unchanged
    });

    // Save the updated elements array back to storage
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ elements: updatedElements }, () => {
       // eslint-disable-next-line no-undef
      if (chrome.runtime.lastError) {
         // eslint-disable-next-line no-undef
        console.error('Error saving elements:', chrome.runtime.lastError);
      } else {
        console.log('Updated elements successfully:', updatedElements);
      }
    });
  });
}


