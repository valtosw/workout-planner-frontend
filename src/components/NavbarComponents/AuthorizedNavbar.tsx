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
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

import { ThemeSwitch } from "../theme-switch";

import { Logo } from "@/components/icons";
import useAuth from "@/hooks/useAuth";
import { ROUTES } from "@/constants/Routes";
import axios, { axiosPrivate } from "@/api/axios";
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

  const [requests, setRequests] = useState<TrainerRequestDto[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setIsOpen(true);
    setLoading(true);
    try {
      const res = await axios.get(
        `/TrainerRequest/AllTrainerRequests/${auth?.id}`,
      );

      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching trainer requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: number) => {
    try {
      const res = await axios.put(`/TrainerRequest/AcceptRequest/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const res = await axios.put(`/TrainerRequest/RejectRequest/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

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
              <DropdownItem key="requests" onPress={handleOpen}>
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

      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        size="lg"
        onOpenChange={setIsOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Trainer Requests</ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className="flex justify-center py-10">
                    <Spinner color="primary" />
                  </div>
                ) : requests.length === 0 ? (
                  <p className="text-center text-sm text-gray-500">
                    No requests found.
                  </p>
                ) : (
                  requests.map((req) => (
                    <div
                      key={req.id}
                      className="flex justify-between items-center border p-3 rounded-lg mb-3 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={`${req.userFirstName} ${req.userLastName}`}
                          size="md"
                          src={req.userProfilePicture || ""}
                        />
                        <div>
                          <p className="font-medium">
                            {req.userFirstName} {req.userLastName}
                          </p>
                          {role === "Customer" && (
                            <p className="text-sm text-gray-500">
                              Status: {req.status}
                            </p>
                          )}
                        </div>
                      </div>
                      {role === "Trainer" && (
                        <div className="flex gap-2">
                          <Button
                            color="success"
                            size="sm"
                            onPress={() => handleAccept(req.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onPress={() => handleReject(req.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
