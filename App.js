import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {store,persistor} from './src/redux/store'
import Index from './src/Index'
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Index />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
