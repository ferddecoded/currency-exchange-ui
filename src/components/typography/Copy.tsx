import styled, { css } from 'styled-components';

export const Copy = styled.p`
  ${({ color, theme }) =>
    color === 'primary'
      ? css`
          color: ${theme.primaryColor};
        `
      : css`
          color: ${color};
        `};
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }

  ${({ small }) =>
    small &&
    css`
      font-size: 16px;
      @media (max-width: 768px) {
        font-size: 14px;
      }
    `}

  ${({ large }) =>
    large &&
    css`
      font-size: 20px;
      @media (max-width: 768px) {
        font-size: 16px;
      }
    `}
`;
