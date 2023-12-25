import client from "@/shared/api/client";

const getExams = async (url: string) => {
  const response = await client.get(url ? `exam?${url}` : "exam/");

  return response.data;
};

export default getExams;
