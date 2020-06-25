import React from 'react';

import Card from './Card';

class FlightSelectionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flight: {
        number: '',
        departure_date: '',
        origin: '',
        destination: ''
      },
      selectedIndex: -1
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(index, flight) {
    if (this.state.selectedIndex !== index) {
      this.setState({
        flight,
        selectedIndex: index
      });
    } else {
      this.setState({
        flight: { number: '' },
        selectedIndex: -1
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSceneChange(this.state.flight);
  }

  render() {
    const buttonDisabled = this.state.flight.number === '';

    // V1.1: get previously selected card from FlighForm to highlight in case of
    //       scene jump
    // V1.1: improve performance => check, debug & reduce calls to render()
    const flights = this.props.flights
      .sort((a, b) => a.departure_date.localeCompare(b.departure_date))
      .map((flight, index) =>
        <Card
          key={index}
          index={index}
          flight={flight}
          discarded={this.state.flight.number !== ''}
          selected={this.state.selectedIndex === index}
          onClick={() => this.handleClick(index, flight)}
        />
      );

    return (
      <div id="box">
        <h1>Selecciona tu vuelo</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            { flights }
          </div>
          
          <button className="btn-main" disabled={buttonDisabled}>
            Continuar
          </button>
        </form>
      </div>
    )
  }
}

export default FlightSelectionForm;
