import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getExchangeRates } from '../api';

const Container = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ccc;
  text-align: center;
`;

const RateList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RateItem = styled.li`
  margin: 5px 0;
  font-weight: bold;
`;

function ExchangeRates({ baseCurrency }) {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    async function fetchRates() {
      const data = await getExchangeRates(baseCurrency);
      setRates(data);
    }
    fetchRates();
  }, [baseCurrency]);

  return (
    <Container>
      <h2>Курсы валют относительно {baseCurrency}</h2>
      {rates ? (
        <RateList>
          {Object.entries(rates).map(([currency, rate]) => (
            <RateItem key={currency}>
              1 {baseCurrency} = {rate} {currency}
            </RateItem>
          ))}
        </RateList>
      ) : (
        <p>Загрузка...</p>
      )}
    </Container>
  );
}

export default ExchangeRates;
