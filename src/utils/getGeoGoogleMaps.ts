import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export const getGeolocationGoogleService = async (address: string) => {
  const response = await client.geocode({
    params: {
      address: address,
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });
  return response.data.results[0].geometry.location;
};
