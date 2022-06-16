import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './views/Home';
import Detail from './views/Detail';
import FormCreationProduct from './views/FormCreationProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Home/>}/>
          <Route path='/products/:id' element={<Detail/>}/>
          <Route path='/crear-producto' element={<FormCreationProduct />} />
          <Route path='/editar-producto/:id' element={<FormCreationProduct />} />
          <Route path='/eliminar-producto/:id' element={<FormCreationProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
