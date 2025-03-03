function restorestate() {
    // get the state of the scoreboard from localStorage
    // have server resend websocket messages
    // or
    // have client assign content to scoreboard elements from localStorage
    // issues:  server has most recent state

}

scoreboardState = {
	home: '00',
	away: '00',
	jam: '0',
	segment: 'Period 1',
	timeout: false,
	gameclock: '30:00'
}

// save above data to localStorage
// use setItem() method
// https://medium.com/@joeylee08/localstorage-101-persisting-browser-data-on-the-client-694cea0981b3

// retrieve with getItem() method

// want textContent of corresponding elements to autoupdate upon reconnection

// how to trigger reconnect?

// ws onmessage uses callback associated with message typeof

// need a similar event handler to update all elements
// https://softwareengineering.stackexchange.com/questions/434117/websocket-client-reconnection-best-practices
// 

/*
this is an example of localStorage with current controls
these appear only after the updates have been applied by each button individually
I would like the scoreboard to initialize localStorage with some values
which are already set in the scoreboard_banner HTML file

{
    "home-team-score": "01",
    "jam-number": "1",
    "away-team-score": "01",
    "game-segment": "END OF PERIOD 2"
}
*/

// Possible to use localStorage to restore state by creating a button that
// maps values from localStorage to respective elements
// question:  can I do this locally from each client?
// or do I need to send a message to the server to send a message to all clients?

// I will need to think about this
// perhaps I can put a button on the page to carry this out
// first, write a function to carry this out
// attach that function to a button