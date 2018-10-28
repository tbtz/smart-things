import React, {Component} from 'react';
import './AddRoomPage.scss';

import RoomService from "../../../services/RoomService";
import RoomEditor from "../../../components/rooms/RoomEditor/RoomEditor";
import {PAGES} from "../../../constants";

export default class AddRoomPage extends Component {
    constructor(props) {
        super(props);

        this.props.onEnter(PAGES.ADD_ROOM);
        this.addRoom = this.addRoom.bind(this);
    }

    addRoom(config) {
        let id = config.displayName.toLocaleLowerCase().replace(' ', '-');

        RoomService.addRoom(id, {
            displayName: config.displayName,
            devices: []
        }).then(() => {
            this.props.history.goBack();
        }).catch(() => console.error);
    }

    render() {
        return (
            <article className='addRoomPage'>
                <RoomEditor onAction={this.addRoom} actionText='Add Room'/>
            </article>
        );
    }
}