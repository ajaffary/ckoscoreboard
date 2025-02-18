// note: 
// none of the code below is necessary
// the scoreboard client can connect to the clock websocket directly
// to obtain and update the clock timer element in real time
// exactly like the remote control app does
// we just change the ID to be our jam timer element


// send clock timer data to the server
// clock app runs at 192.168.1.200 at the auditorium
// its websocket server runs at ws://192.168.1.200:81

// what I really want to do is create an eventlistener to the play/pause button
// but only execute callback when the timer is set to jam time 1:00

// so logic is:
// add mutation observer to the timer
// mutation callback function sends a websocket message to the scoreboard server
// add event listener to play/pause button
// even listener callback function is:
// if (timer.innerHTML = '1:00') {
//   invoke observer
// } then close observer when timer resets?
// }


// connect to scoreboard websocket server
// this is done in initialize_ws.js script

// add this to the mutation observer callback function
// this sends the timer data to the scoreboard client
// where is this code?
// use the variable 'dis' from the rc script?
// send that to ws server

function sendTimerData(data) { ws.send(JSON.stringify(data)) }

const config = { attributes: true, childList: true, subtree: true };

const timer = document.getElementById('clock');
const timerData = timer.innerHTML;

function mCallback(mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      // execute what happens when Mutation is detected
      // want to send a websockets messagex
      const message = {
        type: 'jamTimer',
        senderId: 'clockRC',
      };
      Socket.send(JSON.stringify(message));
      // confirm Mutation is detected
      console.log('Mutation Detected: A child node has been added or removed.');
      // send the timer data to scoreboard client
      // sendTimerData(dis);
      console.log(timerData);
      ws.send(JSON.stringify(timerData));
    }
  }
}

const observer = new MutationObserver(mCallback);

observer.observe(timer, config)