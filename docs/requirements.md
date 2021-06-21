# Bowling Calculator

Your task is to write an app for keeping score of a 10 pin bowling game.

Functional Requirements
The user should be able to select or enter the number of pins knocked down in each roll
Each frame should show the score up to that part
The final score should always be shown and calculated as the game continues

See below one example of presenting a scoreboard and knocked pin selection:

## Rules

### General rules

Rules of bowling in a nutshell:

A game consists of 10 frames. In each frame the player rolls 1 or 2 balls, except for the 10th frame, where the player rolls 2 or 3 balls.

The total score is the sum of your scores for the 10 frames

If you knock down fewer than 10 pins with 2 balls, your frame score is the number of pins knocked down

If you knock down all 10 pins with 2 balls (spare), you score the amount of pins knocked down plus a bonus - amount of pins knocked down with the next ball

If you knock down all 10 pins with 1 ball (strike), you score the amount of pins knocked down plus a bonus - amount of pins knocked down with the next 2 balls

### Rules for 10th frame

As the 10th frame is the last one, in case of spare or strike there will be no next balls for the bonus. To account for that:

If the last frame is a spare, the player rolls 1 bonus ball.
If the last frame is a strike, the player rolls 2 bonus balls.
These bonus balls on the 10th frame are only counted as a bonus to the respective spare or strike.

More information
<http://en.wikipedia.org/wiki/Ten-pin_bowling#Scoring>

## Non - Functional Requirements

We expect your code to be unit tested.  

At env0, we use TypeScript and React on our frontend, but if either of these is not your strong suit, please go with whatever is.  

You may choose to have all your code reside on the frontend or split it to server/client architecture - but either way please mind a proper separation of concerns.

You may use CodeSandbox (provided the tech stack of your choice is supported) to work on and share your project.
You should find everything you need there including tests, to get you started quickly.
But of course, if you would rather work on your local environment feel free to do so -  please share a GitHub/GitLab/Bitbucket repo with us.  
