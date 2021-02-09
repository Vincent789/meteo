import React, { Component } from 'react';
import Home from './components/Home.jsx';
import ThreeGui from './components/ThreeGui';
import { createStore } from 'redux'
import  allReducers  from './reducers'
import { Provider } from 'react-redux'
import counterReducer from './reducers/counter'

const store = createStore(counterReducer)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      snow: 0,
      terraincolor: '#667306',
      fieldcolor: '#f5be18',
      treecolor: '#076931',
      rain: 0,
      state: 0,
      numberclouds: 0,
      location: 'LYON',
      roadcolor: '#544c3e'
    }

    this.handleButtonSnow = this.handleButtonSnow.bind(this)
    this.handleButtonRain = this.handleButtonRain.bind(this)
  }
  handleButtonSnow(){
    if ( this.state.snow == 0 ){
      this.setState({
        snow: 100,
        terraincolor: '#ffffff',
        fieldcolor: '#dedede',
        treecolor: '#ffffff',
        state: 1,
        numberclouds: 50,
        cloudscolor: '#ffffff',
        roadcolor: '#ffffff'
      })
    }
    else
    {
      this.setState({
        snow: 0,
        terraincolor: '#516e20',
        fieldcolor: '#fcc305',
        treecolor: '#006335',
        numberclouds: 0,
        cloudscolor: '#ffffff',
        roadcolor: '#544c3e'
      })
    }
  }
  handleButtonRain(){
    if ( this.state.rain == 0 ){
      this.setState({
        rain: 100,
        terraincolor: '#095c02',
        fieldcolor: '#542704',
        treecolor: '#024712',
        numberclouds: 50,
        cloudcolors: '#ffffff'
      })
    }
    else
    {
      this.setState({
        rain: 0,
        numberclouds: 0,
        terraincolor: '#516e20',
        fieldcolor: '#fcc305',
        treecolor: '#006335',
        numberclouds: 0,
        cloudscolor: '#ffffff'
      })
    }
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <h1>{this.state.snow}</h1>
          <ThreeGui/>
          <button onClick={this.handleButtonSnow}>Snow</button>
          <button onClick={this.handleButtonRain}>Rain</button>
          <Home 
            snow={this.state.snow}
            rain={this.state.rain}
            terraincolor={this.state.terraincolor}
            state={this.state.state}
            fieldcolor={this.state.fieldcolor}
            treecolor={this.state.treecolor}
            numberclouds={this.state.numberclouds}
            cloudscolor={this.state.cloudcolors}
            location={this.state.location}
            roadcolor={this.state.roadcolor}
          />
        </div>
      </Provider>
    )
  }
}
export default App;