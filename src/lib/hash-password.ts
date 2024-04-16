import * as bcrypt from 'bcryptjs'
export function hashPassword(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
