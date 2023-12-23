import client from "@shared/api/client";

const getGroups = async (value: string) => {
  if (value.length < 1) return [];
  const response = await client.get(value ? `group?search=${value}` : "group/");

  return response.data.map(({ id, name }) => ({ id, name }));
};

export default getGroups;
