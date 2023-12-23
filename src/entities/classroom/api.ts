import client from "@shared/api/client";

const getClassroom = async (value: string) => {
  if (value.length < 1) return [];
  const response = await client.get(
    value ? `classroom?search=${value}` : "classroom/",
  );
  return response.data;
};

export default getClassroom;
