import valid from 'card-validator';

export function userNameValidator() {
  return {
    required: {
      value: true,
      message: `Please don't let this field blank`
    },
    maxLength: {
      value: 20,
      message: 'Please enter less than 20 characters'
    }
  };
}

export function addressValidator() {
  return {
    required: {
      value: true,
      message: `Please don't let address blank`
    },
    maxLength: {
      value: 100,
      message: 'Please enter less than 100 characters'
    }
  };
}

export function phoneValidator() {
  return {
    required: {
      value: true,
      message: `Please don't let phone number blank`
    },
    pattern: {
      value: /(?=.*?[0-9])/,
      message: 'Please enter only number'
    },
    maxLength: {
      value: 10,
      message: 'Please enter less than 10 characters'
    }
  };
}

export function postalCodeValidator() {
  return {
    required: {
      value: true,
      message: `Please don't let postal code blank`
    },
    pattern: {
      value: /(?=.*?[0-9])/,
      message: 'Please enter only number'
    },
    maxLength: {
      value: 10,
      message: 'Please enter less than 10 characters'
    }
  };
}

export function cardNumberValidator() {
  return {
    required: {
      value: true,
      message: `Please don't leave card number blank`
    },
    validate: (value) => valid.number(value).isValid ? null : 'Incorrect format'
  };
}

export function expiryValidator() {
  return {
    required: {
      value: true,
      message: `Please don't leave expiry blank`
    },
    validate: (value) => {
      if (valid.expirationDate(value, 2050).isValid) {
        return;
      } else {
        return 'Expiry is invalid';
      }
    }
  };
}

export function cvvValidator() {
  return {
    required: {
      value: true,
      message: `Please don't leave CVV blank`
    },
    validate: (value) => valid.cvv(value, 3).isValid ? null : 'Expiry is invalid'
  };
}
