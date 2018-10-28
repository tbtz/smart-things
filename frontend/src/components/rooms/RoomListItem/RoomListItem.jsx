import React, {Component} from 'react';
import './RoomListItem.scss';

export default class RoomListItem extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    handleClick() {
        this.props.history.push('/' + this.props.id);
    }

    handleMouseDown() {
        this.mouseTimeout = setTimeout(() => {
            this.props.history.push('/' + this.props.id + '/edit');
        }, 1000);
    }

    handleMouseUp() {
        if (this.mouseTimeout) {
            clearTimeout(this.mouseTimeout);
        }
    }

    render() {
        let deviceCount = Object.keys(this.props.config.devices).length;

        return (
            <li
                className='roomListItem'
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onTouchStart={this.handleMouseDown}
                onTouchEnd={this.handleMouseUp}
            >
                <h3 className={'roomListItem__name'}>{this.props.config.displayName}</h3>
                <p className={'roomListItem__count'}>{deviceCount + (deviceCount === 1 ? ' Device' : ' Devices')}</p>
            </li>
        );
    }
}
