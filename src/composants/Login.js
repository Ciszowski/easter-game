import React, { Component } from 'react';
import '../style.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }
    operation = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.props.history.push('/Game')
    }

    render() {
        return (

            <div className="nav navbar-nav pos">
                <h1 className="title"> THE EASTER GAME </h1>
                <div className="row justify-content-between jouer">
                    <button className="btn btn-info button " onClick={this.operation}>JOUER </button>
                </div>

            </div>
        )
    }
}


export default Login;