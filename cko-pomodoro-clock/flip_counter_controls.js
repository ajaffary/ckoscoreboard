// taken from Copilot Chat:

document.addEventListener("DOMContentLoaded", () => {
    let homeTeamFlipScore = 0;
    let awayTeamFlipScore = 0;

    const homeTeamCounterElement = document.querySelector(".home-team-counter");
    const awayTeamCounterElement = document.querySelector(".away-team-counter");

    // Initialize Home Team Flip Counter
    const homeTeamFlipCounter = new FlipClock(homeTeamCounterElement, 0, {
      headings: [], // Remove headings for minutes and seconds
      countdown: true,
      clockFace: "Counter",
      autoStart: false,
    });

    // Initialize Away Team Flip Counter
    const awayTeamFlipCounter = new FlipClock(awayTeamCounterElement, 0, {
      headings: [], // Remove headings for minutes and seconds
      countdown: true,
      clockFace: "Counter",
      autoStart: false,
    });
    
    // Attach the counter instances to the global window object
    window.homeTeamFlipCounter = homeTeamFlipCounter;
    window.awayTeamFlipCounter = awayTeamFlipCounter;
    
    // Increment Functions
    window.incrementScore = function() {
      console.log(`Incremented`);
      // TeamFlipCounter.increment()
    }; 
 
    // Decrement Functions
    window.decrementScore = function() {
      console.log(`Decremented`)
      // TeamFlipCounter.decrement()
    };  
 
    // Reset Functions
    window.resetScore = function() {
      console.log(`Reset`)
      // TeamFlipCounter.reset()
    };
    
    // Manually Set Score
    window.setScore = function (score) {
      console.log(`Set Score`)
      // TeamFlipCounter.setCounter() ?
    };

    // Define a mapping of flipClock actions to their corresponding functions
    // replace these with above functions for websocket messages
    const flipClockActions = {
      // increment: incrementScore,
      // decrement: decrementScore,
      // reset: resetScore,
      updateHome: setScore,
      updateAway: setScore,
      updateBoth: setScore,
    };
    
    // Attach flipClockActions to the global window object
    window.jamFlipClockActions = flipClockActions;


    // Ensure ws is accessible globally
    if (typeof ws === 'undefined') {
      console.error('WebSocket (ws) is not initialized. Ensure initialize_client.js is loaded before this script.');
      return;
    }
    
    // Incoming WebSocket message event listener for flipClock
    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      console.log(`Received message: ${JSON.stringify(message)}`);
      if (message.type === 'scoreFlipCounter' && message.content) {
        console.log(message.senderId);
        console.log(message.content);
        if (message.content.action === 'both') {
          // setScore for both teams
          console.log('update both teams');
          const home = parseInt(message.content.data.home);
          const away = parseInt(message.content.data.away);
          homeTeamFlipCounter.setValue(home);
          awayTeamFlipCounter.setValue(away);
        } else if (message.content.action == 'home') {
          // setScore home team only
          console.log('update home team');
          const home = parseInt(message.content.data.home);
          homeTeamFlipCounter.setValue(home);
        } else if (message.content.action == 'away') {
          // setScore away team only
          console.log('update away team');
          const away = parseInt(message.content.data.away);
          awayTeamFlipCounter.setValue(away);
        } else {
          console.error(`Unknown score flipClock action: ${message.content.action}`);
        }
        console.log(`Executed score flipClock action: ${message.content.action}`);
      }
    });
  });