import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { Field, reduxForm } from 'redux-form';
import { image, helpers } from 'faker';
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

class DriverInstance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destination: '',
      addressForm: {},
      error: '',
      geoCode: {}
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
            address: input.value,
            addressForm: selectedSuggest,
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
      id={field.label === 'Location' ? 'autocomplete' : null}
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
        hintText="Select Date"
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
        hintText="Select Time"
        hintStyle={styles.hintStyle}
        style={styles.general}
        minutesStep={5}
        underlineShow={false}
        errorText={field.meta.touched && field.meta.error}
        onChange={(event, time) =>
          field.input.onChange(moment(time).format('hh:mm A'))
        }
        fullWidth={true}
      />
    );
  };

  onSubmit = values => {
    this.state.error ? null : this.setState({ error: '' });
    if (!this.state.address.includes(undefined)) {
      values = {
        ...values,
        geoCode: this.state.geoCode,
        destination: this.state.distination,
        addressForm: this.state.addressForm,
        attending: [this.props.currentUserId],
        pending: [],
        institution: this.props.currentUser.profile.institution,
        sessionCreator: this.props.currentUser
      };
      // console.log(
      //   'exact address',
      //   `https://maps.google.com/maps?q=${values.geoCode.lat},${
      //     values.geoCode.lng
      //   }`
      // );
      delete values.location;
      this.props.history.push('/profile');
    } else {
      this.setState({
        error: 'Please enter a complete address'
      });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    const basicInfo = [
      {
        className: 'Field',
        label: 'Session Title',
        name: 'title',
        type: 'text',
        component: this.renderInput
      },
      {
        className: 'Field',
        label: 'Course Code',
        name: 'courseCode',
        type: 'text',
        component: this.renderInput
      },
      {
        className: 'Field',
        label: 'Session Capacity',
        name: 'capacity',
        type: 'number',
        component: this.renderInput
      },
      {
        className: 'Field DatePicker',
        label: '',
        name: 'date',
        component: this.renderDatePicker
      },
      {
        className: 'Field TimePicker',
        label: '',
        name: 'time',
        component: this.renderTimePicker
      },
      {
        className: 'Field',
        label: 'Location',
        name: 'location',
        component: this.renderInput
      },
      {
        className: 'Field Description',
        label: 'Session Description...',
        name: 'description',
        type: 'text',
        component: this.renderInput
      }
    ];
    return (
      <div className="Create-Session-Container">
        <div className="Create-Session-Box">
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
            <button type="submit" className="Create-Session-Submit">
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
  if (!values.title) {
    errors.title = 'Please enter a title';
  }
  if (!values.courseCode) {
    errors.courseCode = 'Please enter a course code';
  }
  if (!values.capacity) {
    errors.capacity = 'Please enter a number';
  }
  if (!values.date) {
    errors.date = 'Please choose a date';
  }
  if (!values.time) {
    errors.time = 'Please choose a time';
  }
  if (!values.location) {
    errors.location = 'Please enter an address';
  }
  return errors;
}

DriverInstance = withRouter(DriverInstance);
export default reduxForm({
  validate: validate,
  form: 'driverinstance'
})(DriverInstance);
