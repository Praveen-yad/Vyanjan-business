
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home, Login } from './Pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login/>} path={'/'} />
        <Route element={<Home/>} path={'/orders'} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
