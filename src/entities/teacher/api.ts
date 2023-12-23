import client from "@shared/api/client";

const getTeachers = async (value: string) => {
  if (value.length < 3) return [];
  const response = await client.get(
    value ? `teacher?search=${value}` : "teacher/",
  );

  return response.data.map(({ id, name, surname, patronymic }) => ({
    id,
    name: `${surname} ${name} ${patronymic}`,
  }));
};

export default getTeachers;
