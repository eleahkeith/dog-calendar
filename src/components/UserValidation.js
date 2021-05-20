import * as yup from "yup";

export const formSchema = yup.object().shape({
  length: yup.number().required().min(1, "must be greater than 0"),
  time: yup.string().trim().required("required"),
  behavior: yup.string().trim().required("required"),
  notes: yup.string().notRequired(),
});
