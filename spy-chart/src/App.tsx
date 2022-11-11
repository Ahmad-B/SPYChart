import React from 'react';
import './App.css';
import {  QueryClientProvider, QueryClient } from 'react-query'
import Main from './containers/Main';

const queryClient = new QueryClient();

function App() {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Main/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
