import opencage from "opencage-api-client";

export const getGeolocationFromAddress = async (address: string) => {
  try {
    const data = await opencage.geocode({
      q: address,
    });
    return data.results[0].geometry;
  } catch (e) {
    return undefined;
  }
};
