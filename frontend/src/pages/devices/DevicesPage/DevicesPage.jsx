import React, {Component} from 'react';
import './DevicesPage.scss';

import {PAGES} from '../../../constants';
import DeviceTile from '../../../components/devices/DeviceTile/DeviceTile';
import RoomService from '../../../services/RoomService';
import {Redirect} from "react-router-dom";

export default class DevicesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomConfig: null,
            errorMessage: null
        };

        this.roomId = this.props.match.params.roomId;

        this.props.onEnter(PAGES.DEVICES, {id: this.roomId});
    }

    componentDidMount() {
        RoomService.getRoom(this.roomId)
            .then(roomConfig => {
                this.setState({roomConfig, errorMessage: null});
                this.props.onEnter(PAGES.DEVICES, {displayName: roomConfig.displayName, id: this.roomId});
                return null;
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    errorMessage: "Failed fetching devices"
                });
            });
    }

    renderDeviceTiles() {
        let deviceTiles = [];

        for (let deviceId in this.state.roomConfig.devices) {
            deviceTiles.push(
                <DeviceTile history={this.props.history} key={deviceId} roomId={this.props.match.params.roomId}
                            deviceId={deviceId}
                            config={this.state.roomConfig.devices[deviceId]}/>
            );
        }

        return (
            <ul className='devicesPage__deviceList'>
                {deviceTiles}
            </ul>
        );
    }

    render() {
        if (!this.state.roomConfig) return 'Please wait ...';

        return (
            <article className='devicesPage'>
                {this.renderDeviceTiles()}
                {this.state.errorMessage ?
                    <p className='errorMessage'>{this.state.errorMessage}</p> :
                    null
                }
            </article>
        );
    }
}