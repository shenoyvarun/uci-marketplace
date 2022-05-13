import {useContext, useState} from 'react';
import React from "react";
import axios from "axios";
// material
import { styled, alpha } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
// component
import Iconify from '../../components/Iconify';
import {GET_PRODUCTS_BY_NAME} from "../../api-config";
import {UserContext} from "../../userContext";

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);

  const [formValue, setFormValue] = useState('');
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { valueInfo, productInfo } = useContext(UserContext);
  const [prodInfo, setprodInfo] = productInfo;
  const handleSubmit = () => {
    setOpen(false);
    const values = formValue
    console.log(values);
    axios.post(GET_PRODUCTS_BY_NAME, values).then((response) => {
      console.log(response);
      setprodInfo(response.data);
      console.log(productInfo);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
                value={formValue}
                onChange={e => setFormValue(e.target.value)}
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
