const initialState = {
    sprites: [],
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FILES':
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default mapReducer;