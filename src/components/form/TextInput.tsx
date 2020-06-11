import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  position: relative;
  line-height: 20px;
  margin: 0px;
  display: inline-block;
  width: 100%;
  padding: 0px 12px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 13px;
  color: ${({ theme }) => theme.lightgrey};
  outline: none;
  border: 1px solid ${({ theme }) => theme.lightgrey};
  padding: 10px 20px;
  border-radius: 20px;
  position: relative;
  background-color: ${({ theme }) => theme.darkPurple};

  + label {
    color: ${({ theme }) => theme.lightgrey};
    transform: translateY(-3px);
    background-color: ${({ theme }) => theme.primaryColor};
  }

  &:focus {
    + label {
      ${({ theme }) => theme.primaryColor};
      transform: translateY(-20px);
    }
  }

  ${({ value }) =>
    value &&
    css`
      + label {
        ${({ theme }) => theme.primaryColor};
        transform: translateY(-20px);
      }
    `}
`;

const Label = styled('label')`
  color: #bbb;
  font-size: 11px;
  text-transform: uppercase;
  position: absolute;
  z-index: 2;
  left: 20px;
  top: 14px;
  padding: 0 2px;
  pointer-events: none;
  background: white;
  transition: transform 100ms ease;
  transform: translateY(-20px);
`;

export const TextInput: React.FC<Props> = ({
  label,
  id,
  value,
  onChange,
  type,
  placeholder,
}) => (
  <Container>
    <Input
      type={type}
      id={id}
      onChange={onChange}
      value={value}
      name={id}
      placeholder={placeholder}
    />
    {label && <Label htmlFor={id}>{label}</Label>}
  </Container>
);

interface Props {
  label?: string;
  id: string;
  value: string | number;
  onChange: (e) => void;
  type: string;
  placeholder?: string;
}
