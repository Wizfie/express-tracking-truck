import { body } from "express-validator";

const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Username tidak boleh kosong")
    .isLength({
      min: 3,
      max: 10,
    })
    .matches(/^[a-zA-Z0-9]+$/) // Hanya boleh mengandung huruf dan angka (tanpa simbol)
    .withMessage(
      "Username harus terdiri dari 3-20 karakter dan hanya boleh mengandung huruf dan angka"
    ),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password tidak boleh kosong")
    .isString()
    .withMessage("Password harus berupa string")
    .isLength({
      min: 6,
    }),
];
const loginValidator = [
  body("username")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Username tidak boleh kosong")
    .matches(/^[a-zA-Z0-9]+$/) // Hanya boleh mengandung huruf dan angka (tanpa simbol)
    .withMessage("Username / password tidak valid"),

  body("password")
    .isLength({
      min: 6,
    })
    .isString()
    .withMessage("Password harus berupa string")
    .notEmpty()
    .withMessage("Password tidak boleh kosong"),
];

export { registerValidator, loginValidator };
