import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class App extends Component {
  state = {
    newElement: '',
  }

  componentDidMount() {
    // this.getElements();
    this.props.dispatch({ type: 'GET_ELEMENTS' });
  }

  //
  // API CALLS
  // --------------------

  // getElements() {
  //   axios.get('/api/element').then(response => {
  //     this.props.dispatch({ type: 'SET_ELEMENTS', payload: response.data });
  //     // test of my first saga
  //     this.props.dispatch({
  //       type: 'FIRST_SAGA',
  //       payload: this.state
  //     })
  //   })
  //   .catch(error => {
  //       console.log('error with element get request', error);
  //   });
  // }

  // saveElement() {
  //   axios.post('/api/element', this.state).then(() => {
  //       this.getElements();
  //       this.setState({
  //         newElement: '',
  //     });
  //   })
  //   .catch(error => {
  //       console.log('error with element get request', error);
  //   });
  // }

  //
  // EVENT HANDLERS
  // --------------------

  handleChange = (event) => {
    this.setState({
      newElement: event.target.value,
    });
  }

  handleClick = () => {
    // this.saveElement();
    this.props.dispatch({
      type: 'SAVE_ELEMENT',
      payload: this.state
    });
    // clear input
    this.setState({
      newElement: '',
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.dispatch({ type: 'BUTTON_ONE' })}>Button One</button>
        <button onClick={() => this.props.dispatch({ type: 'BUTTON_TWO' })}>Button Two</button>
        <input value={this.state.newElement} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Add Element</button>
        <pre>{JSON.stringify(this.props.store)}</pre>
      </div>
    );
  }
}

const mapStoreToProps = store => ({
    store
});

export default connect(mapStoreToProps)(App);
