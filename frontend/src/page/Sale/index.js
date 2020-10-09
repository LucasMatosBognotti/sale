import React from 'react';

import Form from '../../components/Form';
import PageHeader from '../../components/PageHeader';
import Title from '../../components/Title';

function Sale() {
  return (
    <div className="container">
      <PageHeader />
      <Title title="Tarefa" subtitle="Cadastro" />
      <Form />
    </div>
  );
}

export default Sale;
