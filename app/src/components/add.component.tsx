import React from 'react';
import styled from 'styled-components';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type AddComponentProps = {
  onClick: CallableFunction,
};

const StyledFab = styled(Fab)`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

function AddComponent(props: AddComponentProps) {
  const { onClick } = props;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  return (
    <StyledFab color="primary" aria-label="add" onClick={handleClick}>
      <AddIcon />
    </StyledFab>
  );
}

export default AddComponent;
