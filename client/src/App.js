import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import {Switch , Route} from 'react-router-dom'
import './App.css';
import LandingPage from './components/landingPage/LandingPage';

function App() {
  return (
   <>
   <Switch>
    <Route exact path='/landingPage'>
      <LandingPage></LandingPage>
    </Route>
   <Route exact path='/signup'>
      <Signup></Signup>
    </Route>
    <Route exact path='/'>
    <Login></Login>
    </Route>
   </Switch>
   
   </>
  );
}

export default App;
