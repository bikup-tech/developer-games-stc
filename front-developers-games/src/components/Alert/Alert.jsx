import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Alert.scss';

import alertConstants from '../../constants/alertConstants';

import { resetAlert } from '../../redux/actions/alertActions';

const alertClasses = {
  WARNING: 'alert-container--warning',
  SUCCESS: 'alert-container--success',
  ERROR: 'alert-container--error',
};

function Alert() {
  const dispatch = useDispatch();
  const { type, message } = useSelector(({ mainReducer }) => mainReducer.alert);

  const [isVisible, setIsVisible] = useState(false);
  const [alertIcon, setAlertIcon] = useState(alertConstants.icons.WARNING);
  const [alertBackground, setAlertBackground] = useState(alertClasses.WARNING);

  let alertTimer = null;

  useEffect(() => {
    if (message && type) {
      setIsVisible(true);

      alertTimer = setTimeout(() => {
        setIsVisible(false);
        dispatch(resetAlert());
      }, 4000);
    }

    return () => clearTimeout(alertTimer);
  }, [type, message]);

  function configAlert(alertType) {
    setAlertIcon(alertConstants.icons[alertType]);
    setAlertBackground(alertClasses[alertType]);
  }

  useEffect(() => {
    if (message && type) {
      switch (type) {
        case alertConstants.types.SUCCESS:
        case alertConstants.types.ERROR:
        case alertConstants.types.WARNING:
          configAlert(type);
          break;

        default:
          configAlert(alertConstants.types.WARNING);
          break;
      }
    }
  }, [type]);

  function handleClose() {
    setIsVisible(false);
    clearTimeout(alertTimer);
    dispatch(resetAlert());
  }

  return (
    <div className={`alert-background ${isVisible ? 'alert--shown' : 'alert--hidden'} `}>
      <div className={`alert-container ${alertBackground}`}>
        <img src={alertIcon} alt="alert icon" className="alert__icon" />
        <p className="alert__message">{message}</p>
        <div className="flex-separator" />
        <p className="alert__close" onClick={handleClose}>X</p>
      </div>
    </div>
  );
}

export default Alert;
