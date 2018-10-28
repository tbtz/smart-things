import React, {Component} from 'react';
import './EditRoomPage.scss';
import RoomService from "../../../services/RoomService";
import RoomEditor from "../../../components/rooms/RoomEditor/RoomEditor";
import {PAGES} from "../../../constants";

export default class EditRoomPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomConfig: null
        }

        this.roomId = props.match.params.roomId;

        this.props.onEnter(PAGES.EDIT_ROOM, {id: this.roomId});

        this.removeRoom = this.removeRoom.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
    }

    componentDidMount() {
        RoomService.getRoom(this.roomId)
            .then(roomConfig => {
                this.setState({roomConfig});
                this.props.onEnter(PAGES.EDIT_ROOM, {displayName: roomConfig.displayName, id: this.roomId});
            })
            .catch(err => {
                console.error(err);
            });
    }

    updateRoom(roomConfig) {
        RoomService.updateRoom(this.roomId, roomConfig)
            .then(() => {
                this.props.history.push('/' + this.roomId);
                return null;
            })
            .catch(err => {
                console.error(err);
            });
    }

    removeRoom() {
        RoomService.removeRoom(this.roomId)
            .then(() => {
            this.props.history.push('/');
            return null;
        }).catch(err => {
            console.error(err);
        });
    }

    render() {
        if (!this.state.roomConfig) return 'Bitte warten ...';

        return (
            <article className='editRoomPage'>
                <RoomEditor config={this.state.roomConfig} onAction={this.updateRoom} actionText='Update Room'/>
                <button className='editRoomPage__button' onClick={this.removeRoom}>Remove Room</button>
            </article>
        );
    }
}
