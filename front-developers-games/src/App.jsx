import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

// Views
import ChallengesPageContainer from './views/ChallengesPageContainer/ChallengesPageContainer';
import ChallengeDetail from './views/ChallengeDetail/ChallengeDetail';
import Teams from './views/Teams/Teams';
import TermsAndConditions from './views/TermsAndConditions/TermsAndConditions';
// import Register from './views/Register/Register';
import FinishedRegistration from './views/FinishedRegistration/FinishedRegistration';
import Login from './views/Login/Login';
import EditProfile from './views/EditProfile/EditProfile';
import ParticipantGuide from './views/ParticipantGuide/ParticipantGuide';
import HandsOnWorkshops from './views/HandsOnWorkshops/HandsOnWorkshops';

// Components
import Home from './views/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SuperProtectedRoute from './components/SuperProtectedRoute/SuperProtectedRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RedirectComponent from './components/RedirectComponent/RedirectComponent';
import Prizes from './views/Prizes/Prizes';
import RestorePasswordByMail from './views/RestorePasswordByMail/RestorePasswordByMail';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/santander" exact>
          {/* <Register /> */}
          <FinishedRegistration />
        </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/terms" component={TermsAndConditions} />
        <Route path="/participantsGuide" component={ParticipantGuide} />
        <Route path="/prizes" component={Prizes} />
        <Route path="/restorePasswordByMail" component={RestorePasswordByMail} />
        <ProtectedRoute path="/santander/challenges" exact component={ChallengesPageContainer} />
        <ProtectedRoute path="/santander/challenges/:challengeId" component={ChallengeDetail} />
        <ProtectedRoute path="/handsOnWorkshops" component={HandsOnWorkshops} />
        <ProtectedRoute path="/profile" component={EditProfile} />
        <SuperProtectedRoute path="/santander/teams" component={Teams} />
        <Route component={RedirectComponent} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
