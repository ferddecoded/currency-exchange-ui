import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import AppWrapper from '../layout/AppWrapper';
import { H1, H3, H4 } from '../components/typography/Heading';
import { Icon } from '../components/typography/Icon';
import { TextInput } from '../components/form/TextInput';
import { Box } from '../components/box/Box';

const HeadingContainer = styled.div`
  box-shadow: ${({ theme }) => theme.mediumBS};
  background-color: ${({ theme }) => theme.darkPurple};
  height: 100%;
  border-radius: 5px;
  padding: 24px 0px;
`;

const InputContainer = styled.div`
  margin: 24px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CustomSelect = styled.div`
  width: 300px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.lightgrey};
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 0px ${({ theme }) => theme.lightgrey};
  transition: ${({ theme }) => theme.defaultTransition};
  background-color: ${({ theme }) => theme.darkPurple};
  &:hover {
    box-shadow: 0 0 5px ${({ theme }) => theme.lightgrey};
  }
  .custom-select-value {
    font-family: helvetica;
    font-size: 20px;
    line-height: 40px;
    color: ${({ theme }) => theme.lightgrey};
    box-sizing: border-box;
    padding: 0 10px;
  }
  select {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    display: block;
    border: 1px solid ${({ theme }) => theme.lightgrey};
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectedContainer = styled.div`
  background-color: ${({ theme }) => theme.darkPurple};
  height: 350px;
  border-radius: 5px;
  border: 5px solid ${({ theme }) => theme.primaryNavy};
  padding: 16px 0px;
`;

const ConvertAmountContainer = styled(Box)`
  flex-basis: 50%;
`;

const LabelContainer = styled(Box)`
  flex-basis: 50%;
`;

const Dashboard: React.FC<Props> = (): JSX.Element => {
  const [currencyPick, setCurrencyPick] = useState('CAD');
  const [currencies, setCurrencies] = useState([]);
  const [convertAmount, setConverAmount] = useState(0);

  useEffect(() => {
    const fetchedCurrencies = [
      { value: 'EUR', label: 'Euro' },
      { value: 'CAD', label: 'Canaddian' },
    ];
    setCurrencies(fetchedCurrencies);
  }, []);

  const onCurrencyChange = ({ target }) => {
    setCurrencyPick(target.value);
  };

  const renderOptions = (options) => {
    if (!options.length) {
      return null;
    }
    return options.map((currency) => (
      <option key={currency.value} value={currency.value}>
        {currency.label}
      </option>
    ));
  };

  return (
    <AppWrapper>
      <HeadingContainer>
        <H1>Currencies</H1>
      </HeadingContainer>
      <InputContainer>
        <H3>Select Your Currency</H3>
        <CustomSelect>
          <FlexContainer>
            <div className="custom-select-value">
              {currencyPick || 'Select Currency'}
            </div>
            <Icon className="fas fa-angle-down" fontSize="20px" />
          </FlexContainer>
          <select
            value={currencyPick}
            name="currency-picker"
            id="currency-picker"
            onChange={onCurrencyChange}
          >
            {renderOptions(currencies)}
          </select>
        </CustomSelect>
      </InputContainer>
      <SelectedContainer>
        <FlexContainer>
          <LabelContainer>
            <H4>Enter Amount</H4>
          </LabelContainer>
          <ConvertAmountContainer>
            <TextInput
              type="number"
              id="convertAmount"
              value={convertAmount}
              onChange={(e) => setConverAmount(e.target.value)}
            />
          </ConvertAmountContainer>
        </FlexContainer>
      </SelectedContainer>
    </AppWrapper>
  );
};

interface Props {}

export default Dashboard;
