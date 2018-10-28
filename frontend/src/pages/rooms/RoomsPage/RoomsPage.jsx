import React, {Component} from 'react';
import './RoomsPage.scss';
import RoomListItem from "../../../components/rooms/RoomListItem/RoomListItem";
import {PAGES} from "../../../constants";
import RoomService from '../../../services/RoomService';
import {Redirect} from "react-router-dom";

export default class RoomsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: null,
            errorMessage: null
        };

        this.props.onEnter(PAGES.ROOMS);
    }

    componentDidMount() {
        RoomService.getAllRooms()
            .then(rooms => {
                this.setState({rooms, errorMessage: null});
                return null;
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    errorMessage: "Failed fetching rooms"
                });
            });
    }

    renderRoomList() {
        if (!this.state.rooms) return 'Please wait ...';

        let roomList = [];

        for (let roomId in this.state.rooms) {
            roomList.push(
                <RoomListItem history={this.props.history} key={roomId} id={roomId}
                              config={this.state.rooms[roomId]}/>
            );
        }
        return (
            <ul className='roomListPage__roomList'>
                {roomList}
            </ul>
        );
    }


    render() {
        return (
            <article className='roomListPage'>
                {this.state.errorMessage ?
                    <p className='errorMessage'>{this.state.errorMessage}</p> :
                    this.renderRoomList()
                }
            </article>
        );
    }
}