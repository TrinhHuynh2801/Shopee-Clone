import { User } from 'src/types/user.type'
import { Response } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile() {
    return http.get<Response<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<Response<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<Response<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
