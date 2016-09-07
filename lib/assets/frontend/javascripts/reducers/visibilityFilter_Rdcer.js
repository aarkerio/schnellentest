// Reducer specify how the application’s state changes in response. This is the job of a reducer.
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  console.log('In visibilityFilter reducer!!!!!!!!!!!!')
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
