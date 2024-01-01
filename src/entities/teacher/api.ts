import client from "@shared/api/client";

interface Teacher {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
}

const getTeachers = async (value: string) => {
  if (value.length < 3) return [];
  const response = await client.get(
    value ? `teacher?search=${value}` : "teacher/",
  );

  return response.data.map(({ id, name, surname, patronymic }: Teacher) => ({
    id,
    name: `${surname} ${name} ${patronymic}`,
  }));
};

export default getTeachers;
