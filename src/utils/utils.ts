import { useParam } from "@blitzjs/next";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export const useStringParam = (name: string) => useParam(name, "string");
export const useStringQueryPram = (name: string) => {
  const { query } = useRouter();
  return query[name];
};

export const calculateAge = (birthdayDate: Date) => {
  const birthDate = dayjs(birthdayDate);
  const today = dayjs();
  let age = today.year() - birthDate.year();
  if (today.month() < birthDate.month() || (today.month() === birthDate.month() && today.date() < birthDate.date())) {
    age--;
  }
  return age;
};
