
'use client';

import BlogPostCard from '@/components/blog-post-card';

const posts = [
  {
    title: '5 Maneiras de Lidar com a Ansiedade no Dia a Dia',
    category: 'Ansiedade',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'calm serene',
    description: 'Estratégias práticas e eficazes para gerenciar a ansiedade e encontrar mais calma em sua rotina diária.',
  },
  {
    title: 'Introdução ao Mindfulness para Iniciantes',
    category: 'Mindfulness',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'meditation peaceful',
    description: 'Um guia passo a passo para começar a praticar a atenção plena e reduzir o estresse.',
  },
  {
    title: 'A Importância de Estabelecer Limites Saudáveis',
    category: 'Relacionamentos',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'strong confident person',
    description: 'Aprenda a definir limites em seus relacionamentos para proteger sua energia e bem-estar emocional.',
  },
  {
    title: 'Como a Terapia Cognitivo-Comportamental (TCC) Pode Ajudar',
    category: 'Terapia',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'brain illustration',
    description: 'Entenda os princípios da TCC e como ela pode ser uma ferramenta poderosa para mudar padrões de pensamento.',
  },
    {
    title: 'O Impacto do Sono na Saúde Mental',
    category: 'Bem-estar',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'peaceful sleep',
    description: 'Descubra a conexão profunda entre uma boa noite de sono e sua estabilidade emocional.',
  },
  {
    title: 'Construindo Resiliência em Tempos de Incerteza',
    category: 'Desenvolvimento Pessoal',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'mountain sunrise',
    description: 'Ferramentas e mentalidades para fortalecer sua capacidade de superar desafios e adversidades.',
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl font-headline">Nosso Blog</h1>
        <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
          Artigos, dicas e reflexões para apoiar sua jornada de autoconhecimento e bem-estar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <BlogPostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
}
