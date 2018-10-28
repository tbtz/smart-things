import React, {Component} from 'react';
import './Footer.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faPlusCircle, faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons'
import {PAGES} from '../../constants';

import history from '../../services/history';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    renderAddButton() {
        if (this.props.activePage === PAGES.ROOMS ||
            this.props.activePage === PAGES.DEVICES
        ) {
            let clickHandler;
            switch (this.props.activePage) {
                case PAGES.ROOMS:
                    clickHandler = () => {
                        history.push('/add');
                    };
                    break;
                case PAGES.DEVICES:
                    clickHandler = () => {
                        history.push(history.location.pathname + '/add')
                    };
                    break;
            }

            return (
                <button className='footer__add' onClick={clickHandler}>
                    <FontAwesomeIcon icon={faPlusCircle}/>
                </button>
            )
        } else return null;
    }

    renderBackButton() {
        if (this.props.activePage !== PAGES.ROOMS) {
            let clickHandler;
            switch (this.props.activePage) {
                case PAGES.DEVICES:
                    clickHandler = () => {
                        history.push('/');
                    }
                    break;
                case PAGES.ADD_ROOM:
                    clickHandler = () => {
                        history.push('/');
                    };
                    break;
                default:
                    clickHandler = history.goBack;
                    break;
            }
            return (
                <button className='footer__back' onClick={clickHandler}>
                    <FontAwesomeIcon icon={faChevronCircleLeft}/>
                </button>
            )
        }
        return null;
    }

    render() {
        return (
            <footer className='footer'>
                {this.renderBackButton()}
                {this.renderAddButton()}
            </footer>
        );
    }
}
