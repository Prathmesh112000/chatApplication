
import './App.css';
import { Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Chat from "./Pages/Chatpage";
import Signup from "./components/authentication/Signup";

function App() {
  return (
    <div className="App">

   
      <Route path="/" component={Homepage} exact />
      <Route path="/chat" component={Chat} />
       <Route path="/register" component={Signup} />
    
    </div>
  );
}

export default App;
