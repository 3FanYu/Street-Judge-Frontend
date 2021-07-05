import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import CreateEvent2 from "./pages/CreateEvent/CreateEvent2";
import Grading from "./pages/Grading/Grading";
import Settlement from "./pages/Settlement/Settlement";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/createEvent" exact component={CreateEvent} />
            <Route path="/createEvent2" exact component={CreateEvent2} />
            <Route path="/gradingPage/:judgeID" exact component={Grading} />
            <Route path="/settlePage/:eventID" exaxt component={Settlement} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
