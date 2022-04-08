import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { RootStateOrAny, useSelector } from 'react-redux';

import './App.scss';
import PORTAL_VIEW from './core/constants/portalView';
import PizzaMenu from './components/PizzaMenu';
import Cart from './components/Cart';
import Dialog from './components/Dialog';
import ShipmentDetail from './components/ShipmentDetail';
import PaymentResult from './components/PaymentResult';

function App() {
  const view = useSelector((state: RootStateOrAny) => state?.portalView);

  useEffect(() => {
    if (view?.portalView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [view?.portalView]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
         <PizzaMenu />
        </div>
        <div className="col-4">
          <Cart />
        </div>
      </div>
      {
        view?.portalView === PORTAL_VIEW.ADDRESS &&
        ReactDOM.createPortal(<Dialog ContentComponent={ ShipmentDetail } position="center" />, document.body)
      }
      {
        view?.portalView === PORTAL_VIEW.PAYMENT_RESULT &&
        ReactDOM.createPortal(<Dialog ContentComponent={ PaymentResult } position="center" />, document.body)
      }
    </div>
  );
}

export default App;
