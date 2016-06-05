// Action
export const UPDATE_GREETING = 'UPDATE_GREETING';
export const RESET_GREETING = 'RESET_GREETING';

// Action creator
export function updateGreeting(greeting) {
  return {
    type: UPDATE_GREETING,
          greeting
  };
}

export function resetGreeting() {
  return {
    type: RESET_GREETING
  };
}

