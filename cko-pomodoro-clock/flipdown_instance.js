document.addEventListener("DOMContentLoaded", () => {
  // Initialize FlipDown instance
  const clock = new FlipClock(Math.floor(Date.now() / 1000) + 1800, { // 30 minutes from now
    headings: ["", "", "", ""], // Remove headings
    theme: "light", // Use light theme
  });

  // Start the FlipDown clock
  clock.start();

  // Attach the clock instance to the global window object
  window.clock = clock;

  // Start Function
  window.startClockFunction = function () {
    console.log("Starting the clock...");
    clock.start();
  };

  // Stop Function
  window.stopClockFunction = function () {
    console.log("Stopping the clock...");
    clock.stop();
  };

  // Reset Function
  window.resetClockFunction = function () {
    console.log("Resetting the clock...");
    clock.stop();
    clock.setTime(Math.floor(Date.now() / 1000) + 1800); // Reset to 30 minutes from now
  };

  // Update Function
  window.setClockTime = function (minutes, seconds) {
    console.log(`Updating the clock to ${minutes} minutes and ${seconds} seconds...`);
    const totalSeconds = minutes * 60 + seconds;
    clock.stop();
    clock.setTime(Math.floor(Date.now() / 1000) + totalSeconds);
  };

  // WebSocket message event listener for FlipClock
  if (typeof ws !== "undefined") {
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(`Received message: ${JSON.stringify(message)}`);

      if (message.type === "flipClock" && message.content) {
        const action = window.flipClockActions[message.content.action];
        if (action) {
          action(message.content.data.minutes, message.content.data.seconds);
          console.log(`Executed flipClock action: ${message.content.action}`);
        } else {
          console.error(`Unknown flipClock action: ${message.content.action}`);
        }
      }
    };
  } else {
    console.error("WebSocket (ws) is not initialized. Ensure initialize_client.js is loaded before this script.");
  }

  // Define a mapping of FlipClock actions to their corresponding functions
  const flipClockActions = {
    start: window.startClockFunction,
    stop: window.stopClockFunction,
    reset: window.resetClockFunction,
    update: window.setClockTime,
  };

  // Attach flipClockActions to the global window object
  window.flipClockActions = flipClockActions;
});