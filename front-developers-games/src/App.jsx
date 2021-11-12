import './App.scss';

import { Route, Switch } from 'react-router-dom';

import ChallengeDetail from './views/ChallengeDetail/ChallengeDetail';
// Views
import ChallengesPageContainer from './views/ChallengesPageContainer/ChallengesPageContainer';
import EditProfile from './views/EditProfile/EditProfile';
// import FinishedRegistration from './views/FinishedRegistration/FinishedRegistration';
import Footer from './components/Footer/Footer';
import HandsOnWorkshops from './views/HandsOnWorkshops/HandsOnWorkshops';
import Header from './components/Header/Header';
// Components
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import ParticipantGuide from './views/ParticipantGuide/ParticipantGuide';
import Prizes from './views/Prizes/Prizes';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import React from 'react';
import RedirectComponent from './components/RedirectComponent/RedirectComponent';
import Register from './views/Register/Register';
import RestorePasswordByMail from './views/RestorePasswordByMail/RestorePasswordByMail';
import SuperProtectedRoute from './components/SuperProtectedRoute/SuperProtectedRoute';
import Teams from './views/Teams/Teams';
import TermsAndConditions from './views/TermsAndConditions/TermsAndConditions';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/stc" exact>
          <Register />
          {/* <FinishedRegistration /> */}
        </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/terms" component={TermsAndConditions} />
        <Route path="/participantsGuide" component={ParticipantGuide} />
        <Route path="/prizes" component={Prizes} />
        <Route path="/restorePasswordByMail" component={RestorePasswordByMail} />
        <ProtectedRoute path="/stc/challenges" exact component={ChallengesPageContainer} />
        <ProtectedRoute path="/stc/challenges/:challengeId" component={ChallengeDetail} />
        <ProtectedRoute path="/handsOnWorkshops" component={HandsOnWorkshops} />
        <ProtectedRoute path="/profile" component={EditProfile} />
        <SuperProtectedRoute path="/stc/teams" component={Teams} />
        <Route component={RedirectComponent} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
