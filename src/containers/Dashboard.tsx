/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchCurrencies,
  getDataCurrencies,
  fetchNews,
  fetchRates,
} from '../store/dataSlice';

import AppWrapper from '../layout/AppWrapper';
import { H1, H2, H3, H4, H5, H6 } from '../components/typography/Heading';
import { TextInput } from '../components/form/TextInput';
import { Box } from '../components/box/Box';
import { Image } from '../components/image/Image';
import { Grid } from '../components/grid/Grid';
import { Copy } from '../components/typography/Copy';
import Loading from '../layout/Loading';
import { Button } from '../components/button/Button';
import { CurrencyModel } from '../models/CurrencyModel';
import Select from '../components/form/Select';
import Modal from '../components/modal/Modal';
import { Icon } from '../components/typography/Icon';

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

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectedContainer = styled.div`
  background-color: ${({ theme }) => theme.darkPurple};
  min-height: 350px;
  border-radius: 5px;
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
  max-height: 500px;
  overflow: scroll;
`;

const NewsContainer = styled(Box)`
  background-color: ${({ theme }) => theme.primaryNavy};
  margin: 16px 32px;
  width: calc(100% - 64px);
  border-radius: 5px;
  padding: 16px;
  transition: all 0.4s;
  box-shadow: 0 0 0px #e1e1e1;

  &:hover {
    box-shadow: 0 0 5px #e1e1e1;
  }
`;

const NewsCopy = styled(Copy)`
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.lightgrey};
`;

const StyledGrid = styled(Grid)``;

const CurrencyList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CurrencyItem = styled.li`
  padding: 24px 0px;
  border-top: 1px solid ${({ theme }) => theme.darkGrey};
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }

  ${({ isAdded }) =>
    isAdded &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
    `}
`;

const RemoveCurrencyButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

const ModalImage = styled.div`
  flex-basis: 48px;
  height: 32px;
  display: flex;
  align-items: center;
`;

const CurrencyItemContainer = styled(FlexContainer)`
  margin: 24px auto;
  width: 100%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.darkPurple};
  border-radius: 5px;
  padding: 48px 16px 24px;
  align-items: flex-start;
  position: relative;

  button {
    margin: 0;
    min-width: auto;
    padding: 8px;
  }
`;

const FlagContainer = styled(Box)`
  flex-basis: 33.33%;
  max-width: 100px;
`;

const CurrencyInfoContainer = styled(FlexContainer)`
  flex-grow: 2;
  align-items: flex-start;
`;

const Symbol = styled(Box)`
  flex-basis: 10%;
  margin: 0px 16px;

  p {
    font-size: 22px;
    font-weight: 700;
  }
`;

const InfoContainer = styled(FlexContainer)`
  flex-grow: 2;
  flex-direction: column;
  align-items: flex-start;

  div {
    padding: 0;
  }
