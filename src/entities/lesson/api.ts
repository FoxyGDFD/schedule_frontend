import client from "@shared/api/client";

const getLessons = async (url: string) => {
  const response = await client.get(url ? `lesson?${url}` : "lesson/");

  return response.data;
};

export default getLessons;
