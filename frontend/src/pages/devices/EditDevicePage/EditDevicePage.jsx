import React, {Component} from 'react';
import './EditDevicePage.scss';
import DeviceService from '../../../services/DeviceService';
import {PAGES} from "../../../constants";
import DeviceEditor from "../../../components/devices/DeviceEditor/DeviceEditor";

export default class EditDevicePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceConfig: null
        }


        this.deviceId = props.match.params.deviceId;
        this.roomId = props.match.params.roomId;

        this.props.onEnter(PAGES.EDIT_DEVICE, {id: this.roomId});


        this.removeDevice = this.removeDevice.bind(this);
        this.updateDevice = this.updateDevice.bind(this);

        this.deviceService = new DeviceService(this.roomId);
    }

    componentDidMount() {
        this.deviceService.getDevice(this.deviceId).then(deviceConfig => {
            this.setState({deviceConfig});
            this.props.onEnter(PAGES.EDIT_DEVICE, {desplayName: deviceConfig.displayName, id: this.roomId});
        }).catch(console.error);
    }

    updateDevice(deviceConfig) {
        this.deviceService.updateDevice(this.deviceId, deviceConfig).then(() => {
            this.props.history.goBack();
            return null;
        }).catch(console.error);
    }

    removeDevice() {
        this.deviceService.removeDevice(this.deviceId).then(() => {
            this.props.history.push('/' + this.roomId);
            return null;
        }).catch(console.error);
    }

    render() {
        if (!this.state.deviceConfig) return 'Bitte warten ...';

        return (
            <article className='editDevicePage'>
                <DeviceEditor config={this.state.deviceConfig} onAction={this.updateDevice} actionText='Update Device'/>
                <button className='editDevicePage__button' onClick={this.removeDevice}>Remove Device</button>
            </article>
        );
    }
}
