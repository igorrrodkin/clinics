import { clinicContent } from "../dtos/interfaces";

export const splitOnChunks = (arr: clinicContent[], chunkSize: number) => {
  const result = arr.reduce((resultArray: clinicContent[][], item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
  return result;
};
