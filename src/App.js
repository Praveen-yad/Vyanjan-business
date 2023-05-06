
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home, Items, Login } from './Pages'
import { Provider } from 'react-redux';
import store from './store/store';
import ExpandingDiv from './Pages/Expand';

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Login/>} path={'/'} />
        <Route element={<Home/>} path={'/orders'} />
        <Route element={<Items/>} path={'/items'} />
        <Route element={<ExpandingDiv/>} path={'/e'} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
