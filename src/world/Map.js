import React from 'react';
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../config/constants';

import '../style.css'

const getTileSprite = (type) => {
    switch(type) {
        case 0:
            return 'grass'
        case 1: 
            return 'key'
        case 2:
            return 'chest'
        case 3:
            return 'bushes'
        case 4:
            return 'tree'
        case 5:
            return 'tree'
        case 7:
            return 'rock'
        default:
            console.log('erreur location')
    }
}

const MapTile = (props) => {
    return <div 
        className={`sprites ${getTileSprite(props.graph)}`}
        style={{
            height: SPRITE_SIZE,
            width: SPRITE_SIZE
        }}
        />
}


const MapRow = (props) => {
    return <div 
        className='row'
        style={{
            height: SPRITE_SIZE
        }}
    >
        {
           props.dalles.map((el, idx ) => <MapTile graph={el} key={idx}/>)
        }
    </div>
}

const Map = (props) => {
    return (
        <div className='map'>

            {
                props.sprites.map((row, idx )=> <MapRow dalles={row} key={idx}/>)
            }

        </div>
    )
}


const mapStateToProps = (state) =>({
    sprites : state.map.sprites
})

export default connect(mapStateToProps)(Map);
