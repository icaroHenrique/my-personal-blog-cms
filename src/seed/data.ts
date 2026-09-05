export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export type PostContentBlock = 
  | { type: 'h2' | 'h3' | 'paragraph' | 'quote'; children: { text: string; bold?: boolean; italic?: boolean }[] }
  | { type: 'image'; url: string; alt: string }
  | { type: 'code'; language?: string; code: string; filename?: string };

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: Tag[];
  date: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
  content: PostContentBlock[];
}

export const mockCategories: Category[] = [
  { id: "1", name: "Web Dev", slug: "web-dev" },
  { id: "2", name: "Design", slug: "design" },
  { id: "3", name: "Tecnologia", slug: "tecnologia" },
  { id: "4", name: "Produtividade", slug: "produtividade" },
];

export const mockTags: Tag[] = [
  { id: "1", name: "Neubrutalism", slug: "neubrutalism" },
  { id: "2", name: "Next.js", slug: "nextjs" },
  { id: "3", name: "Design System", slug: "design-system" },
  { id: "4", name: "TypeScript", slug: "typescript" },
  { id: "5", name: "DevOps", slug: "devops" },
  { id: "6", name: "CSS", slug: "css" },
  { id: "7", name: "IA", slug: "ia" },
  { id: "8", name: "Produtividade", slug: "produtividade" },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    slug: "construindo-blog-neubrutalism",
    title: "Construindo um blog com o conceito Neubrutalism em 2026",
    excerpt: "Descubra como o neubrutalism rejeita o polimento invisível em favor de alto contraste, bordas grossas e tipografia assertiva.",
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[1], mockTags[5]],
    date: "13 Ago, 2026",
    readTime: "5 min",
    imageUrl: "/images/posts/post-1.png",
    featured: true,
    content: [
      {
        type: 'paragraph',
        children: [{ text: 'O Neubrutalism tem ganhado muita força nos últimos anos. Ao contrário do minimalismo estéril que dominou a web na última década, essa nova abordagem abraça as raízes cruas do design digital, usando alto contraste e cores vibrantes.' }]
      },
      {
        type: 'h2',
        children: [{ text: 'Por que bordas grossas?' }]
      },
      {
        type: 'paragraph',
        children: [{ text: 'Bordas grossas trazem um aspecto táctil às interfaces. Elas deixam muito claro onde um elemento começa e onde termina. É uma resposta direta ao glassmorphism e designs com muitas sombras suaves.' }]
      },
      {
        type: 'quote',
        children: [{ text: 'O design não precisa ser invisível para ser bom. Às vezes, ele precisa gritar para ser ouvido.', italic: true }]
      },
      {
        type: 'image',
        url: '/images/posts/post-1.png',
        alt: 'Exemplo de neubrutalism interface'
      },
      {
        type: 'h3',
        children: [{ text: 'Conclusão' }]
      },
      {
        type: 'paragraph',
        children: [{ text: 'Construir um blog usando esses conceitos não é apenas sobre estética, mas sobre performance e acessibilidade. Menos blur e mais cores contrastantes significam interfaces mais legíveis e rápidas.' }]
      }
    ]
  },
  {
    id: "2",
    slug: "design-system-flexivel",
    title: "Por que você precisa de um Design System Vivo",
    excerpt: "Como manter sua documentação visual atualizada ajuda a evitar dívida técnica de CSS e facilita testes em múltiplos temas.",
    category: mockCategories[1],
    tags: [mockTags[2], mockTags[3], mockTags[5]],
    date: "10 Ago, 2026",
    readTime: "7 min",
    imageUrl: "/images/posts/post-2.png",
    content: [
      {
        type: 'paragraph',
        children: [{ text: 'Um design system não é apenas uma biblioteca de componentes Figma. É uma entidade viva, refletida em código real (normalmente em uma página dedicada como /design-system).' }]
      },
      {
        type: 'h2',
        children: [{ text: 'Tokens e Variáveis CSS' }]
      },
      {
        type: 'paragraph',
        children: [{ text: 'A melhor forma de implementar design tokens hoje é através de variáveis CSS nativas. Com elas, criar um tema dark é tão simples quanto redefinir as variáveis em um media query ou seletor de dados.' }]
      }
    ]
  },
  {
    id: "3",
    slug: "o-futuro-da-ia-frontend",
    title: "O impacto da IA generativa no desenvolvimento Front-end",
    excerpt: "Ferramentas baseadas em IA estão mudando como criamos interfaces. Veja o que esperar para os próximos anos.",
    category: mockCategories[2],
    tags: [mockTags[6], mockTags[1], mockTags[3]],
    date: "05 Ago, 2026",
    readTime: "4 min",
    imageUrl: "/images/posts/post-3.png",
    content: [
      {
        type: 'paragraph',
        children: [{ text: 'IAs que geram código já não são novidade, mas a forma como as integramos ao fluxo de trabalho mudou drasticamente.' }]
      },
      {
        type: 'h2',
        children: [{ text: 'Co-pilotos ou Autônomos?' }]
      },
      {
        type: 'paragraph',
        children: [{ text: 'As ferramentas passaram de simples autocompletes para agentes que podem desenhar, criar e testar componentes inteiros. Como desenvolvedores, nosso trabalho se torna mais sobre orquestração e arquitetura.' }]
      }
    ]
  },
  {
    id: "4",
    slug: "produtividade-desenvolvedor",
    title: "Gestão de tempo para desenvolvedores modernos",
    excerpt: "Técnicas que uso para balancear estudos, projetos paralelos e trabalho principal sem surtar.",
    category: mockCategories[3],
    tags: [mockTags[7], mockTags[4]],
    date: "28 Jul, 2026",
    readTime: "6 min",
    imageUrl: "/images/posts/post-4.png",
    content: [
      {
        type: 'paragraph',
        children: [{ text: 'Com a constante evolução do ecossistema JS/TS, manter-se atualizado parece um segundo trabalho.' }]
      },
      {
        type: 'h2',
        children: [{ text: 'Timeboxing e Foco' }]
      },
      {
        type: 'paragraph',
        children: [{ text: 'Separar blocos de tempo inegociáveis para estudo profundo é a única forma sustentável de acompanhar as novidades sem causar burnout.' }]
      }
    ]
  },
  {
    id: "5",
    slug: "automacao-ci-cd-github-actions",
    title: "Automação e CI/CD com GitHub Actions em 2026",
    excerpt: "Como estruturar pipelines eficientes de integração contínua sem complicar o repositório.",
    category: mockCategories[2],
    tags: [mockTags[4], mockTags[3]],
    date: "20 Jul, 2026",
    readTime: "8 min",
    imageUrl: "/images/posts/post-1.png",
    content: [
      {
        type: 'paragraph',
        children: [{ text: 'Ter pipelines rápidas e confiáveis é essencial para qualquer projeto moderno de software.' }]
      }
    ]
  },
  {
    id: "6",
    slug: "arquitetura-micro-frontends",
    title: "Arquitetura de Micro-frontends na prática",
    excerpt: "Desafios, padrões e soluções ao dividir aplicações front-end de grande porte.",
    category: mockCategories[0],
    tags: [mockTags[1], mockTags[3]],
    date: "15 Jul, 2026",
    readTime: "9 min",
    imageUrl: "/images/posts/post-2.png",
    content: [
      {
        type: 'paragraph',
        children: [{ text: 'Entenda quando faz sentido adotar micro-frontends e quando uma arquitetura monolítica bem modularizada ainda é a melhor escolha.' }]
      }
    ]
  },
  {
    id: "7",
    slug: "animacoes-performance-css",
    title: "Animações de alta performance com Vanilla CSS e JS",
    excerpt: "Dicas essenciais para manter 60fps usando transform e opacity em interfaces ricas.",
    category: mockCategories[1],
    tags: [mockTags[5], mockTags[0]],
    date: "10 Jul, 2026",
    readTime: "5 min",
    imageUrl: "/images/posts/post-3.png",
    content: [
      {
        type: 'paragraph',
        children: [{ text: 'Evite repinturas desnecessárias priorizando aceleração de hardware nas suas animações.' }]
      }
    ]
  },
  {
    id: "8",
    slug: "monitoramento-kubernetes-prometheus",
    title: "Monitoramento no Kubernetes com Prometheus e Grafana",
    excerpt: "Construindo dashboards claros e alertas inteligentes para prevenir incidentes em produção.",
    category: mockCategories[2],
    tags: [mockTags[4], mockTags[6]],
    date: "02 Jul, 2026",
    readTime: "7 min",
    imageUrl: "/images/posts/post-4.png",
    content: [
      {
        type: 'paragraph',
        children: [{ text: 'Métricas de saúde da aplicação e da infraestrutura centralizadas em um único lugar.' }]
      }
    ]
  },
  {
    id: "9",
    slug: "otimizacao-seo-nextjs",
    title: "Otimização Avançada de SEO com Next.js App Router",
    excerpt: "Estratégias completas para metadados dinâmicos, Open Graph e indexação de alta velocidade.",
    category: mockCategories[0],
    tags: [mockTags[1], mockTags[0]],
    date: "25 Jun, 2026",
    readTime: "6 min",
    imageUrl: "/images/posts/post-1.png",
    content: [{ type: 'paragraph', children: [{ text: 'Garanta máxima visibilidade nos buscadores com o App Router.' }] }]
  },
  {
    id: "10",
    slug: "boas-praticas-typescript",
    title: "10 Boas Práticas de TypeScript para código limpo",
    excerpt: "Dicas de tipagem estrita, genéricos avançados e utilitários que evitam erros em tempo de execução.",
    category: mockCategories[0],
    tags: [mockTags[3], mockTags[2]],
    date: "18 Jun, 2026",
    readTime: "8 min",
    imageUrl: "/images/posts/post-2.png",
    content: [{ type: 'paragraph', children: [{ text: 'Escreva código TypeScript escalável e à prova de falhas.' }] }]
  },
  {
    id: "11",
    slug: "fundamentos-neubrutalismo-ui",
    title: "Os 5 pilares fundamentais da estética Neubrutalista",
    excerpt: "Por que paletas vibrantes, sombras duras e bordas acentuadas dominam o web design moderno.",
    category: mockCategories[1],
    tags: [mockTags[0], mockTags[5]],
    date: "12 Jun, 2026",
    readTime: "5 min",
    imageUrl: "/images/posts/post-3.png",
    content: [{ type: 'paragraph', children: [{ text: 'Um mergulho profundo na filosofia de design cru e honesto.' }] }]
  },
  {
    id: "12",
    slug: "ferramentas-ia-desenvolvimento",
    title: "Como criar fluxos de trabalho eficientes com IA",
    excerpt: "Integrando assistentes de código e automações na sua rotina diária de desenvolvimento.",
    category: mockCategories[2],
    tags: [mockTags[6], mockTags[7]],
    date: "05 Jun, 2026",
    readTime: "6 min",
    imageUrl: "/images/posts/post-4.png",
    content: [{ type: 'paragraph', children: [{ text: 'Maximize sua produtividade sem perder o controle da qualidade.' }] }]
  },
  {
    id: "13",
    slug: "css-grid-flexbox-guia",
    title: "CSS Grid vs Flexbox: Quando usar cada um?",
    excerpt: "Um guia prático com exemplos do mundo real para dominar layouts modernos na web.",
    category: mockCategories[1],
    tags: [mockTags[5], mockTags[0]],
    date: "28 Mai, 2026",
    readTime: "4 min",
    imageUrl: "/images/posts/post-1.png",
    content: [{ type: 'paragraph', children: [{ text: 'Combinando Grid e Flexbox para layouts altamente responsivos.' }] }]
  },
  {
    id: "14",
    slug: "state-management-nextjs",
    title: "Gerenciamento de Estado no Next.js: Do Server ao Client",
    excerpt: "Como escolher entre Server Components, Context API e bibliotecas leves de estado.",
    category: mockCategories[0],
    tags: [mockTags[1], mockTags[3]],
    date: "20 Mai, 2026",
    readTime: "7 min",
    imageUrl: "/images/posts/post-2.png",
    content: [{ type: 'paragraph', children: [{ text: 'Estratégias de estado sem vazamento de memória ou renderizações desnecessárias.' }] }]
  },
  {
    id: "15",
    slug: "carreira-dev-2026",
    title: "Navegando na carreira de tecnologia em 2026",
    excerpt: "Reflexões sobre aprendizado contínuo, networking e adaptação em um mercado em rápida mudança.",
    category: mockCategories[3],
    tags: [mockTags[7]],
    date: "14 Mai, 2026",
    readTime: "5 min",
    imageUrl: "/images/posts/post-3.png",
    content: [{ type: 'paragraph', children: [{ text: 'Como se manter relevante e motivado na área de desenvolvimento.' }] }]
  }
];
