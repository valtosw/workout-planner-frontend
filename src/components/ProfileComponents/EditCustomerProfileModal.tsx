import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
} from "@heroui/react";
import { useState } from "react";

import axios from "@/api/axios";

interface EditCustomerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    firstName: string;
    lastName: string;
    profilePictureUrl: string;
  };
  userId: string;
}

export const EditCustomerProfileModal = ({
  isOpen,
  onClose,
  currentUser,
  userId,
}: EditCustomerProfileModalProps) => {
  const [firstName, setFirstName] = useState(currentUser.firstName || "");
  const [lastName, setLastName] = useState(currentUser.lastName || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(
    currentUser.profilePictureUrl || "",
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("Id", userId);
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    if (profileImage) formData.append("ProfilePicture", profileImage);

    try {
      const response = await axios.post(
        "/Customer/UpdateCustomerProfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setPreviewUrl(response.data.profilePictureUrl);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} placement="center" size="lg" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Edit Profile</ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-32 h-32" src={previewUrl} />
            <Input
              accept="image/*"
              className="w-32"
              type="file"
              onChange={handleImageChange}
            >
              Edit Avatar
            </Input>
          </div>
          <div className="flex gap-4 mt-4">
            <Input
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="default" onPress={handleSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
