import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    pomoWork: 50, 
    pomoBreak: 10,
    changePomoWork: (item) => {},
    changePomoBreak: (item) => {}, 
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AppReducer, initialState);

   // Actions for changing state

   function changePomoWork (item) {
        dispatch({
            type: 'pomoWork',
            payload: item
        });
   }
   function changePomoBreak (item) {
        dispatch({
            type: 'pomoBreak',
            payload: item
        });
   }

    return(
        <GlobalContext.Provider value = {{pomoWork: state.pomoWork, pomoBreak: state.pomoBreak, changePomoWork: changePomoWork, changePomoBreak: changePomoBreak}}> 
            {children} 
        </GlobalContext.Provider>
    )
}