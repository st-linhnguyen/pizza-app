import React from 'react';

import { useDispatch } from 'react-redux';
import { updatePortalView } from 'src/app.action';

const Dialog = ({ ContentComponent, position }) => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(updatePortalView(null));
  }

  return (
    <div className={ `dialog dialog-${position}`  }>
      <div className="dialog-content">
        <button className="btn btn-icon btn-close" onClick={ onClose }></button>
        <ContentComponent />
      </div>
    </div>
  );
};

export default Dialog;
