import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import {NavLink} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NavbarData from '../config/NavbarData';
import handleCart from './redux/reducer/handleCart';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false);
  const state = useSelector(state=>state.handleCart)
  const handleOpen = () => {
    setOpen(!open)
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>MyBrand</Typography>
        {match
          ? <>
            <List sx={{ display: 'flex', width: '40%', marginLeft: 'auto' }}>
              {NavbarData.map((item, index) => (
                <ListItem disablePadding key={index} >
                  <NavLink to={item.path} style={{ textDecoration: 'none', color: 'white' }} >
                    <ListItemText primary={item.name} />
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Button sx={{ marginLeft: 'auto' }} color="inherit">
              <LoginIcon/>Login</Button>
            <Button sx={{ ml: 2 }} color="inherit">
            <PersonAddIcon />
              Register</Button>
            <Button sx={{ ml: 2 }} color="inherit">
              <ShoppingCartIcon />
              Cart({state.length})
            </Button>
          </>
          : <IconButton sx={{ marginLeft: 'auto' }} color="inherit" onClick={handleOpen} >

            <MenuIcon />
          </IconButton>
        }
        <Drawer open={open} onClose={() => setOpen(!open)}>
          <List>
            {NavbarData.map((item, index) => (
              <ListItem key={index} >
                <ListItemText primary={item.name} onClick={() => setOpen(!open)} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar >
  )
}
export default Navbar