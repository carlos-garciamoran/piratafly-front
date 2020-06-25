import React from 'react';

import NavMenu from './components/NavMenu';

import FlightNumberForm from './scenes/Number';
import FlightSelectionForm from './scenes/Selection';
import SeatsForm from './scenes/Seats';
import ConfirmationForm from './scenes/Confirmation';

class FlightForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scene: 1,
      flights: [],
      flight: {
        number: '',
        departure_date: '',
        origin: '',
        destination: ''
      },
      seats: []
    };

    this.handleSceneJump = this.handleSceneJump.bind(this);
    this.handleSceneChange = this.handleSceneChange.bind(this);
  }

  handleSceneJump(scene) {
    switch (scene) {
      case 1:
        break;
      case 2:
        if (this.state.flights.length === 0) return;
        break;
      case 3:
        if (this.state.flight.number === '') return;
        break;
      case 4:
        if (this.state.seats.length === 0) return;
        break;
      default: return;
    }

    this.setState({ scene });
  }

  handleSceneChange(data) {
    console.log('SCENE CHANGE:', this.state.scene, data);

    switch (this.state.scene) {
      case 1:
        this.setState({ flights: data })
        break;
      case 2:
        this.setState({ flight: data });
        break;
      case 3:
        this.setState({ seats: data });
        break;
      case 4:
        this.props.history.push('/flights');
        break;
      default: return;
    }

    this.setState(state => ({
      scene: state.scene + 1
    }));
  }

  render() {
    let screen;
    const { flight, flights, seats, scene } = this.state;

    switch (scene) {
      case 1:
        screen = <FlightNumberForm onSceneChange={this.handleSceneChange} />;
        break;
      case 2:
        screen =
          <FlightSelectionForm
            onSceneChange={this.handleSceneChange}
            flights={flights} />;
        break;
      case 3:
        screen =
          <SeatsForm
            onSceneChange={this.handleSceneChange}
            flight={flight}
            seats={seats} />;
        break;
      case 4:
        screen =
          <ConfirmationForm
            onSceneChange={this.handleSceneChange}
            flight={flight}
            seats={seats}
            history={this.props.history} />
        break;
      default: return;
    }

    return (
      <>
      <NavMenu scene={scene} onClick={(scene) => this.handleSceneJump(scene)} />
      { screen }
      </>
    );
  }
}

export default FlightForm;
