import './App.css';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import Landing_Page from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";
import HeaderNav from "./components/HeaderNav.jsx";
import PokemonCreate from "./components/Create.jsx";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
      
        <Switch>
          <Route exact path='/' component={Landing_Page} />
          <>
          <HeaderNav onSearch=""/>
          <Route exact path='/Home' component={Home} />
          <Route exact path="/home/:id" component={Detail}/>
          <Route  path='/create' component={PokemonCreate} />
          </>

        </Switch>      
      </div>
      </BrowserRouter>
  );
}

export default App;