`;

const Dashboard: React.FC<Props> = (): JSX.Element => {
  const [currencies, setCurrencies] = useState<CurrencyModel[] | null>(null);
  const [userCurrencies, setUserCurrencies] = useState<CurrencyModel[]>([]);
  const [convertAmount, setConvertAmount] = useState<number>(0);
  const [currencyPick, setCurrencyPick] = useState<CurrencyModel | null>(null);
  const [showHeadlines, setShowHeadlines] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const onCurrencyChange = ({ target }) => {
    setCurrencyPick(currencies.find((curr) => curr.value === target.value));
  };

  const onAddUserCurrenciesChange = (currencyItem) => {
    const userCurrencyExists =
      userCurrencies.filter(
        (currency) => currency.abbreviation === currencyItem.abbreviation
      ).length > 0;
    if (!userCurrencyExists) {
      setUserCurrencies([...userCurrencies, currencyItem]);
    }
  };

  const onADeleteUserCurrenciesChange = (currencyItem) => {
    setUserCurrencies(
      userCurrencies.filter(
        (currency) => currency.abbreviation !== currencyItem.abbreviation
      )
    );
  };

  const onConvertAmountChange = (value) => {
    setConvertAmount(value);
  };

  const renderNews = (headlines) => {
    return headlines.map((headline, index) => {
      return (
        <a
          href={headline.url}
          aria-label="link to news article"
          key={index.toString()}
        >
          <NewsContainer>
            <H5 color="#2d2d37">{headline?.name}</H5>
            <NewsCopy>{headline?.description}</NewsCopy>
          </NewsContainer>
        </a>
      );
    });
  };

  const { currencies: stateCurrencies, isFetching, news, rates } = useSelector(
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

  useEffect(() => {
    if (currencyPick?.abbreviation) {
      const { abbreviation } = currencyPick;
      dispatch(fetchRates(abbreviation));
      dispatch(fetchNews(abbreviation));
    }
  }, [currencyPick?.abbreviation]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <>
      <AppWrapper>
        <Grid>
          <HeadingContainer>
            <H1>Currencies</H1>
          </HeadingContainer>
          <InputContainer>
            <H3>Select Your Currency</H3>
            <Select
              selectItem={currencyPick}
              options={currencies}
              onChange={onCurrencyChange}
            />
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
                      onChange={(e) => onConvertAmountChange(e.target.value)}
                      placeholder="0.0000"
                    />
                  </ConvertAmountContainer>
                </FlexContainer>
                <H2>Recent Headlines</H2>
                <StyledGrid>
                  {showHeadlines
                    ? news?.length
                      ? renderNews(news)
                      : 'No headlines at the moment.'
                    : null}
                </StyledGrid>
                <Button
                  primary
                  onClick={() => setShowHeadlines(!showHeadlines)}
                >
                  {showHeadlines ? 'Hide Headlines' : 'Show Headlines'}
                </Button>
              </>
            )}
          </SelectedContainer>
          <UserCurrenciesContainer>
            {userCurrencies.length
              ? userCurrencies.map((currency) => {
                  if (currency.abbreviation !== currencyPick.abbreviation) {
                    return (
                      <CurrencyItemContainer key={currency.abbreviation}>
                        <RemoveCurrencyButton
                          onClick={() =>
                            onADeleteUserCurrenciesChange(currency)
                          }
                        >
                          <Icon className="fas fa-times" fontSize="20px" />
                        </RemoveCurrencyButton>
                        <FlagContainer>
                          <Image src={currency?.flagURL} alt={currency.name} />
                        </FlagContainer>
                        <CurrencyInfoContainer>
                          <Symbol>
                            <Copy large>{currency.symbol}</Copy>
                          </Symbol>
                          <InfoContainer>
                            <TextInput
                              type="number"
                              id={`convertAmount_${currency.abbreviation}`}
                              value={
                                convertAmount *
                                rates.rates[currency.abbreviation]
                              }
                              disabled
                              onChange={() => null}
                              placeholder="0.0000"
                            />
                            <H5>{`${currency.abbreviation} - ${currency.name}`}</H5>
                            <H6>
                              1 {currencyPick.abbreviation} ={' '}
                              {rates?.rates[currency.abbreviation]
                                ? rates.rates[currency.abbreviation].toFixed(4)
                                : 0}{' '}
                              {currency.abbreviation}
                            </H6>
                          </InfoContainer>
                        </CurrencyInfoContainer>
                      </CurrencyItemContainer>
                    );
                  }
                })
              : null}
          </UserCurrenciesContainer>
          <Button primary onClick={() => setShowModal(true)}>
            Add Currency
          </Button>
        </Grid>
      </AppWrapper>
      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <CurrencyList>
            {currencies.map((currency) => (
              <CurrencyItem
                onClick={() => onAddUserCurrenciesChange(currency)}
                key={currency.abbreviation}
                isAdded={userCurrencies.some(
                  (userCurrency) =>
                    userCurrency.abbreviation === currency.abbreviation
                )}
              >
                <FlexContainer>
                  <ModalImage>
                    <Image src={currency.flagURL} alt={currency.abbreviation} />
                  </ModalImage>
                  <Box>
                    <Copy>{currency.name}</Copy>
                  </Box>
                </FlexContainer>
              </CurrencyItem>
            ))}
          </CurrencyList>
        </Modal>
      )}
    </>
  );
};

interface Props {}

export default Dashboard;
