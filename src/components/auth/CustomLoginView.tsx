'use client'

import React, { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { useRouter } from 'next/navigation'
import { loginWithCaptcha } from '@/actions/loginAction'

// Um layout simples que engloba o formulário, inspirado no Payload
export default function CustomLoginView() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Obter todos os dados do formulário nativamente
    const formData = new FormData(e.currentTarget)

    try {
      await loginWithCaptcha(formData)
      // Se sucesso, vamos para o painel principal
      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'var(--theme-bg, #f3f4f6)',
        padding: '1rem',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          padding: '2.5rem',
          backgroundColor: 'var(--theme-elevation-100, #ffffff)',
          border: '1px solid var(--theme-elevation-200, #e5e7eb)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          borderRadius: '0.5rem',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--theme-text, #111827)' }}>
          Acesso Seguro
        </h1>

        {error && (
          <div
            style={{
              padding: '0.75rem',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label
            htmlFor="email"
            style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--theme-text, #374151)' }}
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Digite seu e-mail"
            style={{
              padding: '0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--theme-elevation-250, #d1d5db)',
              backgroundColor: 'transparent',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label
            htmlFor="password"
            style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--theme-text, #374151)' }}
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Digite sua senha"
            style={{
              padding: '0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--theme-elevation-250, #d1d5db)',
              backgroundColor: 'transparent',
            }}
          />
        </div>

        {siteKey ? (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
            <Turnstile siteKey={siteKey} />
          </div>
        ) : (
          <div style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
            [Aviso Dev]: Turnstile Site Key não configurada.
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '0.75rem',
            borderRadius: '0.375rem',
            backgroundColor: 'var(--theme-primary, #000)',
            color: '#fff',
            fontWeight: 'bold',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            border: 'none',
          }}
        >
          {isLoading ? 'Autenticando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
