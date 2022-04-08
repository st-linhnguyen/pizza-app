import React from 'react';

interface IPizzaSizes {
  sizes: any[];
  selectedValue: any;
  onChangeSize: (size: any) => void;
}

const PizzaSizes = ({ sizes, selectedValue, onChangeSize }: IPizzaSizes) => {
  const onClick = (size: any) => {
    if (onChangeSize && typeof onChangeSize === 'function') {
      onChangeSize(size);
    }
  }
  return (
    <ul className="size-list">
      {
        sizes.map((size: any, ind) => (
          <li
            key={ ind }
            className={ `size-item ${ size === selectedValue && 'selected' }` }
            onClick={ () => onClick(size) }
          >
            { size.substring(0, 1) }
          </li>
        ))
      }
    </ul>
  );
};

export default PizzaSizes;
