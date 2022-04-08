import React from 'react';


interface IPizzaToppings {
  toppings: any;
  onClick: (key: string, isSelected: boolean) => void;
}

const PizzaToppings = ({ toppings, onClick }: IPizzaToppings) => {
  return (
    <ul className="topping-list">
      {
        Object.keys(toppings).map((key: string) => (
          <li
            key={ toppings[key]?.id }
            className="topping-item"
            onClick={ () => onClick(key, !toppings[key].selected) }
          >
            {
              toppings[key]?.selected && <div className="icon-checked" />
            }
            <img src={ require(`../assets/images/${ toppings[key]?.name }.png`) } alt="topping" />
          </li>
        ))
      }
    </ul>
  );
}

export default PizzaToppings;
