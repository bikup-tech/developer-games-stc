import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// constants
import warningMessages from '../../constants/warningMessages';

// components
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import Input from '../../components/Input/Input';
import MainButton from '../../components/MainButton/MainButton';

const initialLoginState = {
  email: '',
  password: '',
  repeatPassword: '',
  emailIsWrong: false,
  passwordIsWrong: false,
  repeatPasswordIsWrong: false,
};

function LoginWithRestoredPass() {
  const history = useHistory();

  const [warningMessage, setWarningMessage] = useState('');
  const [login, setLogin] = useState(initialLoginState);

  function handleTextInputChange({ target: { name, value } }) {
    setLogin({ ...login, [name]: value, [`${name}IsWrong`]: false });
    setWarningMessage('');
  }

  function handleRestorePasswordClick() {
    const restoreMailToValdate = (({
      emailIsWrong,
      passwordIsWrong,
      repeatPasswordIsWrong,
      ...rest
    }) => rest)(login);

    Object.entries(restoreMailToValdate).forEach(([key, value]) => {
      if (value === '') {
        setLogin({ ...login, [`${key}IsWrong`]: true });
        setWarningMessage(warningMessages.forgotPassword.REQUIRED_ENTRY);
      }
    });

    if (login.password === login.repeatPassword) {
      const splitEmail = login.email;

      if (splitEmail.includes('@')) {
        setWarningMessage('');
        // enviar les dades al back
        history.replace('/loginWithRestoredPassword');
      } else {
        setWarningMessage(warningMessages.forgotPassword.WRONG_EMAIL);
      }
    } else {
      setWarningMessage(warningMessages.forgotPassword.PASSWORDS_ARE_NOT_THE_SAME);
    }
  }

  function handleKeyUp({ keyCode }) {
    if (keyCode === 13) {
      handleRestorePasswordClick();
    }
  }

  return (
    <AppWrapper title="Recover your password!">
      <section className="login-container">
        <h3 className="app__title">
          Enter your email twice to send you a new password
        </h3>
        <form className="login__form">
          <div className="form__input form__login">
            <Input
              type="text"
              name="email"
              placeholder="e-mail"
              value={login.email}
              onChange={handleTextInputChange}
              isIncorrect={login.emailIsWrong}
            />
          </div>
          <div className="form__input form__login">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={login.password}
              onChange={handleTextInputChange}
              isIncorrect={login.passwordIsWrong}
            />
          </div>
          <div className="form__input form__login">
            <Input
              type="password"
              name="repeatPassword"
              placeholder="Repeat password"
              value={login.repeatPassword}
              onChange={handleTextInputChange}
              isIncorrect={login.repeatPasswordIsWrong}
              onKeyUp={handleKeyUp}
            />
          </div>
          <small className="form__warningMessage">{warningMessage}</small>
        </form>
        <div className="form__button">
          <MainButton onClick={handleRestorePasswordClick}>Restore password</MainButton>
        </div>

      </section>
    </AppWrapper>

  );
}

export default LoginWithRestoredPass;
