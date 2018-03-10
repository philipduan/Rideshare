import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';
import TimePicker from 'material-ui/TimePicker';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import * as actions from '../../Redux/modules/instace.js';

const styles = {
  general: {
    backgroundColor: 'white',
    borderRadius: '5px',
    margin: '10px 0',
    padding: '0 10px'
  },
  hintStyle: {
    color: '#546E7A',
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 'italic',
    fontWeight: '550'
  }
};

class Instance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destinationAddress: '',
      startingAddress: '',
      error: '',
      geoCode: {}
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const input = document.getElementById('autocomplete');
      let input2 = null;
      this.props.match.params.type === 'driver'
        ? (input2 = document.getElementById('autocomplete2'))
        : null;
      const options = { componentRestrictions: { country: 'ca' } };
      if (
        typeof window.google !== 'undefined' &&
        typeof window.google.maps !== 'undefined'
      ) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          input,
          options
        );
        let autocomplete2 = null;
        this.props.match.params.type === 'driver'
          ? (autocomplete2 = new window.google.maps.places.Autocomplete(
              input2,
              options
            ))
          : null;

        autocomplete.addListener('place_changed', () => {
          const selectedPlace = autocomplete.getPlace();
          const componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
          };

          // Get each component of the address from the place details
          // and fill the corresponding field on the form.
          let selectedSuggest = {};
          for (let addressComponent of selectedPlace.address_components) {
            let addressType = '';
            for (let type of addressComponent.types) {
              if (componentForm[type]) {
                addressType = type;
              }
            }
            if (componentForm[addressType]) {
              selectedSuggest[addressType] =
                addressComponent[componentForm[addressType]];
            }
          }
          input.value = `${selectedSuggest.street_number} ${
            selectedSuggest.route
          }, ${selectedSuggest.locality}, ${
            selectedSuggest.administrative_area_level_1
          }, ${selectedSuggest.postal_code}`;
          this.setState({
            destinationAddress: input.value,
            geoCode: {
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng()
            }
          });
        });

        if (this.props.match.params.type === 'driver') {
          autocomplete2.addListener('place_changed', () => {
            const selectedPlace = autocomplete2.getPlace();
            const componentForm = {
              street_number: 'short_name',
              route: 'long_name',
              locality: 'long_name',
              administrative_area_level_1: 'short_name',
              country: 'long_name',
              postal_code: 'short_name'
            };

            // Get each component of the address from the place details
            // and fill the corresponding field on the form.
            let selectedSuggest = {};
            for (let addressComponent of selectedPlace.address_components) {
              let addressType = '';
              for (let type of addressComponent.types) {
                if (componentForm[type]) {
                  addressType = type;
                }
              }
              if (componentForm[addressType]) {
                selectedSuggest[addressType] =
                  addressComponent[componentForm[addressType]];
              }
            }
            input2.value = `${selectedSuggest.street_number} ${
              selectedSuggest.route
            }, ${selectedSuggest.locality}, ${
              selectedSuggest.administrative_area_level_1
            }, ${selectedSuggest.postal_code}`;

            this.setState({
              startingAddress: input2.value
            });
          });
        }
      } else {
        console.error('Google API object is not defined');
      }
    }, 200);
  }

  renderInput = field => (
    <TextField
      id={field.id}
      placeholder=""
      autoComplete="off"
      className={field.className}
      style={styles.general}
      hintText={field.label}
      hintStyle={styles.hintStyle}
      type={field.type}
      underlineShow={false}
      fullWidth={true}
      errorText={field.meta.touched ? field.meta.error : null}
      {...field.input}
    />
  );
  renderDatePicker = field => {
    const today = new Date();
    return (
      <DatePicker
        id={field.id}
        className={field.className}
        hintText={field.label}
        hintStyle={styles.hintStyle}
        style={styles.general}
        underlineShow={false}
        minDate={today}
        errorText={field.meta.touched && field.meta.error}
        onChange={(event, date) =>
          field.input.onChange(moment(date).format('ddd MMM Do YYYY'))
        }
        fullWidth={true}
      />
    );
  };

  renderTimePicker = field => {
    return (
      <TimePicker
        primary
        id={field.id}
        className={field.className}
        hintText={field.label}
        hintStyle={styles.hintStyle}
        format="24hr"
        style={styles.general}
        minutesStep={5}
        underlineShow={false}
        errorText={field.meta.touched && field.meta.error}
        onChange={(event, time) =>
          field.input.onChange(moment(time).format('hh:mm'))
        }
        fullWidth={true}
      />
    );
  };

  onSubmit = values => {
    this.state.error ? null : this.setState({ error: '' });
    if (!this.state.destinationAddress.includes(undefined)) {
      let data = {};
      this.props.match.params.type === 'driver'
        ? (data = {
            geoCode: this.state.geoCode,
            time: values.time,
            date: values.date,
            capacity: values.capacity,
            destinationAddress: this.state.destinationAddress,
            startingAddress: this.state.startingAddress,
            carInfo: {
              make: values.make.toUpperCase(),
              model: values.model.toUpperCase(),
              fuelEconomy: values.fuelEconomy,
              licensePlate: values.licensePlate.toUpperCase().replace(/\s/g, '')
            }
          })
        : (data = {
            time: values.time,
            date: values.date,
            geoCode: this.state.geoCode,
            destinationAddress: this.state.destinationAddress,
            maxDistance: values.maxDistance
          });
      console.log(data);
      if (this.props.match.params.type === 'driver') {
        axios
          .post('https://rideshareserv.herokuapp.com/driver', data)
          .then(response => console.log(response))
          .catch(err => console.log(err));
      } else {
        sessionStorage.setItem('address', data.destinationAddress);
        return this.props.history.push('/ridefeed');
      }
    } else {
      this.setState({
        error: 'Please enter a correct address'
      });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    const instanceField = [
      {
        id: '',
        className: 'Field DatePicker',
        label: 'Select Date',
        name: 'date',
        component: this.renderDatePicker,
        passenger: true
      },
      {
        id: '',
        className: 'Field TimePicker',
        label: 'Select Time',
        name: 'time',
        component: this.renderTimePicker,
        passenger: true
      },
      {
        id: 'autocomplete2',
        className: 'Field',
        label: 'Starting Address',
        name: 'startingAddress',
        component: this.renderInput,
        passenger: false
      },
      {
        id: 'autocomplete',
        className: 'Field',
        label: 'Destination',
        name: 'destinationAddress',
        component: this.renderInput,
        passenger: true
      },
      {
        id: '',
        className: 'Field',
        label: 'Max Distance',
        name: 'maxDistance',
        type: 'number',
        component: this.renderInput,
        passenger: true
      },
      {
        id: '',
        className: 'Field',
        label: 'Capacity',
        name: 'capacity',
        type: 'number',
        component: this.renderInput,
        passenger: false
      },
      {
        className: 'Field',
        label: 'Car Brand',
        name: 'make',
        type: 'text',
        component: this.renderInput,
        passenger: false
      },
      {
        id: '',
        className: 'Field',
        label: 'Car Model',
        name: 'model',
        type: 'text',
        component: this.renderInput,
        passenger: false
      },
      {
        id: '',
        className: 'Field',
        label: 'Car Fuel Consumption',
        name: 'fuelEconomy',
        type: 'number',
        component: this.renderInput,
        passenger: false
      },
      {
        id: '',
        className: 'Field',
        label: 'Car License Plate',
        name: 'licensePlate',
        type: 'text',
        component: this.renderInput,
        passenger: false
      }
    ];
    return (
      <div className="Create-Instance-Container">
        <div className="Create-Instance-Box">
          <h1>
            {' '}
            {this.props.match.params.type === 'driver'
              ? 'Driver Instance'
              : 'Passenger Instance'}
          </h1>
          <form
            className="Driver-Instance-Form"
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
            {instanceField.map(
              (item, i) =>
                this.props.match.params.type === 'passenger' ? (
                  item.passenger ? (
                    <Field
                      key={i}
                      id={item.id}
                      className={item.className}
                      label={item.label}
                      name={item.name}
                      type={item.type}
                      component={item.component}
                    />
                  ) : null
                ) : item.name !== 'maxDistance' ? (
                  <Field
                    key={i}
                    id={item.id}
                    className={item.className}
                    label={item.label}
                    name={item.name}
                    type={item.type}
                    component={item.component}
                  />
                ) : null
            )}
            <p> {this.state.error} </p>
            <button type="submit" className="Create-Instance-Submit">
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.date) {
    errors.date = 'Please choose a date';
  }
  if (!values.time) {
    errors.time = 'Please choose a time';
  }
  if (!values.destinationAddress) {
    errors.destination = 'Please enter an address';
  }
  if (!values.capacity) {
    errors.capacity = 'Please enter the maximum capacity';
  }
  if (!values.make) {
    errors.make = 'Please enter your car brand';
  }
  if (!values.model) {
    errors.model = 'Please enter your car model';
  }
  if (!/^([0-9]*|\d*\.\d{1}?\d*)$/.test(values.fuelEconomy)) {
    errors.fuelEconomy = 'Please enter a valid value ';
  }
  if (!values.fuelEconomy) {
    errors.fuelEconomy = ' Please enter your car fuel consumption L/Km';
  }
  if (!values.licensePlate) {
    errors.licensePlate = 'Please enter your car license plate ';
  }
  if (!/^([0-9]*|\d*\.\d{1}?\d*)$/.test(values.capacity)) {
    errors.capacity = 'Please enter a valid value';
  }
  if (!/^[a-zA-Z0-9 ]+$/.test(values.licensePlate)) {
    errors.licensePlate = 'Please enter a valid license plate number';
  }
  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'instance'
})(connect(null, actions)(withRouter(Instance)));
