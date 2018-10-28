import React, {Component} from 'react';
import './Header.scss';

import {faHome, faDoorOpen, faLightbulb} from '@fortawesome/free-solid-svg-icons'
import {PAGES} from '../../constants';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.renderHeading = this.renderHeading.bind(this);
    }

    renderHeading() {
        let icon;
        let text;

        switch (this.props.activePage) {
            case PAGES.ROOMS:
                icon = faHome;
                text = 'Home';
                break;
            case PAGES.ADD_ROOM:
                icon = faHome;
                text = 'New room';
                break;
            case PAGES.EDIT_ROOM:
                icon = faHome;
                text = 'Edit ' + this.props.pageInfo.displayName;
                break;
            case PAGES.DEVICES:
                icon = faDoorOpen;
                text = this.props.pageInfo.displayName || 'Room';
                break;
            case PAGES.ADD_DEVICE:
                icon = faLightbulb;
                text = 'New device';
                break;
            case PAGES.EDIT_DEVICE:
                icon = faLightbulb;
                text = 'Edit ' + this.props.pageInfo.displayName;
                break;
            default:
                icon = null;
                text = '';
        }

        return (
            <h1>
                {text}
            </h1>
        );
    }

    render() {
        return (
            <header className='header'>
                {this.renderHeading()}
            </header>
        );
    }
}
