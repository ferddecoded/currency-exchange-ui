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
import {
  fetchUserCurrencies,
  getUserCurrencies,
  postUserCurrencies,
} from '../store/currencySlice';
import { getUser } from '../store/userSlice';

import AppWrapper from '../layout/AppWrapper';
import Loading from '../layout/Loading';
import { H1, H3 } from '../components/typography/Heading';
import { Box } from '../components/box/Box';
import { Image } from '../components/image/Image';
import { Grid } from '../components/grid/Grid';
import { Copy } from '../components/typography/Copy';
import { Button } from '../components/button/Button';
import { CurrencyModel } from '../models/CurrencyModel';
import Select from '../components/form/Select';
import Modal from '../components/modal/Modal';
import SelectedCurrency from '../components/selectedCurrency/SelectedCurrency';
import UserCurrencies from '../components/userCurrencies/UserCurrencies';

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

const UserCurrenciesContainer = styled(Box)`
  margin: 48px auto;
  background-color: #222;
  width: 100%;
  min-height: 200px;
  max-height: 500px;
  overflow: scroll;
`;

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

const ModalImage = styled.div`
  flex-basis: 48px;
  height: 32px;
  display: flex;
  align-items: center;
`;

const Dashboard: React.FC<Props> = (): JSX.Element => {
  const [currencies, setCurrencies] = useState<CurrencyModel[]>([]);
  const [userCurrencies, setUserCurrencies] = useState<{ currency: string }[]>(
    []
  );
  const [convertAmount, setConvertAmount] = useState<number>(0);
  const [currencyPick, setCurrencyPick] = useState<CurrencyModel | null>(null);
  const [showHeadlines, setShowHeadlines] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const { currencies: stateCurrencies, isFetching, news, rates } = useSelector(
    getDataCurrencies
  );
  const { user } = useSelector(getUser);
  const { currencies: fetchedCurrencies } = useSelector(getUserCurrencies);

  const onCurrencyChange = ({ target }) => {
    setCurrencyPick(currencies.find((curr) => curr.value === target.value));
  };

  const onAddUserCurrenciesChange = (currencyItem) => {
    const userCurrencyExists =
      userCurrencies.filter(
        ({ currency }) => currency === currencyItem.abbreviation
      ).length > 0;
    if (!userCurrencyExists) {
      setUserCurrencies([...userCurrencies, currencyItem]);
      if (user) {
        dispatch(
          postUserCurrencies({ currencies: [...userCurrencies, currencyItem] })
        );
      }
    }
  };

  const onDeleteUserCurrenciesChange = (currencyItem) => {
    const updatedCurrencies = userCurrencies.filter(
      ({ currency }) => currency !== currencyItem
    );
    setUserCurrencies(updatedCurrencies);
    if (user) {
      dispatch(postUserCurrencies({ currencies: updatedCurrencies }));
    }
  };

  const onConvertAmountChange = (value) => {
    setConvertAmount(value);
  };

  // fetch user currencies if user exists
  useEffect(() => {
    if (user) {
      dispatch(fetchUserCurrencies());
    }
  }, [user, dispatch]);

  // if fetched user currencies exists, set user currencies
  useEffect(() => {
    if (user && fetchedCurrencies.length) {
      setUserCurrencies(fetchedCurrencies);
    }
  }, [fetchedCurrencies, user]);

  // set data currencies if fetched successfully
  useEffect(() => {
    if (!currencies.length) {
      dispatch(fetchCurrencies());
    }
  }, [dispatch, currencies]);

  // if data currencies exist, set currencypick
  useEffect(() => {
    if (stateCurrencies.length) {
      setCurrencyPick(stateCurrencies.find((curr) => curr.value === 'CAD'));
      setCurrencies(stateCurrencies);
    }
  }, [stateCurrencies]);

  // fetch rate and news when curencyPick is set
  useEffect(() => {
    if (currencyPick?.abbreviation) {
      const { abbreviation } = currencyPick;
      dispatch(fetchRates(abbreviation));
      dispatch(fetchNews(abbreviation));
    }
  }, [currencyPick, dispatch]);

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
            <SelectedCurrency
              currencyPick={currencyPick}
              convertAmount={convertAmount}
              showHeadlines={showHeadlines}
              news={news}
              onConvertAmountChange={onConvertAmountChange}
              onHideHeadlines={() => setShowHeadlines(!showHeadlines)}
            />
          </SelectedContainer>

          <UserCurrenciesContainer>
            <UserCurrencies
              rates={rates}
              currencyPick={currencyPick}
              currencies={currencies}
              convertAmount={convertAmount}
              userCurrencies={userCurrencies}
              onDeleteUserCurrenciesChange={onDeleteUserCurrenciesChange}
            />
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
                onClick={() =>
                  onAddUserCurrenciesChange({ currency: currency.abbreviation })
                }
                key={currency.abbreviation}
                isAdded={userCurrencies.some(
                  (userCurrency) =>
                    userCurrency.currency === currency.abbreviation
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
