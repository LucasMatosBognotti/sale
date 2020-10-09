import React, { useCallback, useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { formatPrice } from '../../util/format';

import api from '../../services/api';

function Form() {
  const [product, setProduct] = useState('');
  const [value, setValue] = useState('');
  const [lists, setList] = useState(['']);

  const handleCreate = useCallback(async (e) => {
    e.preventDefault();

    await api.post('sale', {
      product,
      value
    })
    .then((response) => {
      const formatDate = format(parseISO(response.data.date), 'dd/MM/yyyy');
      const priceFormatted = formatPrice(response.data.value);
      setList([...lists, Object.assign({ formatDate }, {priceFormatted}, response.data)])
    })
    .catch(() => { alert('Erro no cadastro') })
  }, [product, value, lists]);

  const handleRemove = useCallback(async (id) => {
    await api.delete(`/sale/${id}`);
    setList(lists.filter(list => list._id !== id));
  }, [lists]);

  const handleUpdate = useCallback(async (item) => {
    const response = await api.put(`/sale/${item._id}`, {
      done: item.done === true ? false : true
    });

    const formatDate = format(parseISO(response.data.date), 'dd/MM/yyyy');
    const priceFormatted = formatPrice(response.data.value);

    lists[lists.findIndex(list => list._id === item._id)] = Object.assign({ formatDate }, {priceFormatted}, response.data);

    setList(lists.map(list => list));
  }, [lists]);

  useEffect(() => {
    api.get('sales').then((response) => {
      const data = response.data.map(list => ({
        ...list,
        formatDate: format(parseISO(list.date), 'dd/MM/yyyy'),
        priceFormatted: formatPrice(list.value),
      }));
      setList(data);
    })
  }, []);

  return (
    <>
      <form onSubmit={handleCreate}>
      <div className="form">
        <div className="form-group">
          <label htmlFor="product">Produto</label>
          <input
            className="form-control"
            type="text"
            value={product}
            onChange={(e) => { setProduct(e.target.value)} }
          />
        </div>

        <div className="form-group">
          <label htmlFor="value">Valor</label>
          <input
            className="form-control"
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>
      
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Cadastrar
          </button>
        </div>
      </div>
    </form>

    <div className="table-responsive">
      Lista de Produtos
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Produto</th>
            <th scope="col">Valor</th>
            <th scope="col">Criada em</th>
            <th scope="col">Remove</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {lists.map(list => (
            <tr key={list._id}>
              <td>{list._id}</td>
              <td>{list.product}</td>
              <td>{list.priceFormatted}</td>
              <td>{list.formatDate}</td>
              <td>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleRemove(list._id)}
                >
                  Remove
                </button>
              </td>
              <td>
                <button
                  style={list.done ? { display: 'none' } : null}
                  className="btn btn-warning"
                  type="button"
                  onClick={() => handleUpdate(list)}
                >
                  Marcar como feita
                </button>

                <button
                  style={!list.done ? { display: 'none' } : null}
                  className="btn btn-success"
                  type="button"
                  onClick={() => handleUpdate(list)}
                >
                  Marcar como desfeita
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Form;
