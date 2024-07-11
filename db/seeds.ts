import db from ".";

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  for (let i = 0; i < 120; i++) {
    await db.user.create({
      data: {
        name: "User " + i,
        email: `user${i}@gmail.com`,
        hashedPassword: "skdfhsdlmjfmqjlsdfnqsndf",
        birthdayDate: new Date(2020, 0, 1),
        gender: "FEMALE",
        role: "USER",
        onboarded: false,
      },
    });
  }
};

export default seed;
