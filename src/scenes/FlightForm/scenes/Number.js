import React from 'react';

import axios from 'axios';
import MaskedInput from 'react-text-mask'

import InputError from '../components/InputError';

class FlightNumberForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '',
      checkedIn: false,
      loading: false,
      errors: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = name === 'checkedIn' ? target.checked : target.value.toUpperCase();

    this.state.errors['number'] && delete this.state.errors['number'];

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ loading: true });

    // V1.1: add (full request) timeout => let user know when they're offline
    axios.get('/flights', {
        params: {
          number: this.state.number,
          checked_in: this.state.checkedIn  
        }
      })
      .then(({ data }) => this.props.onSceneChange(data.flights))
      .catch(err => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          err = err.response;

          // if (err.status === 400 || err.status === 429 || err.status === 503) {
          //   // Miscellaneous error
          //   this.setState({
          //     errors: {'number': [err.data.message]}
          //   });
          // } else if (err.status === 422) {
          //   // Laravel validation error
          //   this.setState({
          //     errors: err.data.errors
          //   });
          // }
          this.setState({
            errors: {'number': ['No hemos encontrado vuelos con ese número']}
          });
          this.setState({ loading: false });
        } else {
          // The request was made but no response was received
          // `err.request` is an instance of XMLHttpRequest
          // Something happened in setting up the request that triggered an Error
          this.setState({
            errors: {'number': ['Ha habido un error inesperado...']}
          });
        }
      });
  }

  render() {
    // V1.1: render and show spinner onSubmit while loading
    // V1.1: disable button based on regex input validation (instead of on length)
    // V1.1: use JS validation library or setup CSS pseudo-classes and custom error messages
    // => better UI/UX => catch errors more easily
    const buttonDisabled =
      this.state.loading || !this.state.checkedIn || this.state.number.length < 3 ||
      Object.keys(this.state.errors).length !== 0;

    return (
      <div id="box">
        <h1>Introduce tu nº de vuelo</h1>

        {/*V1.1: clear state.errors when they are fixed (i.e. validated)
            delete this.state.errors['number'/'checkedIn']*/}
        <form onSubmit={this.handleSubmit}>
          <MaskedInput
            autoFocus
            required
            name="number"
            type="text"
            placeholder="P. ej. AF275"
            pattern="[0-9a-zA-Z]{2}[0-9]{1,4}"
            className="text-xl w-full"

            guide={false}
            mask={[ /[0-9a-zA-Z]/, /[0-9a-zA-Z]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/ ]}
            value={this.state.number}
            onChange={this.handleInputChange} />
          <InputError el="number" errors={this.state.errors} />

          {/*V1.1: align that checkbox + label babe ;)*/}
          <label>
            <input
              required
              name="checkedIn"
              type="checkbox"
              checked={this.state.checkedIn}
              onChange={this.handleInputChange} />
            Ya he hecho el check-in.
          </label>
          <InputError el="checkedIn" errors={this.state.errors} />

          <button className="btn-main" disabled={buttonDisabled}>
            Buscar
          </button>
        </form>
      </div>
    );
  }
}

export default FlightNumberForm;
