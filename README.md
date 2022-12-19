# FootballScoreBoard

A typescript library to manage live football scores

# Notes and assumptions

## **Board**

### Add Match (start a game)

For storing matches and scores I have decided to make use of Maps() because:

-   Keys can be an array
-   ES6 destructuring
-   Performance adding, deleting or finding properties

Even when for this sample it won't make a massive difference, I have taken into consideration the possibility of having several games at once.

### Update Score

When updating the score of a match I assumpt it will come as one single element with a pair of numbers. Those being structured as first value for the home team, second value for the away team. ie: [0,0]

## **Match**

### Class Match()

Originally I intended to make use of the possibility of setting matches' Map() with their teams array as key (ie: `['Team 1', 'Team 2'] => [0,0]`), but while it does work it also has some caveats.

Maps() would use the reference to the array, not the array's content. Therefore two arrays with same content would fail to be found on the Map(). ie:

```javascript
const arrayA = ['Team 1', 'Team 2'];
const arrayB = ['Team 1', 'Team 2'];

const map = new Map();

map.set(arrayA);
console.log(map.has(arrayA)); // true
console.log(map.has(arrayB)); // false
```

#### Solutions considered (chronological ordered):

-   After adding a match (starting a game), return the key used. It would work but it would be an extra element to control and storage by the client, making it less simple to use.

-   Following the last approach: Make the stored match a Class Match() and return the new match. In that way, the client could update the scores without having to pass the teams together with the score (ie: `const matchA = board.addMatch(['Team 1', 'Team 2']); matchA.updateScore([1,0]);`) However this would still have the same problem as above but also increase complexity having to manage somehow the same thing (the match on the board) using two different processes.

-   **(Final decision)** Convert Map() key to a simple string and move teams into the Maps() value together with their score. Better using a Class Match() to follow an OOP approach.

```javascript
[
    '["Team 1", "Team 2"]',
    {
        score: [0, 0],
        teams: ['Team 1', 'Team 2'],
    },
];
```
