import './App.css';
import Layout from './components/Layout';
import { Route } from 'react-router';

import Counter from './Pages/Counter/Counter';
import Home from './Pages/Home';
import Player from './Pages/Players/Player';


export default () => {
  return (
      <Layout>
        <Route exact path="/" component={Home}/>
        <Route path="/counter" component={Counter}/>
        <Route path="/player/:startIndex?" component={Player}/>
      </Layout>
  );
}