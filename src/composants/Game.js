import React from 'react';

import Swal from 'sweetalert2';

import Map from '../world/Map';
import Player from '../world/Player';

import '../style.css'

import Homer from '../images/homer.gif'
import Homer2 from '../images/homer2.gif'
import Hawaii from '../images/hawaii.gif'
import Key from '../images/key.png'
import Inform from '../images/inform.gif'

import { sprites } from '../data/maps/sprites'
import store from '../config/store'
import { connect } from 'react-redux'

import Inventory from '../accesories/inventory'


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.inventory = []
        this.state = {
            next: null,
            message: '',
            key: false,
            interval: true,
            value: true
        }
    }

    specialAPI = () => {
        const { key } = this.state
        if (key === true) {
            fetch('http://easteregg.wildcodeschool.fr/api/eggs/5cac51240d488f0da6151bd9')
                .then(res => res.json())
                .then((eggs) => {
                    Swal.fire({
                        confirmButtonColor: eggs.color,
                        title: 'Youhou j\'ai loot un oeuf',
                        imageUrl: eggs.image,
                        imageHeight: 300,
                        background: `url('../images/easter_island.jpg')`,
                        backdrop: `
                        rgba(0,0,123, 0.4)
                        url(${Hawaii})
                        center right
                    `,
                        confirmButtonText: 'Bravo tu as trouvé l\'oeuf le plus rare !!! '
                    })
                        .then(() => {
                            this.setState({
                                key: false,
                            })
                        });

                    this.inventory.push({ name: eggs.name, image: eggs.image, rarity: eggs.rarity })
                })
        } else {
            Swal.fire({
                imageUrl: `${Key}`,
                imageHeight: 300,
                background: `url('../images/easter_island.jpg')`,
                backdrop: `
                    rgba(0,0,123, 0.4)
                    url(${Inform})
                    center left
                    no-repeat
                    `,
                confirmButtonText: 'Tu as besoin d`une clé pour ouvrir ce coffre !!!'
            });
        }
    }



    callAPI = () => {
        const { inventory } = this
        const random = Math.floor(Math.random() * 1000)
        if (Number(random) % 17 === 0) {
            console.log(random % 17, random, 'yes')
            fetch('http://easteregg.wildcodeschool.fr/api/eggs/random/')
                .then(res => {
                    console.log('api', res)
                    return res.json()
                })
                .then((eggs) => {
                    Swal.fire({
                        confirmButtonColor: eggs.color,
                        imageUrl: eggs.image,
                        imageHeight: 300,
                        background: `url('../images/easter_island.jpg')`,
                        backdrop: `
                        rgba(0,0,123, 0.4)
                        url(${Homer})
                        center left
                        no-repeat
                        `,
                        confirmButtonText: 'Youhou j`ai loot un oeuf !!!'
                    })
                        .then(() => {
                            this.setState({
                                interval: false
                            })
                        })
                        .then(() => {
                            setInterval(() => {
                                this.setState({
                                    interval: true
                                })
                            }, (10000));
                        })
                    inventory.push({ name: eggs.name, image: eggs.image, rarity: eggs.rarity })

                    store.dispatch({
                        type: 'INVENTORY',
                        payload: {
                            inventory
                        }
                    })
                })
        }

    }

    render() {
        const { message, interval, value } = this.state
        if (this.props.next === 1 && value === true) {
            Swal.fire({
                imageUrl: `${Key}`,
                imageHeight: 300,
                background: `url('../images/easter_island.jpg')`,
                backdrop: `
                rgba(0,0,123, 0.4)
                url(${Homer2})
                center left
                no-repeat
                `,
                confirmButtonText: 'Tu as trouvé la clé du coffre !!!'
            })
                .then(() => {
                    this.setState({
                        value: false,
                        key: true
                    })
                })
        }

        if (this.props.next === 3 && interval === true) {
            this.callAPI()
        }

        if (this.props.next === 2) {
            this.specialAPI();
        }

        store.dispatch({
            type: 'ADD_FILES',
            payload: {
                sprites,
            }
        })


        return (
            <div>
                <div className='divTxt'>
                    <div className='txt'>
                        {message}
                    </div>
                </div>
                <div className="plateform">
                    <Map />
                    <Player />
                </div>
                <Inventory />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.player,
    inventory: state.item
})

export default connect(mapStateToProps)(Game);