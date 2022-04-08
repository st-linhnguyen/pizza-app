import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const PaymentResult = () => {
  const { pizzas, summary } = useSelector((state: RootStateOrAny) => state?.cart);
  const paymentData = useSelector((state: RootStateOrAny) => state?.payment);
  const [payload, setPayload] = useState<any>({});

  useEffect(() => {
    payload.pizzas = pizzas;
    payload.payment = {...paymentData};
    payload.summary = summary;
    setPayload({ ...payload });
  }, []);

  return (
    <div className="payment-result">
      <h4 className="title">JSON payload</h4>
      <pre className="payload-content">{JSON.stringify(payload, null, 2) }</pre>
    </div>
  );
};

export default PaymentResult;
