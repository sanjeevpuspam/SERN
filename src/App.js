import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NotificationContainer } from 'react-notifications';
import ShopList from './componants/ShopList';
import AddShop from './componants/AddShop';
import './App.css';


class App extends Component {
  render() {
    return (
        <div className="container">
            <div className="row">
              <div className="col col-md-8">
                  <ShopList />
              </div>
              <div className="col col-md-4">
                  <AddShop />
              </div>
            </div>
            <NotificationContainer />
        </div>
    );
  }
}

export default App;
