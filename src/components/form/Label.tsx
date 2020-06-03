import React from 'react';
import styled from 'styled-components';
import { H6 } from '../typography/Heading';

const LabelText = styled(H6)`
  background-color: ${({ theme }) => theme.darkerGrey};
  margin: 12px 12px 12px 0px;
  padding: 12px;
  display: inline-block;
  border-radius: 5px;
`;

const Label = ({ children }) => <LabelText>{children}</LabelText>;

export default Label;
