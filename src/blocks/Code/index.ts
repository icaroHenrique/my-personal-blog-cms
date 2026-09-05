import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  labels: {
    singular: 'Bloco de Código',
    plural: 'Blocos de Código',
  },
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'JSX', value: 'jsx' },
        { label: 'TSX', value: 'tsx' },
        { label: 'CSS', value: 'css' },
        { label: 'SCSS', value: 'scss' },
        { label: 'HTML', value: 'html' },
        { label: 'Bash', value: 'bash' },
        { label: 'Shell', value: 'shell' },
        { label: 'Python', value: 'python' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
        { label: 'Java', value: 'java' },
        { label: 'C', value: 'c' },
        { label: 'C++', value: 'cpp' },
        { label: 'SQL', value: 'sql' },
        { label: 'GraphQL', value: 'graphql' },
        { label: 'JSON', value: 'json' },
        { label: 'YAML', value: 'yaml' },
        { label: 'TOML', value: 'toml' },
        { label: 'Dockerfile', value: 'dockerfile' },
        { label: 'Markdown', value: 'markdown' },
        { label: 'Terraform', value: 'terraform' },
        { label: 'Plaintext', value: 'plaintext' },
      ],
      admin: {
        description: 'Selecione a linguagem para o highlighting (opcional)',
      },
    },
    {
      name: 'filename',
      type: 'text',
      admin: {
        description: 'Nome do arquivo para exibir no header do bloco (opcional)',
      },
    },
    {
      name: 'code',
      type: 'code',
      required: true,
      admin: {
        language: 'plaintext', // Plaintext para não disparar lint/erros de typescript
        editorOptions: {
          quickSuggestions: false,
          suggestOnTriggerCharacters: false,
          wordBasedSuggestions: 'off',
        },
      },
    },
  ],
}
