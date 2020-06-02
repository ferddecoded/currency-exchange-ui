import styled from 'styled-components';

export const H1 = styled.h1`
  z-index: 999;
  position: relative;
  display: inline-block;
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 80px;
  @media (max-width: 768px) {
    font-size: 36px;
  }

  ::before {
    position: absolute;
    display: block;
    width: calc(100% + 16px);
    height: 1rem;
    background-color: ${({ theme }) => theme.primaryNavy};
    content: '';
    bottom: 1rem;
    left: -8px;
    z-index: -1;
  }
`;

export const H2 = styled.h2`
  z-index: 999;
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 60px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const H3 = styled.h3`
  z-index: 999;
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 44px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const H4 = styled.h4`
  z-index: 999;
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 32px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const H5 = styled.h5`
  z-index: 999;
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const H6 = styled.h6`
  z-index: 999;
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
