import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { pt } from '@payloadcms/translations/languages/pt'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Posts } from './collections/Posts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
const serverUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001'
const extraOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)

export default buildConfig({
  serverURL: serverUrl,
  cors: [frontendUrl, serverUrl, ...extraOrigins].filter(Boolean),
  csrf: [frontendUrl, serverUrl, ...extraOrigins].filter(Boolean),
  i18n: {
    fallbackLanguage: 'pt',
    supportedLanguages: { pt },
  },
  admin: {
    user: Users.slug,
    components: {
      views: {
        login: {
          Component: "./components/auth/CustomLoginView",
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Tags, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://postgres:postgres@localhost:5432/payload_cms',
    },
  }),
  sharp,
  plugins: [],
})
