'use server'
import { signIn, signOut } from 'auth'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'

// ...

export async function authenticateCredentials(
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
      console.log(error)
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Неверная почта или пароль'
        case 'CallbackRouteError':
          return 'Неверная почта или пароль'
        default:
          return 'Что-то пошло не так.'
      }
    }
    throw error
  }
}
export async function authenticateEmail(
  // prevState: string | undefined,
  email: string
) {
  try {
    await signIn('resend', { email })
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error)
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Неверная почта или пароль'
        case 'CallbackRouteError':
          return 'Неверная почта или пароль'
        default:
          return 'Что-то пошло не так.'
      }
    }
    throw error
  }
}
export async function logout() {
  await signOut()
  revalidatePath('/', 'layout')
}
