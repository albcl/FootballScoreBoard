# FootballScoreBoard

=========

A typescript library to manage live football scores

## Installation

`yarn install footballscoreboard` or `npm install footballscoreboard`

## Usage

```javascript
const footballBoard = new Board();

/**
 * Start games by adding matches to the board
 * @param {string[]} Single array with two strings in it (['home team', 'away team'])
 */
footballBoard.addMatch(['Croatia', 'Brazil']);
footballBoard.addMatch(['Netherlands', 'Argentina']);
footballBoard.addMatch(['Morocco', 'Portugal']);
footballBoard.addMatch(['England', 'France']);

/**
 * Update their results
 * @param {string[]} Single array with teams
 * @param {number[]} Score array as ['home team score', 'away team score']
 */
footballBoard.updateScore(['Croatia', 'Brazil'], [1, 1]);
footballBoard.updateScore(['Netherlands', 'Argentina'], [2, 2]);
footballBoard.updateScore(['Morocco', 'Portugal'], [1, 0]);
footballBoard.updateScore(['England', 'France'], [1, 2]);

/**
 * Finish a match at any time
 */
const liveMatches = footballBoard.getLiveSummary();

/**
 * Finish a match at any time
 *
 * @param {string[]} Match's teams
 */
footballBoard.finishMatch(['Croatia', 'Brazil']);
footballBoard.finishMatch(['Netherlands', 'Argentina']);
footballBoard.finishMatch(['Morocco', 'Portugal']);
footballBoard.finishMatch(['England', 'France']);
```

## Tests

`yarn test` or `npm test`

The library has been build following a Class approach because of its more simple and clean syntax (as oposite to prototyping or closure) and also because it will allow multiple instances of the Board.

In a first instance I used the classic ES2015 way of declarating private fields using underscore (`_variable`) because it's widely supported, but with an intention of using the latest options and technology for this test, I have since replaced them with the more up-to-date way of using hash when declaring them (`#variable`).

## Board

Considering the necessity to make some actions or effects on the client project after `addMatch`, `updateScore` or `finishMatch` are invoked, their methods will return a Promise instead of remaining quiet after completion.

### **Add Match (start a game)**

For storing matches and scores I have decided to make use of Maps() because:

-   Keys can be an array
-   ES6 destructuring
-   Performance adding, deleting or finding properties

Even when for this sample project it won't make a big difference, I have taken into consideration the possibility of having several games at once and its performance at real-time events.

However, there are some occasions (ie: isTeamPlaying()) where it loses its Maps() performance due to having to iterate through both arrays of current teams playing and the two passed down teams to the method (`O(n²)`)

A way of improving this could be to store currently playing teams on an object and check if the new teams are contained within it. However, I have looked for simplicity in this sample and discarded the idea.

### **Update Score**

When updating the score of a match I assume it will come as one single element with a pair of numbers. Those are structured as the first value for the home team, and the second value for the away team. ie: [0,0]

---

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
