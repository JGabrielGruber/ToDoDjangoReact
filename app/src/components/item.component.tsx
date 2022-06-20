import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

type ItemComponentProps = {
  to?: number,
  title: string,
  description: string,
  edited?: Date,
  done: boolean,
};

function ItemComponent(props: ItemComponentProps) {
  const {
    to,
    title,
    description,
    edited,
    done,
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
        <ListItemIcon>
          {
            done ? <CheckIcon /> : ''
          }
        </ListItemIcon>
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
