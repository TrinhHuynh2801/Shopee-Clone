type Roles = 'Admin' | 'User'
export interface User {
  roles: Roles
  _id: string
  email: string
  name: string
  date_of_birth: null
  address: string
  phone: string
  createdAt: string
  updatedAt: string
  __v: string
}
