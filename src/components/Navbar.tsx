import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="flex flex-col items-center bg-[#303134] rounded m-[30px] pb-[20px]">
      <h1 className="my-[20px] text-[30px]">Atelie Database</h1>
      <section className="flex items-center">
        <p className="mr-[10px] text-[20px]">Navigation:</p>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="outlined"
          >
            Dashboard
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link to="clients">Clients</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="orders">Orders</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="services">Services</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="coupons">Coupons</Link>
            </MenuItem>
          </Menu>
        </div>
      </section>
    </header>
  );
};
