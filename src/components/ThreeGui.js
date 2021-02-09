import React, { Component } from "react";
import { connect } from 'react-redux';

class ThreeGui extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <h1>{this.props.rain}</h1>
        test
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rain: state.rain
  }
}
export default connect(mapStateToProps)(ThreeGui)