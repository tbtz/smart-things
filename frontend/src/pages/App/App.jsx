import React, {Component, PropTypes} from 'react';
import './App.scss';

import {Switch, Route, Router} from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";

import DevicesPage from '../devices/DevicesPage/DevicesPage';
import AddDevicePage from '../devices/AddDevicePage/AddDevicePage';
import EditDevicePage from '../devices/EditDevicePage/EditDevicePage';
import RoomsPage from '../rooms/RoomsPage/RoomsPage';

import history from '../../services/history';
import AddRoomPage from "../rooms/AddRoomPage/AddRoomPage";
import EditRoomPage from "../rooms/EditRoomPage/EditRoomPage";
import Background from "../../components/Background/Background";
import {PAGES} from "../../constants";

const LS_KEY = 'smart_things_last_page';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: null,
            pageInfo: null
        };

        this.setActivePage = this.setActivePage.bind(this);

        let lastPage = localStorage.getItem(LS_KEY);
        if (lastPage && lastPage.trim() !== '' && !lastPage.includes('undefined')) {
            this.openLastPage();
        }
    }

    setActivePage(activePage, pageInfo) {
        if (activePage !== this.state.activePage || pageInfo !== this.state.pageInfo) {
            this.setState({
                activePage,
                pageInfo
            }, () => {
                switch (activePage) {
                    case PAGES.ROOMS:
                    case PAGES.ADD_ROOM:
                        this.savePageToLS('/');
                        break;
                    case PAGES.EDIT_ROOM:
                    case PAGES.DEVICES:
                    case PAGES.ADD_DEVICE:
                    case PAGES.EDIT_DEVICE:
                        this.savePageToLS('/' + pageInfo.id);
                        break;
                }
            });

        }
    }

    savePageToLS(lastPage) {
        localStorage.setItem(LS_KEY, lastPage);
    }

    openLastPage() {
        history.push(localStorage.getItem(LS_KEY));
    }

    render() {
        return (
            <Router history={history}>
                <main className='app'>
                    <Header activePage={this.state.activePage} pageInfo={this.state.pageInfo}/>
                    <Switch>
                        <Route exact path='/' render={(props) => (
                            <RoomsPage {...props} onEnter={this.setActivePage}/>
                        )}/>
                        <Route exact path='/add' render={(props) => (
                            <AddRoomPage {...props} onEnter={this.setActivePage}/>
                        )}/>
                        <Route exact path='/:roomId/edit' render={(props) => (
                            <EditRoomPage{...props} onEnter={this.setActivePage}/>
                        )}/>
                        <Route exact path='/:roomId' render={(props) => (
                            <DevicesPage {...props} onEnter={this.setActivePage}/>
                        )}/>
                        <Route exact path='/:roomId/add' render={(props) => (
                            <AddDevicePage {...props} onEnter={this.setActivePage}/>
                        )}/>
                        <Route exact path='/:roomId/:deviceId' render={(props) => (
                            <EditDevicePage {...props} onEnter={this.setActivePage}/>
                        )}/>
                    </Switch>
                    <Footer activePage={this.state.activePage}/>
                    <Background/>
                </main>
            </Router>
        );
    }
}