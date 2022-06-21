import React from 'react';
 
export default (state, action) => {
    switch(action.type) {
        case 'pomoWork':
            return {
                pomoWork: action.payload,
                pomoBreak: state.pomoBreak
            }
        case 'pomoBreak':
            return {
                pomoWork: state.pomoWork,
                pomoBreak: action.payload
            }
        default:
           return state;
   }
}