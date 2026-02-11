import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './productsSlice'; 
import { fetchProductionOrders, produceItem, clearMessages } from './productionSlice';
import { fetchMaterials } from './materialsSlice'; 

function Production() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);
  const { items: orders, error, successMsg } = useSelector((state) => state.production);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductionOrders());
  }, [dispatch]);

  useEffect(() => {
    return () => dispatch(clearMessages());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    dispatch(produceItem({
      productId: Number(selectedProduct),
      quantity: parseInt(quantity)
    })).then((result) => {
        if (!result.error) {
            dispatch(fetchMaterials()); 
            setQuantity('');
            setSelectedProduct('');
        }
    });
  };

  return (
    <div className="production-container">
      <h2> Chão de Fábrica (Produzir)</h2>
      <p style={{ marginBottom: '20px', color: '#555' }}>
        Inicie a produção de um item. O sistema dará baixa automática nas matérias-primas utilizadas.
      </p>

      {error && (
        <div style={{ padding: '10px', background: '#ffeaa7', color: '#d35400', borderRadius: '5px', marginBottom: '15px', fontWeight: 'bold' }}>
           {error}
        </div>
      )}
      
      {successMsg && (
        <div style={{ padding: '10px', background: '#55efc4', color: '#00b894', borderRadius: '5px', marginBottom: '15px', fontWeight: 'bold' }}>
           {successMsg}
        </div>
      )}

      <div className="card">
        <h3>Nova Ordem de Produção</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ flex: 2 }}>
            <label>O que vamos fabricar?</label>
            <select 
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }}
            >
              <option value="">Selecione um Produto...</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantidade:</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ex: 10"
              min="1"
              required 
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }}
            />
          </div>

          <button type="submit" style={{ backgroundColor: '#27ae60', color: 'white', padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
             Iniciar Produção
          </button>
        </form>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h3>Histórico de Produção</h3>
        {orders.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
            Nenhuma produção registrada.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '10px' }}>ID da Ordem</th>
                <th style={{ padding: '10px' }}>Produto</th>
                <th style={{ padding: '10px' }}>Qtd Fabricada</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>#{order.id}</td>
                  
                                  <td style={{ padding: '10px' }}>
                    <strong>{order.product?.name || 'Carregando...'}</strong>
                  </td>
                  
                  <td style={{ padding: '10px', fontWeight: 'bold', color: '#2980b9' }}>
                    {order.quantity} un
                  </td>
                  
                  <td style={{ padding: '10px' }}>
                    <span style={{ background: '#2ecc71', color: 'white', padding: '3px 8px', borderRadius: '12px', fontSize: '0.8em' }}>
                      CONCLUÍDO
                    </span>
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

export default Production;