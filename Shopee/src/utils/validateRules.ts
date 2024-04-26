import type { RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

export const rules: Rules = {
  email: {
    required: { value: true, message: 'Email là bắt buộc' },
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email không đúng định dạng' },
    maxLength: { value: 160, message: 'Độ dài từ 5 - 160 kí tự' },
    minLength: { value: 5, message: 'Độ dài từ 5 - 160 kí tự' }
  },
  password: {
    required: { value: true, message: 'Password là bắt buộc' },
    maxLength: { value: 160, message: 'Độ dài từ 6 - 160 kí tự' },
    minLength: { value: 6, message: 'Độ dài từ 6 - 160 kí tự' }
  },
  confirm_password: {
    required: { value: true, message: 'Password là bắt buộc' }
  }
}
export const schema = yup.object({
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),
  confirm_password: handleConfirmPasswordYup('password')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password') as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >
})

export type UserSchema = yup.InferType<typeof userSchema>
