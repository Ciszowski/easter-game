const initialState = {
    items: []
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INVENTORY':
            return {
                ...action.payload
            }

        default:
            return state
    }
}

export default mapReducer;