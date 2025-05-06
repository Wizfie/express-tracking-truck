import { body } from "express-validator";

const addValidator = [
  body("platNumber")
    .trim()
    .notEmpty()
    .withMessage("License plate tidak boleh kosong")
    .isString()
    .withMessage("License plate harus berupa string")
    .isLength({ min: 3, max: 10 })
    .withMessage("License plate harus terdiri dari 3-10 karakter"),
];

export { addValidator };
