import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    pomoWork: 50,
    pomoBreak: 10,
    habitId: -1,
    changePomoWork: (item) => { },
    changePomoBreak: (item) => { },
    setHabitId: (item) => { },
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions for changing state

    function changePomoWork(item) {
        dispatch({
            type: 'pomoWork',
            payload: item
        });
    }
    function changePomoBreak(item) {
        dispatch({
            type: 'pomoBreak',
            payload: item
        });
    }
    function setHabitId (item) {
        dispatch({
            type: "habitId", 
            payload: item
        })
    } 

    return (
        <GlobalContext.Provider value={{ pomoWork: state.pomoWork, pomoBreak: state.pomoBreak, habitId: state.habitId, changePomoWork: changePomoWork, changePomoBreak: changePomoBreak, setHabitId: setHabitId}}>
            {children}
        </GlobalContext.Provider>
    )
}