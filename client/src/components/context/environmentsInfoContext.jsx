import React, { createContext } from 'react';

export const environmentsInfoInitialState = {
  selected: null,
  environments: [],
};

const EnvironmentsInfoContext = createContext(environmentsInfoInitialState);

export const EnvironmentsInfoContextProvider = EnvironmentsInfoContext.Provider;

export default EnvironmentsInfoContext;
