'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'

export async function loginWithCaptcha(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const captchaToken = formData.get('cf-turnstile-response') as string

  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios.')
  }

  // Se o Turnstile estiver configurado no .env, fazemos a verificação
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (turnstileSecret && captchaToken) {
    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${turnstileSecret}&response=${captchaToken}`,
      },
    )

    const captchaValidation = await verifyResponse.json()

    if (!captchaValidation.success) {
      throw new Error('Falha na validação do bot (Turnstile). Tente novamente.')
    }
  } else if (turnstileSecret && !captchaToken) {
    throw new Error('Token de verificação não encontrado. Você é um robô?')
  }

  // Agora executamos o login no Payload
  const payload = await getPayload({ config: configPromise })

  try {
    const authResult = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    // O Payload define por padrão o nome do cookie como "payload-token"
    // mas vamos pegar do config caso tenha sido alterado
    const collectionConfig = payload.collections['users'].config
    const cookieName = `${payload.config.cookiePrefix || 'payload'}-token`

    if (authResult.token) {
      // Definimos o cookie usando o Next.js (App Router)
      const cookieStore = await cookies()
      cookieStore.set(cookieName, authResult.token, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7200, // 2 horas (padrão do Payload)
      })
    } else {
      throw new Error('Credenciais inválidas.')
    }

    return { success: true }
  } catch (error: any) {
    console.error('Login erro:', error.message)
    throw new Error('E-mail ou senha incorretos.')
  }
}
