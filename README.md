# FootballScoreBoard

A typescript library to manage live football scores

# Notes and assumptions

## Matches

For storing matches and scores I have decided to make use of Maps() because:

-   Keys can be an array
-   ES6 destructuring
-   Performance adding, deleting or finding properties

Even when for this sample it won't make a massive difference, I have taken into consideration the possibility of having several games at once.
