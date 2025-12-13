import { Role } from "src/user/enum/user-role.enum"

export interface JwtPayloadData {
  id: string
  username: string
  email: string
  role: Role
  isActive: boolean
}