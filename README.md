# Chicago Knockouts Scoreboard
Scoreboard app for the [Chicago Knockouts Roller Derby](http://chicagoknockouts.com) live stream.

The app uses [websockets](https://websockets.readthedocs.io/en/stable/) to send scoreboard updates from a source client to two target clients.

Source clients: 
- `scoreboard_controls.html`

Target clients:
- `scoreboard_banner.html`: used as a Browser Source overlay in [OBS](https://obsproject.com)
- `scoreboard_announcers.html`: a larger display for announcers during the live bouts

Additionally, the target clients obtain clock timer data in real-time through a second websocket server built into a West Ocean (https://www.amazon.com/West-Ocean-Oversized-Countdown-Multifunction/dp/B08LGBNZVH?th=1) game clock.  We appreciate the generosity of West Ocean in supplying the code.

The clients have a rudimentary way to restore the most recent state in case of a connection loss.

## Source Client
The `scoreboard_controls.html` client currently sends the following data:
- Home Team Score
- Away Team Score
- Jam Number
- Game Clock
- Time Out Message
- Period Number
- Halftime
- Final Score

## Target Clients
The `scoreboard_banner.html` and `scoreboard_announcers.html` clients display all of the above data.

## Next Steps
- Buttons to initialize team names and logos
- Recreate the Timers as flip clocks
- Participant Name updates
- Penalty updates
- Sponsorship messages
- A timestamped log of all updates sent from the source client
