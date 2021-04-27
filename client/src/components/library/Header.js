import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  titleLink: {
    textDecoration: 'none',
    color: 'white'
  },
  buttonAuth: {
    textDecoration: 'none'
  }
});

const Header = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderAuth = () => {
    switch (user) {
      case null:
        return;
      case false:
        return (
          <div>
            <Button
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              Login
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <a href="/auth/google" className={classes.buttonAuth}>
                <MenuItem onClick={handleClose}>Login with Google</MenuItem>
              </a>
              <a href="/auth/facebook" className={classes.buttonAuth}>
                <MenuItem onClick={handleClose}>Login with Facebook</MenuItem>
              </a>
            </Menu>
          </div>
        );
      default:
        return (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <a href="/api/logout" className={classes.buttonAuth}>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </a>
            </Menu>
          </div>
        );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.titleLink} to={user ? '/emails' : '/'}>
              Mailer
            </Link>
          </Typography>
          {renderAuth()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
