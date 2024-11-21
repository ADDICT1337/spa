import React, { useState } from 'react';
import styled from 'styled-components';
import { convertCurrency } from '../api';

const Container = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  background-color: #f9f9f9;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  width: 80%;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Result = styled.p`
  margin-top: 20px;
  font-weight: bold;
`;

function CurrencyConverter({ baseCurrency }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleConvert = async () => {
    const match = input.match(/(\d+)\s([A-Za-z]{3})\sin\s([A-Za-z]{3})/);
    if (match) {
      const [, amount, fromCurrency, toCurrency] = match;
      const convertedAmount = await convertCurrency(Number(amount), fromCurrency, toCurrency);
      setResult(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
    } else {
      alert('Введите данные в формате: "15 USD in RUB"');
    }
  };

  return (
    <Container>
      <h2>Конвертер валют</h2>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="15 USD in RUB"
      />
      <Button onClick={handleConvert}>Конвертировать</Button>
      {result && <Result>Результат: {result}</Result>}
    </Container>
  );
}

export default CurrencyConverter;
