/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import './Login.scss';

// constants
import warningMessages from '../../constants/warningMessages';

// action creators
import { login, clearLoginError } from '../../redux/actions/loginActions';

// components
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import Input from '../../components/Input/Input';
import MainButton from '../../components/MainButton/MainButton';
import userRoles from '../../constants/userRoles';

const initialLoginState = {
  captainEmail: '',
  captainPassword: '',
  captainEmailIsWrong: false,
  captainPasswordIsWrong: false,
};

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loginError, user } = useSelector(({ authReducer }) => authReducer);

  const [warningMessage, setWarningMessage] = useState('');
  const [loginForm, setLoginForm] = useState(initialLoginState);

  useEffect(() => {
    if (user.isLogged) {
      if (user.userLogged.role >= userRoles.MENTOR) {
        history.replace('/profile');
      } else {
        history.replace('/challenges');
      }
    }
    if (loginError) {
      setWarningMessage(warningMessages.login.LOGIN_ERROR);
    }
  }, [user?.isLogged, loginError]);

  function handleTextInputChange({ target: { name, value } }) {
    dispatch(clearLoginError());
    setLoginForm({ ...loginForm, [name]: value, [`${name}IsWrong`]: false });
    setWarningMessage('');
  }

  function handleLoginClick() {
    let isFormValid = true;
    const loginInputsToValdate = (({
      captainWrongEmail,
      captainWrongPassword, ...rest
    }) => rest)(loginForm);

    Object.entries(loginInputsToValdate).forEach(([key, value]) => {
      if (value === '') {
        setLoginForm({ ...loginForm, [`${key}IsWrong`]: true });
        setWarningMessage(warningMessages.login.LOGIN_REQUIRED_ENTRY);
        isFormValid = false;
      }
    });

    if (isFormValid) {
      dispatch(login(loginForm.captainEmail, loginForm.captainPassword));
      setWarningMessage('');
    }
  }

  function handleKeyUp({ keyCode }) {
    if (keyCode === 13) {
      handleLoginClick();
    }
  }

  return (
    <AppWrapper title="Welcome!">
      <section className="login-container">
        <h3 className="app__title">
          Login to access the arena with your credentials (we sent you an email!)
        </h3>
        <form className="login__form">
          <div className="form__input form__login">
            <Input
              type="text"
              name="captainEmail"
              placeholder="e-mail"
              value={loginForm.captainEmail}
              onChange={handleTextInputChange}
              isIncorrect={loginForm.captainEmailIsWrong}
            />
          </div>
          <div className="form__input form__login">
            <Input
              type="password"
              name="captainPassword"
              placeholder="Password"
              value={loginForm.captainPassword}
              onChange={handleTextInputChange}
              isIncorrect={loginForm.captainPasswordIsWrong}
              onKeyUp={handleKeyUp}
            />
          </div>
          <Link
            className="app__title normal__font-size"
            to="/restorePasswordByMail"
          >
            Forgot your password?

          </Link>
          <small className="form__warningMessage">{warningMessage}</small>
          <div className="form__button">
            <MainButton onClick={handleLoginClick}>Login</MainButton>
          </div>
        </form>
        <div className="login__info">
          <h3 className="app__title">
            Remember the deadline to submit all the challenges is October 10th at 23:59 P.M. GMT-5.
            {' '}
            <br />
            If you have any questions  please contact DevelopergamesEMEA@redhat.com
          </h3>
          <h3 className="app__title">
            Good Luck!
          </h3>
        </div>
      </section>
    </AppWrapper>
  );
}

export default Login;
