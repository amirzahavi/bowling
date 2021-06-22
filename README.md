# bowling

bowling game calculator

> Requirements for this application can be found [here](./docs/requirements.md)

## Glossary

1. Pin - a physical bowling game pin to knock down (in this application imaginary entity) , a knocked down pin equals one point.
2. Roll - an attempt to knock down as many as possible pins (in this application the input for the application)
3. Frame - pair of rolls (in the last frame could be more) to attempt to knock down all 10 pins.
4. Game - 10 frames
5. Spare - A frame with all 10 pins knocked down in 2 rolls
6. Strike - A frame with all 10 pins knocked down in one roll

## Architecture

To separate the business logic and the view, i'm going with a client-server architecture that will provide a scalable solution and a better seperation of concerns.

### Back-end

For the backend solution i will use an existing framework [NestJS](https://docs.nestjs.com/), Nest have a flexible and structured solution and built in support for Typescript.

The main problem of this game is to calculate the score based on previous rolls, for that use-case we need to keep track of all rolls to be able to gradually calculate for each roll (with spare/strike use-cases) up until the final score.
The problem fits nicely into an existing pattern called "Event Sourcing", where we save the events (in our case the roll) and not the current state (The calculated score), so on each event (roll) we can "play" all the events with the new event and calculate on the fly the current score for each roll.

> For further back-end documentation please refer to [this link](./server/README.md)
