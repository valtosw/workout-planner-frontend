import {
  Button,
  Input,
  Avatar,
  Textarea,
  NumberInput,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { FacebookIcon, InstagramIcon, TelegramIcon } from "../icons";

import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { ROUTES } from "@/constants/Routes";
import DefaultLayout from "@/layouts/Default";

export const EditTrainerProfile = () => {
  const { auth } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [placeOfWork, setPlaceOfWork] = useState("");
  const [trainingPrice, setTrainingPrice] = useState(0);
  const [instagram, setInstagram] = useState("");
  const [telegram, setTelegram] = useState("");
  const [facebook, setFacebook] = useState("");

  const [countries, setCountries] = useState<string[]>([]);

  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);

  const onSelectionChange = (key: React.Key | null) => {
    setSelectedKey(key);
    if (key) setCountry(String(key));
  };

  const onInputChange = (value: string) => {
    setCountry(value);
  };

  useEffect(() => {
    const fetchTrainerInfo = async () => {
      try {
        const response = await axios.get(`/Trainer/${auth?.id}`);

        const trainerInfo = response.data;

        setFirstName(trainerInfo.firstName || "");
        setLastName(trainerInfo.lastName || "");
        setExperience(trainerInfo.experience || 0);
        setCity(trainerInfo.city || "");
        setCountry(trainerInfo.country || "");
        setPlaceOfWork(trainerInfo.placeOfWork || "");
        setTrainingPrice(trainerInfo.trainingPrice || 0);
        setBio(trainerInfo.bio || "");
        setInstagram(trainerInfo.instagramLink || "");
        setTelegram(trainerInfo.telegramLink || "");
        setFacebook(trainerInfo.facebookLink || "");
        setPreviewUrl(trainerInfo.profilePicture || "");
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchTrainerInfo();
  }, [auth?.id]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("/Country/AllCountries");

        setCountries(res.data || []);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      }
    };

    fetchCountries();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("Id", auth?.id || "");
    formData.append("FirstName", firstName || "");
    formData.append("LastName", lastName || "");
    formData.append("Bio", bio || "");
    formData.append("Experience", experience?.toString() || "0");
    formData.append("City", city || "");
    formData.append("Country", country || "");
    formData.append("PlaceOfWork", placeOfWork || "");
    formData.append("TrainingPrice", trainingPrice?.toString() || "0");
    formData.append("InstagramLink", instagram || "");
    formData.append("FacebookLink", facebook || "");
    formData.append("TelegramLink", telegram || "");
    if (profileImage) formData.append("ProfilePicture", profileImage);

    try {
      const response = await axios.post(
        "/Trainer/UpdateTrainerProfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setPreviewUrl(response.data.profilePictureUrl);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <h1 className="text-xl font-bold mb-6 text-center">Edit Profile</h1>

        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20" src={previewUrl} />
          <div>
            <Input
              accept="image/*"
              className="w-64"
              type="file"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Input
              label="First Name"
              size="sm"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              label="Last Name"
              size="sm"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Textarea
              className="h-[182px]"
              label="Bio"
              size="sm"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <NumberInput
              hideStepper
              label="Experience (years)"
              minValue={0}
              size="sm"
              value={experience}
              onValueChange={setExperience}
            />
            <NumberInput
              hideStepper
              label="Training Price"
              minValue={0}
              size="sm"
              value={trainingPrice}
              onValueChange={setTrainingPrice}
            />
            <Input
              label="Workplace"
              size="sm"
              value={placeOfWork}
              onChange={(e) => setPlaceOfWork(e.target.value)}
            />
            <Input
              label="City"
              size="sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Autocomplete
              isVirtualized
              defaultItems={countries.map((country) => ({
                label: country,
                value: country,
              }))}
              label="Country"
              onInputChange={onInputChange}
              onSelectionChange={onSelectionChange}
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-medium mb-3">Social Media</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              className="max-w-xs"
              label="Instagram"
              size="sm"
              startContent={<InstagramIcon className="w-4 h-4 text-pink-500" />}
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
            <Input
              className="max-w-xs"
              label="Telegram"
              size="sm"
              startContent={<TelegramIcon className="w-4 h-4 text-blue-500" />}
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
            <Input
              className="max-w-xs"
              label="Facebook"
              size="sm"
              startContent={<FacebookIcon className="w-4 h-4 text-blue-600" />}
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            as={RouterLink}
            color="danger"
            to={ROUTES.PROFILE}
            variant="light"
          >
            Cancel
          </Button>
          <Button onPress={handleSubmit}>Save Changes</Button>
        </div>
      </div>
    </DefaultLayout>
  );
};
