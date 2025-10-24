// taken from Copilot Chat:

document.addEventListener("DOMContentLoaded", () => {
    let countS = 1; // Default session length

    const timerElement = document.querySelector(".jam-timer");

    /*
    FlipClock.SecondsCounterOneFace = FlipClock.MinuteCounterFace.extend({
      build: function () {
        // Call the parent build method
        FlipClock.MinuteCounterFace.prototype.build.call(this);
  
        // Remove the minutes digit
        this.factory.lists[0].$el.hide(); // Hide the first digit list (minutes)
      },
    });
    */
    FlipClock.SecondsOnlyFace = FlipClock.MinuteCounterFace.extend({
      build: function () {
        // Call the parent build method
        FlipClock.MinuteCounterFace.prototype.build.call(this);
    
        // Hide the minutes digit
        if (this.factory.lists[0]) {
          this.factory.lists[0].$el.hide(); // Hide the first digit list (minutes)
        }
      },
    });


    // Initialize FlipClock instance
    const jamClock = new FlipClock(timerElement, 0, {
      headings: [], // Remove headings for minutes and seconds
      countdown: true,
      clockFace: "SecondsOnly",
      autoStart: false,
      callbacks: {
        interval: function () {
          if (jamClock.getTime() === 0) {
            // jamClock.setTime(countS * 60);
            jamClock.stop();
          }
        },
      },
    });

    // Attach the clock instance to the global window object
    window.jamClock = jamClock;
    
    // Start Function
    window.startJamTimer = function() {
      const currentTime = jamClock.getTime();
      console.log(`Starting the jam timer. Current time: ${currentTime}`);
      jamClock.start();
    };
  
    // Stop Function
    window.stopJamTimer = function() {
      jamClock.stop();
      // countLama = jamClock.getTime();
    };
  
    // Clear Function
    window.resetJamTimer = function() {
      jamClock.stop();
      jamClock.setTime(countS * 60);
    };
    
    // Function to set the clock time from user input
    window.setJamTimer = function (minutes, seconds) {
      const totalSeconds = minutes * 60 + seconds;
      jamClock.stop(); // Stop the clock to reset its state
      jamClock.setTime(totalSeconds); // Set the clock's time
      // clock.start(); // Restart the clock to refresh the display
    };

    // Example usage in the browser console:
    // setClockTime(5, 30); // Sets the clock to 5 minutes and 30 seconds

    // Define a mapping of flipClock actions to their corresponding functions
    const flipClockActions = {
      start: startJamTimer,
      stop: stopJamTimer,
      reset: resetJamTimer,
      update: setJamTimer,
    };
    
    // Attach flipClockActions to the global window object
    window.jamFlipClockActions = flipClockActions;


    // Ensure ws is accessible globally
    if (typeof ws === 'undefined') {
      console.error('WebSocket (ws) is not initialized. Ensure initialize_client.js is loaded before this script.');
      return;
    }
    
    // WebSocket message event listener for flipClock
    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      console.log(`Received message: ${JSON.stringify(message)}`);
    
      if (message.type === 'jamFlipClock' && message.content) {
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
            console.log(`Executed jam flipClock action: ${message.content.action}`);
          } else {
            console.error(`Unknown jam FlipClock action: ${message.content.action}`);
          }
        }
      }
    });
  });


  // need to execute these functions when ws604 buttons are pressed
  // are these available to ws604.js file if I make them available to the window?
  // rather than fuck around, duplicate ws604.js code here

// connect to WS604 Timer

const addr_cko = '192.168.1.200';
const addr_ws = '192.168.4.1';
// use instead of window.location.hostname

let Socket = null;

function connectToJamTimer() {
    // window.onload = () => { 
        let display = "";
        // create a new WebSocket connection to clock's websocket server
        Socket = new WebSocket('ws://' + addr_cko + ':81/');
        console.log('Connected to Jam Timer Websocket');
        
        // a new message event occurs every time clock element is updated
        Socket.onmessage = (event) => {
            // get original message
            display = event.data;
            // unique data:  when jam timer begins, data is 01:00
            // when jam timer hits play, data is two digits xx
            // when jam timer hits pause, data is :xx rather than xx
            console.log(event.data);
            // update jam-timer element
            if (event.data == "01:01") {
                // this means clock has been reset to 1:00
                // use this to activate clear clock function
                resetJamTimer();
                console.log("TESTING Timer RESET")
            } else if (event.data[0] == ":") {
                // this means timer is paused
                // use this to activate stop clock function
                stopJamTimer();
                console.log("TESTING Timer STOP")
            } else if (event.data.length == 3) {
                // this means clock is ticking
                // timer only sends two digits
                // could set condition event.data == "59"
                // and activate start clock function
                startJamTimer();
                console.log("TESTING Timer COUNTDOWN")
            }
            // this fucking line below updates the jam timer element
            // this is just a copy of what the clock reads
            // for the flip clock, need to remove this line
            // and replace with flip clock start/stop/reset functions
            // the flip-clock uses the same ID "jam-timer"
            // and all the controls are in jam_timer_flip_clock_controls.js
            // so I can replace this file in from scoreboard_banner_flip_clock
            // I need to keep this websocket code but replace the line below
            // with the conditional responses above
            // which will activate the corresponding flip clock controls
            // I want to manually observe how they sync 
            // between the two scoreboard banners
            // document.getElementById("jam-timer").innerHTML = display;
        }
        Socket.onclose = (event) => {
            console.log('Jam Timer Websocket connection closed:', event);
            // attempt reconnect after a delay
            setTimeout(connectToJamTimer, 10000);
        };
        
        Socket.onerror = (error) => {
            console.error('Jam Timer Websocket error:', error);
            // close connection before attempting to reconnect 
            // after an error
            Socket.close();
        };
    //}
}

function onclicknum(nums) {
    Socket.send("#" + nums);
}

document.addEventListener('DOMContentLoaded', (event) => { 
    connectToJamTimer();
});