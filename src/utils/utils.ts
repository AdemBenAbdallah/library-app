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

export const categoryNameFormat = (() => {
  const cache: Record<string, string> = {};
  return (category: string) => {
    if (cache[category]) {
      return cache[category];
    }

    const lowerCaseCategory = category.toLowerCase().split("_").join(" ");
    const formattedCategory = lowerCaseCategory.charAt(0).toUpperCase() + lowerCaseCategory.slice(1);

    cache[category] = formattedCategory;
    return formattedCategory;
  };
})();
