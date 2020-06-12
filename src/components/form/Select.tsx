import React from 'react';
import styled from 'styled-components';

import { CurrencyModel } from '../../models/CurrencyModel';
import { Copy } from '../typography/Copy';
import { Icon } from '../typography/Icon';

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

const SelectComponent = styled('select')`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
  display: block;
  border: 1px solid ${({ theme }) => theme.lightgrey};
`;

const Select: React.FC<Props> = ({ onChange, selectItem, options }) => {
  const renderOptions = (items) => {
    if (!items.length) {
      return null;
    }
    return options.map((currency) => (
      <option key={currency.value} value={currency.value}>
        {currency.label}
      </option>
    ));
  };

  return (
    <CustomSelect>
      <FlexContainer>
        <SelectText>{selectItem?.value || 'Select Currency'}</SelectText>
        <Icon className="fas fa-angle-down" fontSize="20px" />
      </FlexContainer>
      <SelectComponent
        value={selectItem?.value}
        name="currency-picker"
        id="currency-picker"
        onChange={onChange}
      >
        {options && options.length && renderOptions(options)}
      </SelectComponent>
    </CustomSelect>
  );
};

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: ({ target }: { target: any }) => void;
  selectItem: CurrencyModel;
  options: CurrencyModel[];
}

export default Select;
