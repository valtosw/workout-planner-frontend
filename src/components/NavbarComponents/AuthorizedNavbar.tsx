import React, { useEffect, useState } from "react";
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

import { TrainerRequestsModal } from "./TrainerRequestModal";

import { Logo } from "@/components/icons";
import useAuth from "@/hooks/useAuth";
import { ROUTES } from "@/constants/Routes";
import { axiosPrivate } from "@/api/axios";
import { errorToast } from "@/types/toast";

const MenuItems = ["Profile", "Workout Plans", "Trainers", "Log Out"];

type TrainerRequestDto = {
  id: number;
  status: string;
  userProfilePicture?: string;
  userFirstName: string;
  userLastName: string;
};

interface TrainerRequestsModalProps {
  userId: string;
  role: "Customer" | "Trainer";
}

export const AuthorizedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, auth, logout } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth?.id) {
        try {
          const response = await axiosPrivate.get(
            `/ApplicationUser/Role/${auth.id}`,
          );

          setRole(response.data);
        } catch (error: any) {
          errorToast(error.message);
        }
      }
    };

    fetchUserRole();
  }, [auth?.id]);

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
          <NavbarItem isActive={location.pathname === ROUTES.WORKOUT_PLANS}>
            <Link
              as={RouterLink}
              color={
                location.pathname === ROUTES.WORKOUT_PLANS
                  ? "secondary"
                  : "foreground"
              }
              to={ROUTES.WORKOUT_PLANS}
            >
              Workout Plans
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === ROUTES.TRAINERS}>
            <Link
              as={RouterLink}
              color={
                location.pathname === ROUTES.TRAINERS
                  ? "secondary"
                  : "foreground"
              }
              to={ROUTES.TRAINERS}
            >
              Trainers
            </Link>
          </NavbarItem>
          {role === "Customer" && (
            <NavbarItem
              isActive={location.pathname === ROUTES.PROGRESS_LOGGING}
            >
              <Link
                as={RouterLink}
                color={
                  location.pathname === ROUTES.PROGRESS_LOGGING
                    ? "secondary"
                    : "foreground"
                }
                to={ROUTES.PROGRESS_LOGGING}
              >
                Progress Logging
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarContent justify="end">
          <div className="hidden">
            <ThemeSwitch />
          </div>
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
              <DropdownItem key="profile">
                <Link
                  as={RouterLink}
                  className="flex flex-col items-start"
                  color="foreground"
                  to={ROUTES.PROFILE}
                >
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem
                key="requests"
                onPress={() => setIsRequestsOpen(true)}
              >
                Trainer Requests
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

      <TrainerRequestsModal
        isOpen={isRequestsOpen}
        role={role === "Customer" ? "Customer" : "Trainer"}
        userId={auth?.id || ""}
        onOpenChange={setIsRequestsOpen}
      />
    </>
  );
};
