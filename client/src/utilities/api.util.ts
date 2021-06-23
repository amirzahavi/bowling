interface RollRequest {
  frame: number;
  rollInFrame: number;
  knockedPins: number;
}

export interface RollResponse extends RollRequest {
  strike: boolean;
  spare: boolean;
  score?: number;
}

interface ErrorResponse {
  statusCode: number;
  message: string;  
}

export type Response = RollResponse[] | ErrorResponse;

export function postRoll(roll: RollRequest): Promise<Response> {
  return fetch('http://localhost:3000/roll', {        
    method: 'POST',
    headers: {          
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(roll)        
  })      
  .then(result => result.json());
}

export function resetGame(): Promise<void> {
  return fetch('http://localhost:3000', {
    method: 'DELETE'                  
  })
  .then(result => {
    if (!result.ok) {
      throw Error(`Something went wrong!`);
    }                
  });
}