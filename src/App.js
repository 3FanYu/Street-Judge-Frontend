import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import CreateEvent2 from "./pages/CreateEvent/CreateEvent2";
import Grading from "./pages/Grading/Grading";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/createEvent" exact component={CreateEvent} />
            <Route path="/createEvent2" exact component={CreateEvent2} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
