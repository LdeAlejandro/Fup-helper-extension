# Timer Alert Chrome Extension

## Overview
This extension helps users set up timers with customizable alerts. You can add multiple timers, each with a title, description, and specific countdown time. When the timer expires, the extension triggers a notification with the provided details, ensuring you never miss important reminders or tasks.

[View Extension on Chrome Web Store](https://chromewebstore.google.com/detail/timer-alarm/agikkjapgncblbhohigjmoeiekmbpjil)

---

## Features

- **Add Custom Alerts**: Create alerts with a title, description, and a specified countdown duration.
- **Real-Time Countdown**: See the remaining time for each alert in an easy-to-read format.
- **Edit or Delete Alerts**: Modify existing alerts or remove them entirely.
- **Persistent Storage**: Alerts are saved in Chrome's local storage, ensuring they persist even if you close your browser.
- **Notifications**: Receive desktop notifications when a timer ends.
- **Multiple Timers**: Add and manage multiple timers simultaneously.

---

## How It Works

1. **Add a Timer**: Click the `+` button to create a new alert.
   - Input the title, description, hours, and minutes.
   - Set the timer to start the countdown.

2. **Edit a Timer**:
   - Modify the title, description, or time of an existing timer.
   - Switch between editing mode and countdown mode.

3. **Delete a Timer**:
   - Remove the timer and its notification using the `X` button.

4. **Desktop Notifications**:
   - When a timer ends, the extension triggers a desktop notification with the alert's details.
   - Notifications are customizable and include the title, description, and an icon.

---

## Technical Details

### Main Components

1. **`CreateNewAlertBtn` Component**:
   - Manages the list of alerts.
   - Handles state updates and saves changes to Chrome local storage.
   - Provides functionality to add, remove, or update alerts.

2. **`AlertElement` Component**:
   - Represents individual alerts with options to set title, description, and timer values.
   - Manages timer countdown logic and visibility toggles for editing or countdown mode.

3. **Background Script**:
   - Manages notification timers.
   - Listens for messages from the app to trigger or delete notifications.
   - Periodically updates the remaining time of all alerts in storage.

---

## Installation

1. Download the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/timer-alarm/agikkjapgncblbhohigjmoeiekmbpjil).
2. Click "Add to Chrome" and confirm.
3. Open the extension by clicking its icon in the Chrome toolbar.

---

## Usage

1. Open the extension by clicking its icon in Chrome.
2. Add a timer by filling out the form and clicking "Set."
3. Edit or delete timers as needed.
4. Receive notifications when timers expire.

---

## Permissions

- **Chrome Storage**: Used to save alert data persistently.
- **Notifications**: Required to display desktop notifications.

---
