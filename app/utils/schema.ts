import { z } from "zod";

// #region --------- Helpers ---------
export const isPhoneNumber = (value: string) =>
  value.startsWith("09") || !isNaN(Number(value));

const toTitleCase = (value: string): string => {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Wraps a strict schema to allow empty strings or undefined.
 * Logic: If value is present, it MUST pass the strict schema.
 * If value is "" or undefined, it passes as optional.
 */
export const asOptionalField = <T extends z.ZodTypeAny>(schema: T) => {
  return (
    z
      // .union([
      //   schema,
      //   z.literal("").transform(() => undefined), // Handle empty string from form inputs
      // ])
      // .optional(); // Handle actual undefined
      .preprocess(
        (val: unknown) =>
          typeof val === "string" && val.trim() === "" ? undefined : val,
        schema.optional(),
      )
  );
};

/**
 * Converts null values to empty string before applying the schema.
 * Useful for form fields that can be null but need to be validated as strings.
 */
export const nullToEmptyString = <T extends z.ZodTypeAny>(schema: T) => {
  return z.preprocess(
    (val) => (val === null || val === undefined ? "" : val),
    schema,
  );
};
// #endregion

// #region --------- Schemas ---------
export const phoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/\s+/g, ""))
  .pipe(
    z
      .string()
      .nonempty("این فیلد ضروری است")
      .regex(
        /^09\d{9}$/,
        "شماره تلفن نامعتبر است. باید با 09 شروع شود و 11 رقم باشد",
      ),
  );

export const usernameSchema = z
  .string()
  .trim()
  .nonempty("این فیلد ضروری است")
  .min(4, "نام کاربری باید حداقل 4 کاراکتر باشد")
  .max(30, "نام کاربری باید حداکثر 30 کاراکتر باشد")
  .regex(/^[a-zA-Z_][\w.]{3,29}$/, "نام کاربری نامعتبر است");

export const emailSchema = z
  .string()
  .trim()
  .email("ایمیل معتبر وارد کنید")
  .min(5, "ایمیل باید حداقل 5 کاراکتر باشد")
  .max(255, "ایمیل نمی تواند بیشتر از 255 کاراکتر باشد")
  .toLowerCase();

export const birthDateSchema = z
  .string()
  .trim()
  .nonempty("انتخاب تاریخ تولد الزامی است.")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "فرمت تاریخ صحیح نیست.")
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "تاریخ وارد شده معتبر نیست.",
  })
  .refine((val) => new Date(val) < new Date(), {
    message: "تاریخ تولد نمی‌تواند در آینده باشد.",
  })
  .refine((val) => new Date(val).getFullYear() > new Date().getFullYear() - 100, {
    message: "تاریخ تولد وارد شده معتبر به نظر نمی‌رسد.",
  });

export const genderSchema = z.enum(["Male", "Female"], {
  error: "جنسیت باید انتخاب شود",
});

export const fullNameSchema = z
  .string()
  .trim()
  .nonempty("این فیلد ضروری است")
  .min(2, "نام و نام خانوادگی باید حداقل 2 کاراکتر باشد")
  .max(100, "نام و نام خانوادگی نمی تواند بیشتر از 100 کاراکتر باشد")
  .refine(
    (val) => /^[\p{L}\s'-]+$/u.test(val),
    "نام و نام خانوادگی فقط می تواند حاوی حروف، فاصله یا خط تیره باشد",
  )
  .transform(toTitleCase);

export const firstNameSchema = z
  .string()
  .trim()
  .nonempty("این فیلد ضروری است")
  .min(2, "نام باید حداقل 2 کاراکتر باشد")
  .max(50, "نام نمی تواند بیشتر از 50 کاراکتر باشد")
  .refine(
    (val) => /^[\p{L}\s'-]+$/u.test(val),
    "نام فقط می تواند حاوی حروف، فاصله یا خط تیره باشد",
  )
  .transform(toTitleCase);

export const lastNameSchema = z
  .string()
  .trim()
  .nonempty("این فیلد ضروری است")
  .min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد")
  .max(50, "نام خانوادگی نمی تواند بیشتر از 50 کاراکتر باشد")
  .refine(
    (val) => /^[\p{L}\s'-]+$/u.test(val),
    "نام خانوادگی فقط می تواند حاوی حروف، فاصله یا خط تیره باشد",
  )
  .transform(toTitleCase);

export const nationalCodeSchema = z
  .string()
  .trim()
  .nonempty("این فیلد ضروری است")
  .length(10, "کد ملی باید 10 رقم باشد")
  .regex(/^\d+$/, "کد ملی فقط باید شامل اعداد باشد");

export const usernameOrPhoneSchema = z
  .string()
  .trim()
  .superRefine((value, ctx) => {
    const schema = isPhoneNumber(value) ? phoneSchema : usernameSchema;
    const result = schema.safeParse(value);

    if (!result.success) {
      ctx.addIssue(
        result.error.issues[0]?.message ?? "ورودی نامعتبر است",
      );
    }
  });

// #endregion
