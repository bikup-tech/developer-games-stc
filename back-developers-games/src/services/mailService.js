/* eslint-disable no-param-reassign */
const nodemailer = require('nodemailer');

// Utils
const CustomError = require('../utils/CustomError');

// Constants
const { BAD_REQUEST } = require('../constants/statusCodes');
const { MISSING_PROPERTIES } = require('../constants/responseMessages');
const logTypes = require('../constants/logTypes');
const logStatus = require('../constants/logStatus');

// Services
const logService = require('./logService');

function mailService() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  async function sendRegisteredUser(email, password) {
    try {
      if (!email || !password) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('email or password'));
      }

      if (!email.includes('@') || !email.includes('.')) {
        email += '@safemail.com';
      }

      const logData = {
        fromEmail: process.env.MAIL_USER,
        fromEmailPass: process.env.MAIL_PASSWORD,
        to: email,
      };
      logService.createLog(logTypes.EMAIL_PARTICIPANT, logData, logStatus.SENDING_MAIL);

      const mailOptions = {
        from: `Developer Games <${process.env.MAIL_USER}>`,
        to: email,
        subject: 'Thank you for registering your team to the Developer Games',
        html: `
      <div style="width: 600px;">
        <img
          src="https://storage.googleapis.com/developer-games-bucket/mail-header.jpg"
          alt="redhat logo"
          style="margin-bottom: 16px"
        />

        <div style="padding: 0 24px; margin-bottom: 36px;">
            <p style="line-height: 1.45; text-align: justify; font-size: 1.1rem; margin-bottom: 24px; color: black;">
                Hello Team!<br><br>
                Game is on! Thanks for registering to the Developer Games.
                Please find below your login details. You will not be able to see the
                challenges until the start date (September, 27 at 08:00 am CEST).<br><br>
                <b>User:</b> ${email}<br>
                <b>Password:</b> ${password}<br><br>
                Don't forget to request your participant's welcome kit!
            </p>
            <button style="background-color: #FF0000; color: white; font-weight: bold; padding: 6px 24px; border-radius: 6px; border: none; font-size: 1.3rem; margin-bottom: 24px;">
               <a href="https://events.redhat.com/profile/395144" style="text-decoration: none; color: white;">Request here your welcome kit</a>   
            </button>
            <p style="line-height: 1.45; text-align: justify; font-size: 1.1rem; margin: 0; color: black; margin-bottom: 16px;">
            <b>Ensure to check the available workshops to help you solve the challenges!</b><br>
            These training sessions are fundamental to win the game! Few seats available:<br>
            <a href="https://www.developergames.io/handsOnWorkshops" style="color: #00ADAF;">https://www.developergames.io/handsOnWorkshops</a>   


        </p>
            <p style="line-height: 1.45; text-align: justify; font-size: 1.1rem; margin: 0; color: black;">
                If you have any problems with login details please contact:<br>
                <a href="mailto:games@developergames.net?Subject=Login%20issue" style="color: #00ADAF">games@developergames.net</a>
            </p>
           
        </div>
        <footer style="width: 100%; background-color: #00ADAF; height: 40px; color: white; font-size: 1.1rem; display:table; text-align: center;">
            <span style="display:table-cell; vertical-align:middle;">Copyright ©2021 Red Hat, Inc</span>
        </footer>
      </div>`,
      };

      return transporter.sendMail(mailOptions);
    } catch (mailError) {
      return null;
    }
  }

  async function sendRegisteredMentor(email, password) {
    try {
      if (!email || !password) {
        throw new CustomError(BAD_REQUEST, MISSING_PROPERTIES('email or password'));
      }

      if (!email.includes('@') || !email.includes('.')) {
        email += '@safemail.com';
      }

      const logData = {
        fromEmail: process.env.MAIL_USER,
        fromEmailPass: process.env.MAIL_PASSWORD,
        to: email,
      };
      logService.createLog(logTypes.EMAIL_MENTOR, logData, logStatus.SENDING_MAIL);

      const mailOptions = {
        from: `Developer Games <${process.env.MAIL_USER}>`,
        to: email,
        subject: 'You are registered as Staff of the Developer Games',
        html: `
        <div style="width: 600px;">
          <img
            src="https://storage.googleapis.com/developer-games-bucket/mail-header.jpg"
            alt="redhat logo"
            style="margin-bottom: 16px"
          />

          <div style="padding: 0 24px; margin-bottom: 36px;">
            <p style="line-height: 1.45; text-align: justify; font-size: 1.1rem; margin-bottom: 24px; color: black;">
              Hi!<br><br>
              You are registered as Staff of the Developer Games.<br>
              Please find below your login details.<br><br>
              <b>User:</b> ${email}<br>
              <b>Password:</b> ${password}
            </p>
            
              <p style="line-height: 1.45; text-align: justify; font-size: 1.1rem; margin: 0; color: black;">
                  If you have any problems with login details please contact:<br>
                  <a href="mailto:games@developergames.net?Subject=Login%20admin%20issue" style="color: #00ADAF">games@developergames.net</a>
              </p>
          </div>
          <footer style="width: 100%; background-color: #00ADAF; height: 40px; color: white; font-size: 1.1rem; display:table; text-align: center;">
            <span style="display:table-cell; vertical-align:middle;">Copyright ©2021 Red Hat, Inc</span>
          </footer>
        </div>
      `,
      };

      return transporter.sendMail(mailOptions);
    } catch (mailError) {
      return null;
    }
  }

  async function sendActivatedTournament(email) {
    try {
      const logData = {
        to: email,
      };
      logService.createLog(logTypes.ACTIVATE_TOURNAMENT, logData, logStatus.SENDING_MAIL);

      const mailOptions = {
        from: `Developer Games <${process.env.MAIL_USER}>`,
        to: email,
        subject: 'Developer games begin.',
        html: `
          <div style="width: 600px;">
        <img
          src="https://storage.googleapis.com/developer-games-bucket/mail-header.jpg"
          alt="redhat logo"
          style="margin-bottom: 16px"
        />
      
        <div style="padding: 0 24px; margin-bottom: 36px;">
          <p style="line-height: 1.50; text-align: left; font-size: 1.1rem; margin-bottom: 24px; color: black;">
            Hello!<br><br>
            Gather your team and check the available challenges NOW!<br><br>
            Access here: <a href="https://developergames.io/login" style="color: #00ADAF;">https://developergames.io/login</a> with your credentials.<br>
            Remember that we sent them to you when you registered, and if you don't remember them you can always reset your password from the login screen.
          </p>
          
          <p style="line-height: 1.5; text-align: left; font-size: 1.1rem; margin: 0; color: black;">
            It’s time to go to your team, login and review each of the available challenges,
            once the challenges are finished, submit the required documentation in each
            of them. <br><br>
            If you have questions about the dynamic of the game check the <a href="https://developergames.io/participantsGuide" style="color: #00ADAF;">Participant Guide</a> or contact the support team: 
            <a href="mailto:DevelopergamesEMEA@redhat.com?Subject=Dynamics-question" style="color: #00ADAF;">DevelopergamesEMEA@redhat.com</a><br><br>
            
            Remember all <b>challenges must be submitted before the 10th of October at 23:59 pm GMT-5.</b><br><br>
            <b>Winners will be announced</b> in the closing ceremony <b>on 14th of October at 16:30 pm CEST.</b><br><br>

            Remember to <a href="https://events.redhat.com/profile/form/index.cfm?PKformID=0x395144abcd" style="color: #00ADAF;" >request your welcome kit</a> if you haven't done that yet!<br><br>

            If you have any problems with login details please contact:<br>
            <a href="mailto:games@developergames.net?Subject=Login-problem" style="color: #00ADAF;">games@developergames.net</a>
          </p>
        </div>
      
        <footer style="width: 100%; background-color: #00ADAF; height: 40px; color: white; font-size: 1.1rem; display:table; text-align: center;">
          <span style="display:table-cell; vertical-align:middle;">Copyright ©2021 Red Hat, Inc</span>
        </footer>
      </div>
      `,
      };

      return transporter.sendMail(mailOptions);
    } catch (mailError) {
      const logData = {
        to: email,
      };
      logService.createLog(logTypes.ACTIVATE_TOURNAMENT, logData, logStatus.ERROR);

      return null;
    }
  }

  async function sendResetPassword(email, password) {
    try {
      const logData = {
        user: email,
      };
      logService.createLog(logTypes.RESET_PASSWORD, logData, logStatus.SUCCESS);

      const mailOptions = {
        from: `Developer Games <${process.env.MAIL_USER}>`,
        to: email,
        subject: 'Reset your Password',
        html: `
      <div style="width: 600px;">
        <img
          src="https://storage.googleapis.com/developer-games-bucket/mail-header.jpg"
          alt="redhat logo"
          style="margin-bottom: 16px"
        />

        <div style="padding: 0 24px; margin-bottom: 36px;">
          <p style="line-height: 1.45; text-align: justify; font-size: 1.1rem; margin-bottom: 24px; color: black;">
            Hi!<br><br>
            Your password was restored successfully!<br>
            Please find below your login details.<br><br>
            <b>User:</b> ${email}<br>
            <b>Password:</b> ${password}
          </p>
          
            <p style="line-height: 1.45; text-align: justify; font-size: 1.1rem; margin: 0; color: black;">
                If you have any problems with login details please contact:<br>
                <a href="mailto:games@developergames.net?Subject=Login%20admin%20issue" style="color: #00ADAF">games@developergames.net</a>
            </p>
        </div>
        <footer style="width: 100%; background-color: #00ADAF; height: 40px; color: white; font-size: 1.1rem; display:table; text-align: center;">
          <span style="display:table-cell; vertical-align:middle;">Copyright ©2021 Red Hat, Inc</span>
        </footer>
      </div>
      `,
      };

      return transporter.sendMail(mailOptions);
    } catch (mailError) {
      return null;
    }
  }

  return {
    sendRegisteredUser, sendRegisteredMentor, sendActivatedTournament, sendResetPassword,
  };
}

module.exports = mailService();
