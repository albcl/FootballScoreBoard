# FootballScoreBoard

A typescript library to manage live football scores

# Notes and assumptions

## Matches

### Add Match (start a game)

For storing matches and scores I have decided to make use of Maps() because:

-   Keys can be an array
-   ES6 destructuring
-   Performance adding, deleting or finding properties

Even when for this sample it won't make a massive difference, I have taken into consideration the possibility of having several games at once.

### Update Score

When updating the score of a match I assumpt it will come as one single element with a pair of numbers. Those being structured as first value for the home team, second value for the away team. ie: [0,0]
