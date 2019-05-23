import React, { Component } from 'react';

import { connect } from 'react-redux';
import './loot.css'

class Inventory extends Component {
    render() {
        console.log(this.props.item.inventory, 'inventory')

        return (
            <div>
                {this.props.item.inventory !== undefined ? this.props.item.inventory.map((el, idx) => {
                    console.log(el)
                    return (

                        <div key={idx} className="loots">
                            <h5 className='titre'> {el.name}</h5>
                            <img src={el.image} alt='' className="img" />
                            <p className='rarete'> rarity: {el.rarity}</p>
                        </div>
                    )
                }) : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps)(Inventory);