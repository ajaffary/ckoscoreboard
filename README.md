# Chicago Knockouts Scoreboard
Scoreboard app for the [Chicago Knockouts Roller Derby](http://chicagoknockouts.com) live stream.

The app uses [websockets](https://websockets.readthedocs.io/en/stable/) to send scoreboard updates from a source client to two target clients.

Source clients: 
- `scoreboard_controls.html`

Target clients:
- `scoreboard_banner.html`: used as a Browser Source overlay in [OBS](https://obsproject.com)
- `scoreboard_announcers.html`: a larger display for announcers during the live bouts

Additionally, the target clients obtain clock timer data in real-time through a second websocket server built into a West Ocean (https://www.amazon.com/West-Ocean-Oversized-Countdown-Multifunction/dp/B08LGBNZVH?th=1) game clock.  We appreciate the generosity of West Ocean in supplying the code.

## Source Client
The `scoreboard_controls.html` client currently sends the following data:
- Home Team Score
- Away Team Score
- Jam Number
- Period Number
- End of Period
- Halftime
- Final Score

## Target Clients
The `scoreboard_banner.html` and `scoreboard_announcers.html` clients display all of the above data.  The UI is still being revised.

## Next Steps
- Buttons to initialize team names and logos
- Add Time Out message
- Add a Game Clock timer
- Recreate the Jam Timer as a "flip clock"
- Participant Name updates
- Penalty updates
- Sponsorship messages
- Ping method(s) to avoid client disconnections
- Method(s) to store and restore scoreboard data in case of a loss in connection
- Method(s) to store a timestamped log of all score updates throughout a live event
