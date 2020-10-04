import React from 'react';
import './css/App.css';
import Body from './components/body';
import Layout from './components/layout/layout'

function App() {
  return (
      <div className="App">
        <Layout>
          <Body/>
        </Layout>
      </div>
  );
}

export default App;
