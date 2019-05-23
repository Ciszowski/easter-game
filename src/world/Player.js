import React from 'react';
import '../style.css'

import mPlayer from '../images/m_player_walk.png'
// import Spritesheet from 'react-responsive-spritesheet';

import { connect } from 'react-redux'
import handleMovement from './Movement'

const Player = (props) => {
 
    return (
        <div
            className='player'
            style={{
                top: props.position[1],
                left: props.position[0],
                backgroundImage: `url('${mPlayer}')`,
                backgroundPosition : props.spriteLocation
            }}
        />
    )
}

const mapStateToProps = (state) => ({
    ...state.player
})



export default connect(mapStateToProps)(handleMovement(Player));
