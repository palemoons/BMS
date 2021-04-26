import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './Pages/Landing';
import SignIn from './Pages/SignIn';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
        <Route render={() => <Redirect to="/"/>}/>
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
