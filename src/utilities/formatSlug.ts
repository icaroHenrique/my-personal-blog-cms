import type { FieldHook } from 'payload'

/**
 * Converte string para slug padrão (estilo WordPress)
 */
export const slugify = (val: string): string => {
  return val
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Field hook para formatar e gerar o slug automaticamente a partir de outro campo de fallback (ex: 'title' ou 'name').
 */
export const formatSlug = (fallbackField: string): FieldHook => ({
  value,
  originalDoc,
  data,
  operation,
}) => {
  // Se o usuário digitou ou alterou um slug manualmente, limpa e formata o que ele digitou
  if (typeof value === 'string' && value.trim() !== '') {
    return slugify(value)
  }

  // Se não foi fornecido um slug, pega o valor do campo de fallback (title ou name)
  const fallbackData = data?.[fallbackField] || originalDoc?.[fallbackField]

  if (typeof fallbackData === 'string' && fallbackData.trim() !== '') {
    return slugify(fallbackData)
  }

  return value
}
