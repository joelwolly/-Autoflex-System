import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMaterials } from './materialsSlice';
import MaterialForm from './MaterialForm';

function MaterialsList() {
  const dispatch = useDispatch();

  const materials = useSelector((state) => state.materials.items);
  const status = useSelector((state) => state.materials.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMaterials());
    }
  }, [status, dispatch]);

  return (
    <div className="page">
      <h2>📦 Estoque de Matéria-Prima</h2>

      <MaterialForm />

      <div className="card">
        <h3>Materiais em Estoque</h3>

        {materials.length === 0 ? (
          <div className="empty-state">
            Nenhum material cadastrado.
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>SKU</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td><strong>{item.sku}</strong></td>
                  <td style={{ fontWeight: 'bold' }}>
                    {item.stockQuantity} un
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

export default MaterialsList;
