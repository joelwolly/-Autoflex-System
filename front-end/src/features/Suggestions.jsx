import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuggestions } from './suggestionSlice';



function Suggestions() {

    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.suggestions);

    useEffect(() => {
    dispatch(fetchSuggestions());
  }, [dispatch]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };


  return (
    <div>
      <h2> Projeção de Produção (Inteligência)</h2>
      <p style={{ marginBottom: '20px', color: '#555' }}>
        O sistema analisa o estoque atual e sugere a produção máxima possível, priorizando os produtos de maior valor agregado.
      </p>

      {status === 'loading' && <p>Calculando projeções...</p>}
      {status === 'failed' && <p style={{ color: 'red' }}>Erro ao carregar sugestões: {error}</p>}

      {status === 'succeeded' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3>Sugestão de Fabricação</h3>
            <h3 style={{ color: '#27ae60', margin: 0 }}>
              Faturamento Projetado: {formatCurrency(data.grandTotal)}
            </h3>
          </div>

          {data.suggestions.length === 0 ? (
            <div className="empty-state">Estoque insuficiente para produzir qualquer item da ficha técnica.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Produto</th>
                  <th>Quantidade Sugerida</th>
                  <th>Preço Unitário</th>
                  <th>Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {data.suggestions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productCode}</td>
                    <td><strong>{item.productName}</strong></td>
                    <td style={{ color: '#2980b9', fontWeight: 'bold' }}>{item.quantity} un</td>
                    <td>{formatCurrency(item.unitPrice)}</td>
                    <td style={{ fontWeight: 'bold' }}>{formatCurrency(item.totalValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}


export default Suggestions;