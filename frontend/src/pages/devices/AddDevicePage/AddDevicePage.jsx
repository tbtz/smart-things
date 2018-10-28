import React, { Component } from 'react';
import './AddDevicePage.scss';

import DeviceService from '../../../services/DeviceService';
import {PAGES} from "../../../constants";
import DeviceEditor from "../../../components/devices/DeviceEditor/DeviceEditor";

export default class AddDevicePage extends Component {
    constructor(props) {
        super(props);

        this.props.onEnter(PAGES.ADD_DEVICE, {id: this.props.match.params.roomId});

        this.addDevice = this.addDevice.bind(this);
        this.deviceService = new DeviceService(this.props.match.params.roomId);
    }

    addDevice(config) {
        let id = config.displayName.toLocaleLowerCase().replace(' ', '-');

        this.deviceService.addDevice(id, {
            displayName: config.displayName,
            type: config.type,
            ip: config.ip
        }).then(() => {
            console.log('check');
            this.props.history.goBack();
        }).catch(() => console.error);
    }

    render() {
        return (
            <article className='addDevicePage'>
                <DeviceEditor onAction={this.addDevice} actionText='Add Device' />
            </article >
        );
    }
}