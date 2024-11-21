import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRates from './components/ExchangeRates';
import Settings from './components/Settings';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Конвертер</Link> | <Link to="/rates">Курсы валют</Link> | <Link to="/settings">Настройки</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CurrencyConverter baseCurrency={baseCurrency} />} />
          <Route path="/rates" element={<ExchangeRates baseCurrency={baseCurrency} />} />
          <Route path="/settings" element={<Settings setBaseCurrency={setBaseCurrency} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;