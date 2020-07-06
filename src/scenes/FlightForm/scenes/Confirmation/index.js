import React from 'react';

import axios from 'axios';

import Banner from 'components/Banner';
import FlightInfo from './FlightInfo';
import InputError from '../../components/InputError';

class ConfirmationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      loading: false,
      terms: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();

    axios.post('/passengers', {
        flight: {
          number: this.props.flight.number,
          departure_date: this.props.flight.departure_date
        },
        seats: this.props.seats,
        terms: this.state.terms
      })
      // V1.1: fade away on page change + add success message
      .then(this.props.history.push('/flights'))
      .catch(err => {
        this.setState({ loading: false });

        if (err.response) { 
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          err = err.response;

          if (err.status === 400 || err.status === 429) {
            // Miscellaneous error (e.g. wrong flight, basket closed, duplicate seats)
            this.setState({
              errors: {'terms': [err.data.message]}
            });
          } else if (err.status === 422) {
            // Laravel validation error
            this.setState({
              errors: err.data.errors
            });
          } else if (err.status === 500) {
            this.setState({
              errors: {'terms': ['Ha habido un error inesperado...']}
            });
          }
        } else {
          // The request was made but no response was received
          // `err.request` is an instance of XMLHttpRequest
          // Something happened in setting up the request that triggered an Error

          this.setState({
            errors: {'terms': ['Ha habido un error inesperado...']}
          });
        }
      });
  }

  render() {
    const { flight, seats } = this.props;

    const buttonDisabled =
      this.state.loading || !this.state.terms ||
      Object.keys(this.state.errors).length !== 0;

    // V1.1: render and show spinner after submit while loading
    return (
      <>
      {/* V1.1: add close/hide button */}
      <Banner title="¡Importante!">
        <ul className="ml-6 list-disc text-black text-sm">
          <li>Asegúrate de que tu vuelo y asientos son correctos</li>
          <li>Al continuar, tus asientos se añadirán a la <strong>cesta de intercambio</strong></li>
          <li>Te comprometes a usar tus nuevos asientos asignados por PirataFly; sentarte en tus asientos originales afectará a otros usuarios</li>
        </ul>
      </Banner>

      {/* V1.1: align that checkbox + label babe ;) */}
      <div id="box">
        <h1>Confirma tus detalles</h1>

        <FlightInfo flight={flight} seats={seats} />

        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              required
              name="terms"
              type="checkbox"
              checked={this.state.terms}
              onChange={() => this.setState(state => ({ terms: !state.terms }))} />
            Acepto seguir las condiciones mencionadas anteriormente.
          </label>

          <InputError el="terms" errors={this.state.errors} />

          <button className="btn-main" disabled={buttonDisabled}>
            Confirmar
          </button>
        </form>
      </div>
      </>
    );
  }
}

export default ConfirmationForm;
