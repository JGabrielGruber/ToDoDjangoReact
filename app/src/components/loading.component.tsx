import React from 'react';
import { CircularProgress, Modal, Paper } from '@mui/material';
import styled from 'styled-components';

type LoadingComponentProps = {
  open?: boolean
};

const StyledPaper = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
`;

function LoadingComponent(props: LoadingComponentProps) {
  const { open } = props;
  return (
    <Modal open={open || false}>
      <StyledPaper>
        <CircularProgress />
      </StyledPaper>
    </Modal>
  );
}

LoadingComponent.defaultProps = {
  open: false,
};

export default LoadingComponent;
