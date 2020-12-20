import React from 'react';
import { AuthContext } from "./components/Contexts/AuthContext";
import History from "./components/users/History";
import NewInvoice from './components/users/New Invoice/NewInvoice';
import Home from "./components/users/Home";

function App() {
  const { screen } = React.useContext(AuthContext)
  return <Home />
}

export default App;
