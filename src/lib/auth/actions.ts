'use server'
import { AuthError } from 'next-auth'
import { signIn } from '~auth12'

// ...

export async function authenticate(
  //s prevState: string | undefined,
  formData: {
    email: string
    password: string
  }
) {
  try {
    await signIn('Credentials', formData)
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
