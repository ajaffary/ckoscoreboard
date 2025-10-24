// taken from Copilot Chat:

document.addEventListener("DOMContentLoaded", () => {
    let countS = 30; // Default session length

    let countLama = 0; // Last count
    
    let count;
    // const statsElement = document.getElementById("stats");
    // const sessionElement = document.getElementById("session");
    // const breakElement = document.getElementById("break");
    const timerElement = document.querySelector(".timer");
  
    // Initialize FlipClock instance
    const clock = new FlipClock(timerElement, 0, {
      headings: [], // Remove headings for minutes and seconds
      countdown: true,
      clockFace: "MinuteCounter",
      autoStart: false,
      callbacks: {
        interval: function () {
          if (clock.getTime() === 0) {
            clock.setTime(countS * 60);
            clock.start();
          }
        },
      },
    });

    // Attach the clock instance to the global window object
    window.clock = clock;
    
    // Start Function
    window.startClockFunction = function() {
      if (clock.getTime() === 0) {
        //count !== countS
        clock.setTime(countS * 60);
      };
      count = countS;
      clock.start();
    };
  
    // Stop Function
    window.stopClockFunction = function() {
      clock.stop();
      countLama = clock.getTime();
    };
  
    // Clear Function
    window.resetClockFunction = function() {
      clock.stop();
      clock.setTime(countS * 60);
    };
    
    // Function to set the clock time from user input
    window.setClockTime = function (minutes, seconds) {
      const totalSeconds = minutes * 60 + seconds;
      clock.stop(); // Stop the clock to reset its state
      clock.setTime(totalSeconds); // Set the clock's time
      // clock.start(); // Restart the clock to refresh the display
    };

    // Example usage in the browser console:
    // setClockTime(5, 30); // Sets the clock to 5 minutes and 30 seconds

    // Define a mapping of flipClock actions to their corresponding functions
    const flipClockActions = {
      start: startClockFunction,
      stop: stopClockFunction,
      reset: resetClockFunction,
      update: setClockTime,
    };
    
    // Attach flipClockActions to the global window object
    window.flipClockActions = flipClockActions;


    // Ensure ws is accessible globally
    if (typeof ws === 'undefined') {
      console.error('WebSocket (ws) is not initialized. Ensure initialize_client.js is loaded before this script.');
      return;
    }
    
    // WebSocket message event listener for flipClock
    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      console.log(`Received message: ${JSON.stringify(message)}`);
    
      if (message.type === 'gameFlipClock' && message.content) {
        if (message.content.action === 'update') {
          // Execute the update function (e.g., setClockTime)
          console.log('Executing update action');
          console.log(message.senderId);
          console.log(message.content);
          // something is getting fucked up here where minutes adds extra zeros
          let minutes = parseInt(message.content.data.minutes);
          let seconds = parseInt(message.content.data.seconds);
          setClockTime(minutes, seconds);
        } else {
          const action = flipClockActions[message.content.action];
          if (action) {
            action(); // Execute the corresponding function
            console.log(`Executed game FlipClock action: ${message.content.action}`);
          } else {
            console.error(`Unknown game FlipClock action: ${message.content.action}`);
          }
        }
      }
    });
  });