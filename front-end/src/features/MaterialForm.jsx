import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMaterial } from './materialsSlice';

function MaterialForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addMaterial({
      name,
      sku,
      stockQuantity: parseInt(stock)
    }));

    setName('');
    setSku('');
    setStock('');
  };

  return (
    <div className="card">
      <h3> Novo Material</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Material:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Chapa de Aço"
            required
          />
        </div>

        <div className="form-group">
          <label>SKU (Código):</label>
          <input
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="ACO-55"
            required
            style={{ width: '150px' }}
          />
        </div>

        <div className="form-group">
          <label>Quantidade:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            required
            style={{ width: '100px' }}
          />
        </div>

        <button type="submit">Salvar Estoque</button>
      </form>
    </div>
  );
}

export default MaterialForm;
