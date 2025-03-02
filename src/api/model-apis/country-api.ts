import axios from "../axios";

export const getCountryList = async () => {
  try {
    const response = await axios.get("/Country/AllCountries");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCountryName = async (countryId: number) => {
  try {
    const response = await axios.get(`/Country/CountryName/${countryId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
