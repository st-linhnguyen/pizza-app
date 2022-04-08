import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { updateCart, updatePortalView } from 'src/app.action';
import PORTAL_VIEW from 'src/core/constants/portalView';

const OrderingItem = ({ data }) => {
  const dispatch = useDispatch();
  const { pizzas } = useSelector((state: RootStateOrAny) => state?.cart);

  useEffect(() => {
    pizzas[data?.id].summary = pizzas[data?.id].quantity * pizzas[data?.id].price;
    dispatch(updateCart({
      pizzas: [...pizzas]
    }));
  }, [data?.quantity]);

  const updateQuantity = (method: 'increase' | 'decrease') => {
    if (method === 'increase') {
      pizzas[data?.id].quantity += 1;
    } else if (method === 'decrease' && pizzas[data?.id]?.quantity >= 0) {
      pizzas[data?.id].quantity -= 1;
      if (pizzas[data?.id]?.quantity === 0) {
        pizzas.splice(data?.id, 1);
      }
    }
    dispatch(updateCart({
      pizzas: [...pizzas]
    }));
  };

  return (
    <li className="ordering-item">
      <div className="item-info">
        <p className="item-name">
          { data?.name } <span>({ data?.size?.substring(0, 1).toUpperCase() })</span><span className="price">(${data?.summary})</span>
        </p>
        <div className="item-toppings">
          {
            data?.toppings?.map((item, ind) => (
              <span key={ ind }>{ item }</span>
            ))
          }
        </div>
      </div>
      <div className="item-quantity">
        <button className="btn btn-icon" onClick={ () => updateQuantity('decrease') }>-</button>
        <span className="quantity">{ data?.quantity }</span>
        <button className="btn btn-icon"onClick={ () => updateQuantity('increase') }>+</button>
      </div>
    </li>
  );
}

const Cart = () => {
  const dispatch = useDispatch();
  const { pizzas } = useSelector((state: RootStateOrAny) => state?.cart);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let temp = 0;
    pizzas.map(item => temp += item?.summary);
    setPrice(temp);
  }, [pizzas]);

  useEffect(() => {
    dispatch(updateCart({
      summary: price
    }));
  }, [price]);

  const onCheckout = () => {
    dispatch(updatePortalView(PORTAL_VIEW.ADDRESS))
  }

  return (
    <div className="cart">
      <h4 className="title">--- Your Basket ---</h4>
      {
        pizzas?.length ?
        <>
          <ul className="ordering-list">
            {
              pizzas.map((item, ind) => (
                <OrderingItem key={ ind } data={ item } />
              ))
            }
          </ul>
          <button className="btn btn-checkout" onClick={ onCheckout }>
            Check out (${ price })
          </button>
        </> :
        <p className="txt-empty">Your cart is empty</p>
      }
    </div>
  );
};

export default Cart;
