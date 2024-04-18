# Chicago Knockouts Scoreboard
This is a scoreboard banner and a simple set of controls for the [Chicago Knockouts Roller Derby](http://chicagoknockouts.com) live stream.
The banner is used as a Browser Source in [OBS](https://obsproject.com).

At the moment, only the score update controls are functional.  The UI template for:
- game clock
- jam timer
- jam number
- period number / start / end
- time out
- final score

has been written.  The control functions need to be written.

This only works on the client side using `localStorage`.  My goal is to add a simple back-end to improve speed and add an interface to
update participant names with simple css text animations in sync with the announcers.
