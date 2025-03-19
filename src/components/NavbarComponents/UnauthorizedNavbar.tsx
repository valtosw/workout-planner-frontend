import React from "react";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
  Button,
} from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

import { ThemeSwitch } from "../theme-switch";

import { Logo } from "@/components/icons";
import { ROUTES } from "@/constants/Routes";

export const UnauthorizedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <HeroUINavbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link
              as={RouterLink}
              className="flex justify-start items-center gap-1"
              color="foreground"
              to="/"
            >
              <Logo />
              <p className="font-bold text-inherit">Workout Planner</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <ThemeSwitch />
          <>
            <NavbarItem>
              <Button as={RouterLink} to={ROUTES.LOGIN} variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={RouterLink} to={ROUTES.SIGNUP} variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        </NavbarContent>
      </HeroUINavbar>
    </>
  );
};
