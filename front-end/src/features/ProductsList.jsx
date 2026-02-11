import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './productsSlice';
import ProductForm from './ProductForm';

function ProductsList() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div className="page">
      <h2>🏭 Linha de Produção</h2>

      <ProductForm />

      <div className="card">
        <h3>Produtos Fabricados</h3>

        {products.length === 0 ? (
          <div className="empty-state">
            Nenhum produto cadastrado.
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>SKU</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td><strong>{p.code}</strong></td>
                  <td style={{ color: '#27ae60', fontWeight: 'bold' }}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(p.price)}
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

export default ProductsList;
