import React from 'react';

import MaskedInput from 'react-text-mask'

import InputError from '../../components/InputError';
import Seat from './Seat';

class SeatsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      seat: '',
      seats: props.seats
    };

    // V1.1: only proceed if props.flight !== null && isValid() (?)
    this.addSeat = this.addSeat.bind(this);
    this.removeSeat = this.removeSeat.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addSeat(event) {
    event.preventDefault();

    const allowed =
      !this.state.seats.includes(this.state.seat) && this.state.seats.length < 5;

    if (allowed) {
      this.setState({
        seat: '',
        seats: [...this.state.seats, this.state.seat]
      })
    }
  }

  removeSeat(seat) {
    this.setState({
      seats: this.state.seats.filter(item => item !== seat)
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value.toUpperCase();

    this.setState({ seat: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSceneChange(this.state.seats);
  }

  render() {
    // V1.1:
    //   ==> show error if trying to add duplicate seat or maximum (5) exceeded
    //   ==> allow inputting 6A as a seat instead of forcing user to type 06A

    const buttonDisabled =
      Object.keys(this.state.errors).length !== 0 || this.state.seats.length < 1;

    const seats = this.state.seats
      .sort((a, b) => a.localeCompare(b))
      .map((seat, index) =>
        <Seat
          key={index}
          index={index}
          seat={seat}
          errors={this.state.errors}
          removeSeat={this.removeSeat} />
      );

    return (
      <div id="box">
        <h1>Añade tus asientos</h1>

        {/* V1.1: add CSS transition to seat deletion & addition */}
        {/* V2.0: enhance design (e.g. use cards) to improve UI/UX */}
        <div>
          { seats }
          <InputError el="seats" errors={this.state.errors} />
        </div>

        {/*V1.1: ensure user can only input according to the pattern */}
        {/*V1.1: only clear state.errors when they are fixed (i.e. validated)*/}
        {/*V2.0: improve mask to restrict seat input more granularly */}
        <form onSubmit={this.addSeat}>
          <div className="flex mt-6 mb-4">
            <MaskedInput
              required
              name="seat"
              type="text"
              placeholder="01C"
              pattern="[0-8]{1}[0-9]{1}[a-kA-K]{1}"
              className="mr-2 text-center w-1/2"

              guide={false}
              mask={[ /[0-8]/, /[0-9]/, /[a-kA-K]/ ]}
              value={this.state.seat}
              onChange={this.handleInputChange} />

            {/* V1.1: add `+` icon */}
            {/* V1.1: disable button when 5 seats added */}
            <button className="btn-half" onClick={this.addSeat}>
              Añadir asiento
            </button>
          </div>
        </form>

        <InputError el="standard" errors={this.state.errors} />

        <button
          className="btn-main"
          disabled={buttonDisabled}
          onClick={this.handleSubmit}>
          Finalizar
        </button>
      </div>
    )
  }
}

export default SeatsForm;
