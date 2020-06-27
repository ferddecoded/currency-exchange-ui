/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';

import { CurrencyModel } from '../../models/CurrencyModel';
import { Button } from '../button/Button';
import { Icon } from '../typography/Icon';
import { Box } from '../box/Box';
import { Image } from '../image/Image';
import { Copy } from '../typography/Copy';
import { TextInput } from '../form/TextInput';
import { H5, H6 } from '../typography/Heading';

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const RemoveCurrencyButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
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

const UserCurrencies: React.FC<Props> = ({
  userCurrencies,
  currencies,
  currencyPick,
  rates,
  convertAmount,
  onDeleteUserCurrenciesChange,
}): JSX.Element => {
  if (!userCurrencies.length || !currencies.length) {
    return null;
  }
  return (
    <>
      {userCurrencies.map(({ currency }) => {
        if (currency !== currencyPick.abbreviation) {
          const matchedCurrency = currencies.find(
            (curr) => curr.abbreviation === currency
          );

          const { abbreviation, flagURL, symbol, name } = matchedCurrency;

          const rate = rates?.rates[abbreviation] || 0;
          return (
            <CurrencyItemContainer key={abbreviation}>
              <RemoveCurrencyButton
                onClick={() => onDeleteUserCurrenciesChange(currency)}
              >
                <Icon className="fas fa-times" fontSize="20px" />
              </RemoveCurrencyButton>
              <FlagContainer>
                <Image src={flagURL} alt={name} />
              </FlagContainer>
              <CurrencyInfoContainer>
                <Symbol>
                  <Copy large>{symbol}</Copy>
                </Symbol>
                <InfoContainer>
                  <TextInput
                    type="number"
                    id={`convertAmount_${abbreviation}`}
                    value={(convertAmount * rate).toFixed(4)}
                    disabled
                    onChange={() => null}
                    placeholder="0.0000"
                  />
                  <H5>{`${abbreviation} - ${name}`}</H5>
                  <H6>
                    1 {currencyPick.abbreviation} = {rate ? rate.toFixed(4) : 0}{' '}
                    {abbreviation}
                  </H6>
                </InfoContainer>
              </CurrencyInfoContainer>
            </CurrencyItemContainer>
          );
        }
        return null;
      })}
    </>
  );
};

interface Props {
  rates?: {
    [attr: string]: any;
  };
  currencyPick?: CurrencyModel;
  currencies?: CurrencyModel[];
  convertAmount?: number;
  userCurrencies?: { currency: string }[];
  onDeleteUserCurrenciesChange?: (arg: any) => void;
}

export default UserCurrencies;
