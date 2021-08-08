import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import welcomeScreen from "./Components/welcomeScreen/welcomeScreen";
import loginScreen from "./Components/loginScreen/loginScreen";
import registerScreen from "./Components/registerScreen/registerScreen";
import projectsScreen from "./Components/projectsScreen/projectsScreen";
import pageError from "./Components/pageError/pageError";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
          <Route path="/" exact={true} component={welcomeScreen} />
          <Route path="/Login" component={loginScreen} />
          <Route path="/Register" component={registerScreen} />
          <Route path="/Projects" component={projectsScreen} />
          <Route component= {pageError} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
