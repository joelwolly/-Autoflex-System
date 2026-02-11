import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMaterials } from './materialsSlice';
import { fetchProducts } from './productsSlice'; 
import { fetchCompositions, addComposition } from './compositionSlice';

function Engineering() {
  const dispatch = useDispatch();

  const materials = useSelector((state) => state.materials.items);
  const products = useSelector((state) => state.products.items);
  const compositions = useSelector((state) => state.composition.items);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState('');


  useEffect(() => {
    dispatch(fetchMaterials());
    dispatch(fetchProducts());
    dispatch(fetchCompositions());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedProduct || !selectedMaterial || !quantity) return;

    dispatch(addComposition({
      productId: selectedProduct,
      materialId: selectedMaterial,
      quantity: parseFloat(quantity)
    }));

    setQuantity('');
  };

  return (
    <div>
      <h2> Engenharia de Produto (Ficha Técnica)</h2>

      <div className="card">
        <h3>Definir Composição</h3>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group" style={{ flex: 2 }}>
            <label>Produto Final:</label>
            <select 
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
            >
              <option value="">Selecione um Produto...</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ flex: 2 }}>
            <label>Matéria-Prima Necessária:</label>
            <select 
              value={selectedMaterial} 
              onChange={(e) => setSelectedMaterial(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
            >
              <option value="">Selecione um Material...</option>
              {materials.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.sku})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Qtd. Necessária:</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              required 
            />
          </div>

          <button type="submit">Vincular</button>
        </form>
      </div>


      <div className="card">
        <h3>Estruturas Definidas</h3>
        {compositions.length === 0 ? (
          <div className="empty-state">Nenhuma ficha técnica criada ainda.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Consome Ingrediente</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {compositions.map((comp) => (
                <tr key={comp.id}>
                  <td>
                    <strong>{comp.product?.name}</strong> <small>({comp.product?.code})</small>
                  </td>
                  <td>
                    {comp.rawMaterial?.name} <small>({comp.rawMaterial?.sku})</small>
                  </td>
                  <td style={{ fontWeight: 'bold', color: '#e67e22' }}>
                    {comp.requiredQuantity} un
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Engineering;