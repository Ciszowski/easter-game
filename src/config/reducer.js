

const initialState = {
    position: [0, 0],
    spriteLocation: '0px 0px',
    direction: 'east',
    walkIndex: 0,
    nextSprites: 0,
    next: 0
}

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE_PLAYER':
            return {
                ...action.payload,state
            }

        default:
            return state
    }
}

export default playerReducer;