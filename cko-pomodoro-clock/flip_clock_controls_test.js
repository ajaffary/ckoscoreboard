// taken from Copilot Chat:

document.addEventListener("DOMContentLoaded", () => {
    let countS = 30; // Default session length
    let countB = 5; // Default break length
    let pos = "pomodoro"; // Default position
    let countLama = 0; // Last count
    let posLama = ""; // Last position
    let count;
    const statsElement = document.getElementById("stats");
    const sessionElement = document.getElementById("session");
    const breakElement = document.getElementById("break");
    const timerElement = document.querySelector(".timer");
  
    // Initialize FlipClock instance
    const clock = new FlipClock(timerElement, 0, {
      headings: ["","","",""],
      countdown: true,
      clockFace: "MinuteCounter",
      autoStart: false,
      callbacks: {
        interval: function () {
          if (clock.getTime() === 0) {
            if (pos === "session") {
              clock.setTime(countB * 60);
              clock.start();
              pos = "break";
              statsElement.textContent = pos;
            } else if (pos === "break") {
              clock.setTime(countS * 60);
              clock.start();
              pos = "session";
              statsElement.textContent = pos;
            }
          }
        },
      },
    });

    // Add custom methods to set and get time manually
    clock.setTimeManually = function (seconds) {
      this.time = seconds; // Update the internal time property
      this.flip(); // Refresh the display
    };
    
    clock.getTimeManually = function () {
      return this.time; // Return the internal time property
    };

    // Attach the clock instance to the global window object
    // window.clock = clock;
  
    // Update the initial values in the DOM
    sessionElement.textContent = countS;
    breakElement.textContent = countB;
    statsElement.textContent = pos;
  
    // Event Listeners for Session Increment/Decrement
    document.getElementById("sessInc").addEventListener("click", () => {
      countS += 1;
      sessionElement.textContent = countS;
    });
  
    document.getElementById("sessDec").addEventListener("click", () => {
      if (countS > 1) {
        countS -= 1;
        sessionElement.textContent = countS;
      }
    });
  
    // Event Listeners for Break Increment/Decrement
    document.getElementById("breakInc").addEventListener("click", () => {
      countB += 1;
      breakElement.textContent = countB;
    });
  
    document.getElementById("breakDec").addEventListener("click", () => {
      if (countB > 1) {
        countB -= 1;
        breakElement.textContent = countB;
      }
    });
  
    // Start Function
    window.startClockFunction = function() {
      if (pos === "pomodoro" || clock.getTime() === 0) {
        //count !== countS
        clock.setTime(countS * 60);
        pos = "session";
        statsElement.textContent = pos;
      } else {
        pos = posLama;
        statsElement.textContent = pos;
      }
      count = countS;
      clock.start();
    };
  
    // Stop Function
    window.stopClockFunction = function() {
      clock.stop();
      countLama = clock.getTime();
      posLama = statsElement.textContent;
    };
  
    // Clear Function
    window.clearClockFunction = function() {
      clock.stop();
      pos = "pomodoro";
      statsElement.textContent = pos;
      clock.setTime(0);
    };
  
    // Event Listeners for Start, Stop, and Clear Buttons
    document.getElementById("start").addEventListener("click", startClockFunction);
    document.getElementById("stop").addEventListener("click", stopClockFunction);
    document.getElementById("clear").addEventListener("click", clearClockFunction);
  
    // Function to set the clock time from user input
    window.setClockTime = function (minutes, seconds) {
      const totalSeconds = minutes * 60 + seconds;
      clock.stop(); // Stop the clock to reset its state
      clock.setTime(totalSeconds); // Set the clock's time
      // clock.start(); // Restart the clock to refresh the display
      statsElement.textContent = `Custom Time: ${minutes}m ${seconds}s`; // Update stats display
    };

    // Example usage in the browser console:
    // setClockTime(5, 30); // Sets the clock to 5 minutes and 30 seconds

    // Define a mapping of flipClock actions to their corresponding functions
    const flipClockActions = {
      start: startClockFunction,
      stop: stopClockFunction,
      clear: clearClockFunction,
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
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(`Received message: ${JSON.stringify(message)}`);
    
      if (message.type === 'flipClock' && message.content) {
        if (message.content.action === 'update') {
          // Execute the update function (e.g., setClockTime)
          console.log('Executing update action');
          console.log(message.senderId);
          console.log(message.content);
          minutes = message.content.data.minutes;
          seconds = message.content.data.seconds;
          setClockTime(minutes, seconds);
        } else {
          const action = flipClockActions[message.content.action];
          if (action) {
            action(); // Execute the corresponding function
            console.log(`Executed flipClock action: ${message.content.action}`);
          } else {
            console.error(`Unknown flipClock action: ${message.content.action}`);
          }
        }
      }
    };
  });