import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type ItemComponentProps = {
  to?: number,
  title: string,
  description: string,
  edited?: Date,
};

function ItemComponent(props: ItemComponentProps) {
  const {
    to,
    title,
    description,
    edited,
  } = props;

  const navigate = useNavigate();

  const path = `${to}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemButton href={path} onClick={handleClick}>
        <ListItemText
          primary={title}
          secondary={description.substring(0, 100)}
        />
        <Typography variant="caption">
          {edited?.toLocaleString()}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
}

ItemComponent.defaultProps = {
  to: undefined,
  edited: undefined,
};

export default ItemComponent;
