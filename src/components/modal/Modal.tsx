import React from 'react';
import styled from 'styled-components';

import { Button } from '../button/Button';
import { Icon } from '../typography/Icon';

const ModalOverlay = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.opaqueBlack};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: absolute;
  width: 33.33%;
  right: 0;
  top: 0;
  height: 100%;
  background-color: ${({ theme }) => theme.lightgrey};
  overflow: scroll;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ModalWrapper = styled.div`
  margin: 96px 48px 48px;
  width: calc(100% - 96px);
  height: calc(100% - 96px);
  color: ${({ theme }) => theme.darkPurple};
  position: relative;
`;

const ModalButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

const Modal: React.FC<Props> = ({ children, onClick }): JSX.Element => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalButton onClick={onClick}>
          <Icon className="fas fa-times" fontSize="20px" />
        </ModalButton>
        <ModalWrapper>{children}</ModalWrapper>
      </ModalContainer>
    </ModalOverlay>
  );
};

interface Props {
  children?: JSX.Element | JSX.Element[];
  onClick?: () => void;
}

export default Modal;
