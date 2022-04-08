import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cards from 'react-credit-cards';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  cardNumberValidator,
  expiryValidator,
  cvvValidator,
  userNameValidator,
  addressValidator,
  phoneValidator,
  postalCodeValidator
}  from '../shared/validator/form.validator';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from '../shared/utils/payment.util';
import { updatePayment, updatePortalView } from 'src/app.action';
import PORTAL_VIEW from 'src/core/constants/portalView';

const ShipmentDetail = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector((state: RootStateOrAny) => state?.payment);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: paymentData?.payment || {
      first_name: '',
      last_name: '',
      address: '',
      city: '',
      postal_code: '',
      phone_number: '',
    }
  });
  const [cardData, setCardData] = useState({
    card_number: paymentData?.payment?.card_number || '',
    card_holder: paymentData?.payment?.card_holder || '',
    expiry: paymentData?.payment?.expiry || '',
    cvc: paymentData?.payment?.cvc || '',
    issuer: paymentData?.payment?.issuer || '',
    focused: paymentData?.payment?.focused || '',
    formData: null
  });

  const handleInputChange = ({ target }) => {
    if (target.name === 'card_number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }
    cardData[target.name] = target.value;

    setCardData({ ...cardData });
  };

  const handleInputFocus = ({ target }) => {
    cardData.focused = target.name;
    setCardData({ ...cardData });
  };

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      cardData.focused = issuer;
      setCardData({ ...cardData });
    }
  };

  const onSubmit = (data) => {
    dispatch(updatePayment({ ...data }));
    dispatch(updatePortalView(PORTAL_VIEW.PAYMENT_RESULT));
  }

  return (
    <div className="shipment-container">
      <form className="form form-shipment row" onSubmit={ handleSubmit(onSubmit) } >
        <div className="col-6">
          <div className="row">
            <label htmlFor="name" className="form-label">Name</label>
            <div className="col-6">
              <div className="form-group">
                <input
                  name="first_name"
                  className={ `form-control me-3 ${ errors['first_name'] && 'is-invalid' }` }
                  placeholder="First name"
                  {...register("first_name", userNameValidator())}
                />
                {
                  errors['first_name'] &&
                  <small className="msg-error">{ errors['first_name']?.message }</small>
                }
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <input
                  name="last_name"
                  className={ `form-control ${ errors['last_name'] && 'is-invalid' }` }
                  placeholder="Last name"
                  {...register("last_name", userNameValidator())}
                />
                {
                  errors['last_name'] &&
                  <small className="msg-error">{ errors['last_name']?.message }</small>
                }
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              name="address"
              className={ `form-control ${ errors['address'] && 'is-invalid' }` }
              placeholder="Address"
              {...register("address", addressValidator())}
            />
            {
              errors['address'] &&
              <small className="msg-error">{ errors['address']?.message }</small>
            }
          </div>
          <div className="form-group">
            <label htmlFor="city" className="form-label">City</label>
            <input
              name="city"
              className={ `form-control ${ errors['city'] && 'is-invalid' }` }
              placeholder="City"
              {...register("city", { required: true })}
            />
            {
              errors['city'] &&
              <small className="msg-error">Please don't let city blank</small>
            }
          </div>
          <div className="form-group">
            <label htmlFor="postal_code" className="form-label">Postal code</label>
            <input
              name="postal_code"
              className={ `form-control ${ errors['postal_code'] && 'is-invalid' }` }
              placeholder="Postal code"
              {...register("postal_code", postalCodeValidator())}
            />
            {
              errors['postal_code'] &&
              <small className="msg-error">{ errors['postal_code']?.message }</small>
            }
          </div>
          <div className="form-group">
            <label htmlFor="phone_number" className="form-label">Phone number</label>
            <input
              name="phone_number"
              className={ `form-control ${ errors['phone_number'] && 'is-invalid' }` }
              placeholder="Phone number"
              {...register("phone_number", phoneValidator())}
            />
            {
              errors['phone_number'] &&
              <small className="msg-error">{ errors['phone_number']?.message }</small>
            }
          </div>
        </div>
        <div className="col-6">
          <div className="card-wrapper">
            <Cards
              number={ cardData.card_number }
              name={ cardData.card_holder }
              expiry={ cardData.expiry }
              cvc={ cardData.cvc }
              focused={ cardData.focused }
              callback={ handleCallback }
            />
          </div>
          <div className="form-group">
            <label htmlFor="card_number" className="form-label">Card number</label>
            <input
              name="card_number"
              type="tel"
              className={ `form-control ${ errors['card_number'] && 'is-invalid' }` }
              placeholder="Card Number"
              {...register("card_number", cardNumberValidator())}
              onChange={ handleInputChange }
              onFocus={ handleInputFocus }
            />
            {
              errors['card_number'] &&
              <small className="msg-error">{ errors['card_number']?.message }</small>
            }
          </div>
          <div className="form-group">
            <label htmlFor="card_holder" className="form-label">Card holder</label>
            <input
              name="card_holder"
              type="text"
              className={ `form-control ${ errors['card_holder'] && 'is-invalid' }` }
              placeholder="Name"
              {...register("card_holder", { required: `Please don't leave card holder blank` })}
              onChange={ handleInputChange }
              onFocus={ handleInputFocus }
            />
            {
              errors['card_holder'] &&
              <small className="msg-error">{ errors['card_holder']?.message }</small>
            }
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="expiry" className="form-label">Valid thru</label>
                <input
                  type="tel"
                  name="expiry"
                  className={ `form-control ${ errors['expiry'] && 'is-invalid' }` }
                  placeholder="mm/yy"
                  {...register("expiry", expiryValidator())}
                  onChange={ handleInputChange }
                  onFocus={ handleInputFocus }
                />
                {
                  errors['expiry'] &&
                  <small className="msg-error">{ errors['expiry']?.message }</small>
                }
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="cvc" className="form-label">CVC</label>
                <input
                  type="tel"
                  name="cvc"
                  className={ `form-control ${ errors['cvc'] && 'is-invalid' }` }
                  placeholder="CVC"
                  {...register("cvc", cvvValidator())}
                  onChange={ handleInputChange }
                  onFocus={ handleInputFocus }
                />
                {
                  errors['cvc'] &&
                  <small className="msg-error">{ errors['cvc']?.message }</small>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="form-button">
          <button className="btn btn-primary btn-submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ShipmentDetail;
