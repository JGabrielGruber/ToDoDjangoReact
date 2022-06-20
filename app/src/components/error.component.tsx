import React from 'react';
import {
  Button,
  Card,
  CardActions,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import styled from 'styled-components';

type ErrorComponentProps = {
  onRetry: CallableFunction,
  open?: boolean,
};

const StyledPaper = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
`;

function ErrorComponent(props: ErrorComponentProps) {
  const { open, onRetry } = props;

  const handleRetry = () => {
    onRetry();
    return false;
  };

  return (
    <Modal open={open || false}>
      <StyledPaper>
        <Card>
          <Typography>
            error
          </Typography>
          <CardActions>
            <Button onClick={handleRetry}>
              Retry?
            </Button>
          </CardActions>
        </Card>
      </StyledPaper>
    </Modal>
  );
}

ErrorComponent.defaultProps = {
  open: false,
};

export default ErrorComponent;
