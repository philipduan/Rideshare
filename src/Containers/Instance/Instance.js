import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

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
      destination: '', //1 line full address i.e 462, Wellington St W, Toronto, ON, M5V 1E3
      error: '',
      geoCode: {}
      //geocode : {
      // lat: -43.04938492,
      // lng: 73.3492837
      //}
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const input = document.getElementById('autocomplete');
      const options = { componentRestrictions: { country: 'ca' } };
      if (
        typeof window.google !== 'undefined' &&
        typeof window.google.maps !== 'undefined'
      ) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          input,
          options
        );

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
            destination: input.value,
            geoCode: {
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng()
            }
          });
        });
      } else {
        console.error('Google API object is not defined');
      }
    }, 200);
  }

  renderInput = field => (
    <TextField
      id={field.label === 'Destination' ? 'autocomplete' : null}
      multiLine={field.input.name === 'description' ? true : false}
      rows={field.input.name === 'description' ? 5 : 1}
      rowsMax={field.input.name === 'description' ? 5 : 1}
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
    if (!this.state.destination.includes(undefined)) {
      values = {
        ...values,
        geoCode: this.state.geoCode,
        destination: this.state.destination
      };
      console.log(values);

      // this.props.history.push('/sessions');
    } else {
      this.setState({
        error: 'Please enter a correct address'
      });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    const basicInfo = [
      {
        className: 'Field DatePicker',
        label: 'Select Date',
        name: 'date',
        component: this.renderDatePicker
      },
      {
        className: 'Field TimePicker',
        label: 'Select Time',
        name: 'time',
        component: this.renderTimePicker
      },
      {
        className: 'Field',
        label: 'Destination',
        name: 'destination',
        component: this.renderInput
      }
    ];
    return (
      <div className="Create-Instance-Container">
        <div className="Create-Instance-Box">
          <h1> Driver Instance </h1>
          <form
            className="Driver-Instance-Form"
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
            {basicInfo.map((item, i) => (
              <Field
                key={i}
                className={item.className}
                label={item.label}
                name={item.name}
                type={item.type}
                component={item.component}
              />
            ))}
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
  if (!values.destination) {
    errors.destination = 'Please enter an address';
  }
  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'instance'
})(withRouter(Instance));
