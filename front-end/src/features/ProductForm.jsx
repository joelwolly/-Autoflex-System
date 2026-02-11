import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from './productsSlice';

function ProductForm() {
  const dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name: name,
      code: code,
      price: parseFloat(price)
    };

    dispatch(addProduct(newProduct));

    setName('');
    setCode('');
    setPrice('');
  };

  return (
    <div className="card">
      <h3>➕ Novo Produto</h3>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Nome do Produto:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Ex: Cadeira de Escritório"
            required 
          />
        </div>

        <div className="form-group">
          <label>Código (SKU):</label>
          <input 
            type="text" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            placeholder="PROD-001"
            required 
            style={{ width: '120px' }}
          />
        </div>

        <div className="form-group">
          <label>Preço de Venda (R$):</label>
          <input 
            type="number" 
            step="0.01" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="0.00"
            required 
            style={{ width: '100px' }}
          />
        </div>

        <button type="submit">Cadastrar Produto</button>

      </form>
    </div>
  );
}

export default ProductForm;