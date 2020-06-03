import styled, { css } from 'styled-components';

export const Divider = styled.div`
  background-color: ${({ theme, color }) => color || theme.primaryBlack};
  border-radius: 5px;
  height: 5px;
  width: 100%;
  ${({ vertical }) =>
    vertical &&
    css`
      width: 5px;
      height: auto;
    `};
`;
