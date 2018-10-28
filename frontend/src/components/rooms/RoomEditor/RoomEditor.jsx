import React, { Component } from 'react';
import './RoomEditor.scss';

export default class RoomEditor extends Component {
    constructor(props) {
        super(props);

        this.state = props.config || {
            displayName: '',
            devices: {}
        };
        
        this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleDisplayNameChange(e) {
        this.setState({ 
            displayName: e.target.value
        }, () => {
            if (this.props.onChange) this.props.onChange(this.state);
        })
    }

    handleButtonClick() {
        this.props.onAction(this.state);
    }

    render() {
        return (
            <form className='roomEditor'>
                <label className='roomEditor__label'>Room name</label>
                <input className='roomEditor__input' value={this.state.displayName} onChange={this.handleDisplayNameChange}></input>
                <button type='button' onClick={this.handleButtonClick} className='roomEditor__button'>{this.props.actionText}</button>
            </form>
        );
    }
}


