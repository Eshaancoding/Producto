export default (state, action) => {
    switch(action.type) {
        case 'pomoWork':
            return {
                pomoWork: action.payload,
                pomoBreak: state.pomoBreak,
                habitId: state.habitId
            }
        case 'pomoBreak':
            return {
                pomoWork: state.pomoWork,
                pomoBreak: action.payload,
                habitId: state.habitId
            }
        case 'habitId':
            return {
                pomoWork: state.pomoWork,
                pomoBreak: state.pomoBreak,
                habitId: action.payload,
            }
        default:
           return state;
   }
}