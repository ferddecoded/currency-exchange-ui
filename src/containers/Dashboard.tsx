import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCurrencies, getDataCurrencies } from '../store/dataSlice';
import AppWrapper from '../layout/AppWrapper';
import { H1, H3, H4, H5 } from '../components/typography/Heading';
import { Icon } from '../components/typography/Icon';
import { TextInput } from '../components/form/TextInput';
import { Box } from '../components/box/Box';
import { Image } from '../components/image/Image';
import { Grid } from '../components/grid/Grid';
import { Copy } from '../components/typography/Copy';
import Loading from '../layout/Loading';

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
  cursor: pointer;
  width: 280px;
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
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectText = styled(Copy)`
  font-size: 20px;
  line-height: 40px;
  color: ${({ theme }) => theme.lightgrey};
  box-sizing: border-box;
  padding: 0 10px;
`;

const Select = styled('select')`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
  display: block;
  border: 1px solid ${({ theme }) => theme.lightgrey};
`;

const SelectedContainer = styled.div`
  background-color: ${({ theme }) => theme.darkPurple};
  min-height: 350px;
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

const ImageContainer = styled(Box)`
  width: 20%;
  margin: 24px auto;

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const UserCurrenciesContainer = styled(Box)`
  margin: 48px auto;
  background-color: #222;
  width: 100%;
  min-height: 200px;
`;

const NewsContainer = styled(Box)`
  background-color: ${({ theme }) => theme.primaryNavy};
  margin: 16px 32px;
  width: calc(100% - 64px);
  border-radius: 5px;
  padding: 16px;
`;

const Dashboard: React.FC<Props> = (): JSX.Element => {
  const [currencies, setCurrencies] = useState<CurrencyModel[] | null>(null);
  const [convertAmount, setConverAmount] = useState<number>();
  const [currencyPick, setCurrencyPick] = useState<CurrencyModel | null>(null);
  const dispatch = useDispatch();

  const onCurrencyChange = ({ target }) => {
    setCurrencyPick(currencies.find((curr) => curr.value === target.value));
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

  const renderNews = (headlines) => {
    return headlines.map((headline, index) => {
      return (
        <NewsContainer key={index.toString()}>
          <H5>{headline?.title}</H5>
          <Copy>{headline?.description}</Copy>
        </NewsContainer>
      );
    });
  };

  const { currencies: stateCurrencies, isFetching } = useSelector(
    getDataCurrencies
  );

  useEffect(() => {
    if (!currencies) {
      dispatch(fetchCurrencies());
    }
  }, [dispatch, currencies]);

  useEffect(() => {
    if (stateCurrencies.length) {
      setCurrencyPick(stateCurrencies.find((curr) => curr.value === 'CAD'));
      setCurrencies(stateCurrencies);
    }
  }, [stateCurrencies]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <AppWrapper>
      <Grid>
        <HeadingContainer>
          <H1>Currencies</H1>
        </HeadingContainer>
        <InputContainer>
          <H3>Select Your Currency</H3>
          <CustomSelect>
            <FlexContainer>
              <SelectText>
                {currencyPick?.value || 'Select Currency'}
              </SelectText>
              <Icon className="fas fa-angle-down" fontSize="20px" />
            </FlexContainer>
            <Select
              value={currencyPick?.value}
              name="currency-picker"
              id="currency-picker"
              onChange={onCurrencyChange}
            >
              {currencies && currencies.length && renderOptions(currencies)}
            </Select>
          </CustomSelect>
        </InputContainer>
        <SelectedContainer>
          {currencyPick && (
            <>
              <ImageContainer>
                <Image src={currencyPick?.flagURL} alt={currencyPick.name} />
              </ImageContainer>
              <FlexContainer>
                <LabelContainer>
                  <H4>
                    Enter Amount: {currencyPick?.abbreviation}{' '}
                    {currencyPick?.symbol}
                  </H4>
                </LabelContainer>
                <ConvertAmountContainer>
                  <TextInput
                    type="number"
                    id="convertAmount"
                    value={convertAmount}
                    onChange={(e) => setConverAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </ConvertAmountContainer>
              </FlexContainer>
              <H3>Recent Headlines</H3>
              <Grid>
                {currencyPick?.news?.length && renderNews(currencyPick.news)}
              </Grid>
            </>
          )}
        </SelectedContainer>
        <UserCurrenciesContainer>User Currencies</UserCurrenciesContainer>
      </Grid>
    </AppWrapper>
  );
};

interface Props {}

interface CurrencyModel {
  value: string;
  name?: string;
  abbreviation?: string;
  symbol?: string;
  flagURL?: string;
  label?: string;
  news?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [attribute: string]: any;
  }[];
}

export default Dashboard;
