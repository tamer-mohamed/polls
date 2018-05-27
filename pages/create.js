import React from 'react';
import Layout from '../components/layout';
import CreateForm from '../components/questions/create';

/**
 * Create question form
 */
export default function CreateQuestion() {
  return (
    <Layout title="Create a new question">
      <CreateForm />
    </Layout>
  );
}
