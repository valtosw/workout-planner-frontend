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

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  currentUser: {
    firstName: string;
    lastName: string;
    profilePictureUrl: string;
  };
}

export const EditProfileModal = ({
  isOpen,
  onClose,
  onSave,
  currentUser,
}: EditProfileModalProps) => {
  const [firstName, setFirstName] = useState(currentUser.firstName || "");
  const [lastName, setLastName] = useState(currentUser.lastName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleSubmit = () => {
    const formData = new FormData();

    if (profileImage) formData.append("profileImage", profileImage);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if (currentPassword && newPassword === confirmPassword) {
      formData.append("currentPassword", currentPassword);
      formData.append("newPassword", newPassword);
    }

    onSave(formData);
    onClose();
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
          <div className="flex flex-col gap-3 mt-4">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
