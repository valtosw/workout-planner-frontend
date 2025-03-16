import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

import { ThemeSwitch } from "../theme-switch";

import { Logo } from "@/components/icons";
import useAuth from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

const MenuItems = ["Profile", "Workout Plans", "Trainers", "Log Out"];

export const AuthorizedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, auth, logout } = useAuth();

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

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={location.pathname === "/workout-plans"}>
            <Link
              as={RouterLink}
              color={
                location.pathname === "/workout-plans"
                  ? "secondary"
                  : "foreground"
              }
              to={ROUTES.WORKOUT_PLANS}
            >
              Workout Plans
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/trainers"}>
            <Link
              as={RouterLink}
              color={
                location.pathname === "/trainers" ? "secondary" : "foreground"
              }
              to={ROUTES.TRAINERS}
            >
              Trainers
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <ThemeSwitch />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="default"
                name={user?.fullName}
                size="md"
                src={user?.profilePicture}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <Link
                  as={RouterLink}
                  className="flex flex-col items-start"
                  color="foreground"
                  to={ROUTES.CUSTOMER_PROFILE}
                >
                  <span>Signed in as</span>
                  <span>{auth?.email}</span>
                </Link>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        <NavbarMenu>
          {MenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={index === MenuItems.length - 1 ? "danger" : "foreground"}
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </HeroUINavbar>
    </>
  );
};
