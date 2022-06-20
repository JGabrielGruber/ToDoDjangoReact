import React from 'react';
import {
  Button,
  Card,
  CardActions,
  Modal,
  Container,
  Typography,
  CardContent,
} from '@mui/material';
import styled from 'styled-components';

type ErrorComponentProps = {
  onRetry: CallableFunction,
  open?: boolean,
};

const StyledContainer = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0;
`;

function ErrorComponent(props: ErrorComponentProps) {
  const { open, onRetry } = props;

  const handleRetry = () => {
    onRetry();
    return false;
  };

  return (
    <Modal open={open || false}>
      <StyledContainer maxWidth="xs">
        <Card>
          <CardContent>
            <Typography variant="h5">
              Error
            </Typography>
            <Typography variant="body2">
              An unexpected error occurred, would you like to retry?
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={handleRetry}>
              Retry
            </Button>
          </CardActions>
        </Card>
      </StyledContainer>
    </Modal>
  );
}

ErrorComponent.defaultProps = {
  open: false,
};

export default ErrorComponent;
