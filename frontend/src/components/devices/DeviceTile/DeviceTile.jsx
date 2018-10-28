import React, { Component } from 'react';
import './DeviceTile.scss';

import DeviceService from '../../../services/DeviceService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb as lightbulbRegular } from '@fortawesome/free-regular-svg-icons'
import { faLightbulb as lightbulbSolid, faPlug } from '@fortawesome/free-solid-svg-icons'

export default class DeviceTile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: null
        }

        this.handleClick = this.handleClick.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        this.renderTypeIcon = this.renderTypeIcon.bind(this);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount() {
        this.checkStatus();

        this.iv = setInterval(this.checkStatus, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.iv);
    }

    checkStatus() {
        DeviceService.getDeviceStatus(this.props.config.ip)
            .then(status => {
                if (status !== this.state.status) {
                    this.setState({ status });
                }
            }).catch(console.error);
    }


    handleClick() {
        DeviceService.toggleDevice(this.props.config.ip)
            .then(status => {
                this.setState({ status });
            }).catch(console.error);
    }

    handleMouseDown() {
        this.mouseTimeout = setTimeout(() => {
            this.props.history.push(`/${this.props.roomId}/${this.props.deviceId}`);
        }, 1000);
    }

    handleMouseUp() {
        if (this.mouseTimeout) {
            clearTimeout(this.mouseTimeout);
        }
    }

    getTypeIconOn(type) {
        switch (type) {
            case 'light':
                return lightbulbSolid;
            case 'power':
                return faPlug;
        }
    }

    getTypeIconOff(type) {
        switch (type) {
            case 'light':
                return lightbulbRegular;
            case 'power':
                return faPlug;
        }
    }

    renderTypeIcon() {
        let type = this.props.config.type;

        let typeIcon;
        if (this.state.status === 'ON') {
            typeIcon = this.getTypeIconOn(type);
        } else {
            typeIcon = this.getTypeIconOff(type);
        }

        return (
            <FontAwesomeIcon className={'deviceTile__type' + (this.state.status ? (' deviceTile__type--' + this.state.status) : '')} icon={typeIcon} />
        )
    }

    render() {
        return (
            <li
                onClick={this.handleClick}
                className={'deviceTile' + (this.state.status === 'ON' ? ' deviceTile--on' : '')}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onTouchStart={this.handleMouseDown}
                onTouchEnd={this.handleMouseUp}
            >
                <div className='deviceTile__content'>
                    {this.renderTypeIcon()}
                    <h3 className={'deviceTile__name'}>{this.props.config.displayName}</h3>
                </div>
            </li>
        );
    }
}
