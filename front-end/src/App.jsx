import { Routes, Route, Link } from 'react-router-dom';
import MaterialsList from './features/MaterialsList';
import ProductsList from './features/ProductsList';
import Engineering from './features/Engineering';
import Production from './features/Production';
import Suggestions from './features/Suggestions';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <nav>
        <h1> Autoflex System</h1>
        <div>
          <Link to="/">Matérias-Primas</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/engenharia">Engenharia</Link>
          <Link to="/producao">Produzir</Link>
          <Link to="/sugestoes" style={{  color: '#fff' }}> Sugestões</Link> 
        </div>
      </nav>

      <div className="content-area">
        <Routes>
          <Route path="/" element={<MaterialsList />} />
          <Route path="/produtos" element={<ProductsList />} />
          <Route path="/engenharia" element={<Engineering />} />
          <Route path="/producao" element={<Production />} />
          <Route path="/sugestoes" element={<Suggestions />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
