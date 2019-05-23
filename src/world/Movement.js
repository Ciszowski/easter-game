import store from '../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../config/constants'

export default function handleMovement(player) {
    const getNewPosition = (oldPos, direction) => {
        switch (direction) {
            case 'WEST':
                return [oldPos[0] - SPRITE_SIZE, oldPos[1]]
            case 'EAST':
                return [oldPos[0] + SPRITE_SIZE, oldPos[1]]
            case 'NORTH':
                return [oldPos[0], oldPos[1] - SPRITE_SIZE]
            case 'SOUTH':
                return [oldPos[0], oldPos[1] + SPRITE_SIZE]
            default:
                console.log('nothing append')
        }
    }

    const getSpriteLocation = (direction, walkIndex) => {
        switch (direction) {
            case 'NORTH':
                return `${64 * walkIndex}px ${SPRITE_SIZE * 0}px`
            case 'EAST':
                return `${64 * walkIndex}px ${SPRITE_SIZE * 1.2}px`
            case 'SOUTH':
                return `${64 * walkIndex}px ${SPRITE_SIZE * 2.4}px`
            case 'WEST':
                return `${64 * walkIndex}px ${SPRITE_SIZE * 3.8}px`
            default:
                console.log('just pour ne pas avoir de msg log ^^')
        }
    }

    const getWalkIndex = () => {
        const walkIndex = store.getState().player.walkIndex
        return walkIndex >= 8 ? 0 : walkIndex + 1
    }

    const observeBound = (oldPos, newPos) => {
        return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
            (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)

    }


    const observeImpass = (oldPos, newPos) => {
        const sprites = store.getState().map.sprites
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextSprites = sprites[y][x]

        return nextSprites < 5
    }

    const directionMove = (direction, newPos) => {
        const sprites = store.getState().map.sprites
        const walkIndex = getWalkIndex()
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const next = sprites[y][x]
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos,
                direction,
                walkIndex,
                next,
                spriteLocation: getSpriteLocation(direction, walkIndex)
            }
        })
    }


    const tryMove = (direction) => {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(oldPos, direction)

        if (observeBound(oldPos, newPos) && observeImpass(oldPos, newPos)) {
            directionMove(direction, newPos)
        }

    }

    const handleKeyDown = (e) => {

        e.preventDefault();
        switch (e.keyCode) {
            case 37:
                return tryMove('WEST')
            case 38:
                return tryMove('NORTH')
            case 39:
                return tryMove('EAST')
            case 40:
                return tryMove('SOUTH')
            case 73:
                return console.log('inventory', e.keyCode)
            default:
                console.log(e.keyCode)
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    return player
}