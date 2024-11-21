import React, { useState } from 'react';

function Settings({ setBaseCurrency }) {
  const [currency, setCurrency] = useState('');

  const handleSave = () => {
    setBaseCurrency(currency.toUpperCase());
  };

  return (
    <div>
      <h2>Настройки</h2>
      <input
        type="text"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        placeholder="Введите базовую валюту, например USD"
      />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}

export default Settings;
