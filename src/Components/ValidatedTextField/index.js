import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';




const ValidatedTextField = ({ label, type, change, error }) => (
  <TextField
    hintText={label}
    onChange={change}
    type={type}
    floatingLabelText={label}
    errorText={error}
  />
);

ValidatedTextField.propTypes = {
  label: PropTypes.string.isRequired
};

export default ValidatedTextField;