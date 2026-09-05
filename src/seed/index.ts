import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { mockCategories, mockTags, mockPosts } from './data'

export const seed = async () => {
  const payload = await getPayload({ config })

  console.log('🌱 Iniciando Seed do Payload CMS...')

  // 1. Limpar coleções existentes
  console.log('🧹 Limpando coleções anteriores...')
  await payload.delete({ collection: 'posts', where: {} })
  await payload.delete({ collection: 'categories', where: {} })
  await payload.delete({ collection: 'tags', where: {} })

  // 2. Inserir Categorias
  console.log('📂 Inserindo categorias...')
  const categoryIdMap = new Map<string, string | number>()
  for (const cat of mockCategories) {
    const createdCat = await payload.create({
      collection: 'categories',
      data: {
        name: cat.name,
        slug: cat.slug,
      },
    })
    categoryIdMap.set(cat.id, createdCat.id)
  }

  // 3. Inserir Tags
  console.log('🏷️ Inserindo tags...')
  const tagIdMap = new Map<string, string | number>()
  for (const tag of mockTags) {
    const createdTag = await payload.create({
      collection: 'tags',
      data: {
        name: tag.name,
        slug: tag.slug,
      },
    })
    tagIdMap.set(tag.id, createdTag.id)
  }

  // 4. Inserir Posts
  console.log('📝 Inserindo posts...')
  for (const post of mockPosts) {
    const categoryPayloadId = categoryIdMap.get(post.category.id)
    const tagPayloadIds = post.tags
      .map((t) => tagIdMap.get(t.id))
      .filter((id): id is string | number => id !== undefined)

    // Converter os blocos de texto simples em estrutura simples de texto para o Payload
    const formattedContent = {
      root: {
        type: 'root',
        children: post.content.map((block) => {
          if (block.type === 'image') {
            return {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: `[Imagem: ${block.alt}]`,
                },
              ],
            }
          }

          if (block.type === 'code') {
            return {
              type: 'block',
              fields: {
                blockType: 'code',
                language: block.language || 'plaintext',
                code: block.code || '',
                filename: block.filename || '',
              },
            }
          }

          return {
            type: block.type === 'paragraph' ? 'paragraph' : 'heading',
            tag: block.type === 'h2' ? 'h2' : block.type === 'h3' ? 'h3' : undefined,
            version: 1,
            children: block.children.map((child) => ({
              type: 'text',
              version: 1,
              text: child.text,
              format: child.bold ? 1 : child.italic ? 2 : 0,
            })),
          }
        }),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    }

    if (categoryPayloadId) {
      await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: formattedContent as any,
          category: categoryPayloadId as any,
          tags: tagPayloadIds as any,
          publishedDate: new Date().toISOString(),
          featured: post.featured || false,
        },
      })
    }
  }

  console.log('✅ Seed concluído com sucesso!')
  process.exit(0)
}

seed()
