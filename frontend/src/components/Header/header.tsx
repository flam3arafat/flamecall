import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Toolbar from "@mui/material/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../store/userAction";
import { logout } from "../../store/userSlice";
import { AppDispatch } from "../../store/index";
import "./header.scss";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [checked, setChecked] = useState(false);
  // @ts-ignore: Property '...' does not exist on type 'void'
  const { loggedIn, contacts, userInfo, success } = useSelector(
    // @ts-ignore: Property '...' does not exist on type 'void'
    (state) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (loggedIn) {
      dispatch(getContacts());
    }
  }, [loggedIn, dispatch]);
  return (
    <div className="header">
      <div className="logo">
        Phone<span>Book</span>
      </div>
      <div className="cta">
        <input
          type="checkbox"
          className="nav-checkbox"
          id="nav-toggle"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor="nav-toggle" className="nav-button">
          <span className="nav-icon">&nbsp;</span>
        </label>
        <div className="mobile">
          {loggedIn ? (
            <div className="desk">
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {`${userInfo?.first_name} ${userInfo?.last_name}`}
                    <KeyboardArrowDownIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        dispatch(logout());
                        handleClose();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </Toolbar>
              </AppBar>
            </div>
          ) : (
            <div className="desk">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </div>
        {loggedIn ? (
          <div className="desktop">
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {`${userInfo?.first_name} ${userInfo?.last_name}`}
                  <KeyboardArrowDownIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      dispatch(logout());
                      handleClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Toolbar>
            </AppBar>
          </div>
        ) : (
          <div className="desktop">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
