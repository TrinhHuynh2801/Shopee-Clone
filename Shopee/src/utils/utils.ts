import axios, { AxiosError } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosError422<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === 422
}
export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

export function formatNumberWithPeriods(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function formatNumberToK(number: number) {
  if (number >= 1000) {
    const dividedNumber = number / 1000

    return dividedNumber.toFixed(1) + 'K'
  } else {
    // If the number is less than 1000, return it as it is
    return number.toString()
  }
}
