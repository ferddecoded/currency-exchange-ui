import styled from 'styled-components';

export const Icon = styled.i`
  font-size: ${({ theme, fontSize }) => fontSize || theme.defaultFontSize};
  color: ${({ theme, color }) => color || theme.lightgrey};
`;
