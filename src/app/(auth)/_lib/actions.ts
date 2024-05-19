'use server'
import { signIn, signOut } from 'auth'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'

// ...

export async function authenticate(
  //s prevState: string | undefined,
  formData: {
    email: string
    password: string
  }
) {
  try {
    await signIn('credentials', formData)
    revalidatePath('/', 'layout')
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
export async function logout() {
  await signOut()
  revalidatePath('/', 'layout')
}
