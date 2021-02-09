export const INCREMENT_RAIN = "frontwidgets/rain/INCREMENT"
export const DECREMENT_RAIN = "frontwidgets/rain/DECREMENT"

const counterReducer = ( state={
    snow: 7,
    rain: 12,
    trees: 23,
    clouds: 40
}, action ) => {
    switch(action.type){
      case INCREMENT_RAIN:
        return {
            ...state, rain: state.rain+10
        }
      case DECREMENT_RAIN:
        return {
            ...state, rain: state.rain-10
        }  
      default:
        return state
    }
}

export default counterReducer

export function incrementRain(){
    return {
        type: INCREMENT_RAIN
    }
}

export function decrementRain(){
    return {
        type: INCREMENT_RAIN
    }
}