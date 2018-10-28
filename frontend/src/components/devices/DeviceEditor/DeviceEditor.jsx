import React, { Component } from 'react';
import './DeviceEditor.scss';

export default class DeviceEditor extends Component {
    constructor(props) {
        super(props);

        this.state = props.config || {
            displayName: '',
            ip: '',
            type: 'light'
        };
        
        this.handleIpChange = this.handleIpChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleIpChange(e) {
        this.setState({ 
            ip: e.target.value
        }, () => {
            if (this.props.onChange) this.props.onChange(this.state);
        })
    }

    handleTypeChange(e) {
        this.setState({ 
            type: e.target.value
        }, () => {
            if (this.props.onChange) this.props.onChange(this.state);
        })
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
            <form className='deviceEditor'>
                <label className='deviceEditor__label'>Device name</label>
                <input className='deviceEditor__input' value={this.state.displayName} onChange={this.handleDisplayNameChange}></input>
                <label className='deviceEditor__label'>IP address</label>
                <input className='deviceEditor__input' value={this.state.ip} onChange={this.handleIpChange}></input>
                <label className='deviceEditor__label'>Device type</label>
                <select className='deviceEditor__select' value={this.state.type} onChange={this.handleTypeChange}>
                    <option value='light'>Light</option>
                    <option value='power'>Power-Plug</option>
                </select>
                <button type='button' onClick={this.handleButtonClick} className='deviceEditor__button'>{this.props.actionText}</button>
            </form>
        );
    }
}


