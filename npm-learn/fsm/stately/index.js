import { isFun, isObj, isStr } from "./tools";
function Stately(statesObject) {
  if (isFun(statesObject)) statesObject = statesObject();
  let currentState;

  const stateStore = {
    getMachineState: () => currentState.name,

    setMachineState(nextState) {
      if (isStr(nextState)) nextState = stateStore[nextState];
      currentState = nextState;
      return this;
    },

    getMachineEvents() {
      let events = [];
      for (const property in currentState) {
        if (isFun(currentState[property])) events.push(property);
      }
      return events;
    }
  };

  const stateMachine = {
    getMachineState: stateStore.getMachineState,
    getMachineEvents: stateStore.getMachineEvents
  };

  const transition = (stateName, eventName, nextEvent) => {
    let nextState;
    let eventValue = stateMachine;
    if (stateStore[stateName] !== currentState) {
      if (nextEvent) {
        eventValue = nextEvent.call(stateStore, statesObject);
      }
      return eventValue;
    }

    eventValue = stateStore[stateName][eventName].call(
      stateStore,
      statesObject
    );

    if (!eventValue) {
      nextState = currentState;
      eventValue = stateMachine;
    } else if (isStr(eventValue)) {
      nextState = stateStore[eventValue];

      eventValue = stateMachine;
    } else if (Array.isArray(eventValue)) {
      if (!eventValue[0]) {
        nextState = currentState;
      } else if (isStr(eventValue[0])) {
        nextState = stateStore[eventValue[0]];
      } else {
        nextState = eventValue[0];
      }

      eventValue = eventValue[1] || stateMachine;
    } else if (isObj(eventValue)) {
      nextState = eventValue === stateStore ? currentState : eventValue;

      eventValue = stateMachine;
    }
    stateStore.setMachineState(nextState, eventName);
    return eventValue;
  };

  for (let stateName in statesObject) {
    stateStore[stateName] = statesObject[stateName];

    for (let eventName in stateStore[stateName]) {
      if (isStr(stateStore[stateName][eventName])) {
        const itemEventName = stateStore[stateName][eventName];
        stateStore[stateName][eventName] = obj => obj[itemEventName];
        stateMachine[eventName] = transition.bind(
          null,
          stateName,
          eventName,
          stateMachine[eventName]
        );
      }
    }
    stateStore[stateName].name = stateName;
    currentState = currentState || stateStore[stateName];
  }

  return stateMachine;
}

export default arg => new Stately(arg);
