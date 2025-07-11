import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function BlogPostPage() {
  return (
    <div className="w-full bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <article className="space-y-12">
          {/* Header */}
          <header className="space-y-6">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://placehold.co/1200x800.png"
                data-ai-hint="calm serene"
                alt="Imagem principal do post"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            <div className="space-y-4">
               <Badge variant="secondary">Ansiedade</Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                5 Maneiras de Lidar com a Ansiedade no Dia a Dia
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Estratégias práticas e eficazes para gerenciar a ansiedade e encontrar mais calma em sua rotina diária.
              </p>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-invert prose-lg max-w-none mx-auto text-foreground/90 prose-h2:text-foreground prose-h3:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
            <p>
              A ansiedade é uma resposta natural do corpo ao estresse. É um sentimento de medo ou apreensão sobre o que está por vir. O primeiro dia de aula, uma entrevista de emprego ou um discurso podem causar ansiedade na maioria das pessoas. Mas se seus sentimentos de ansiedade são extremos, duram mais de seis meses e estão interferindo em sua vida, você pode ter um transtorno de ansiedade.
            </p>
            
            <p>
              Neste artigo, exploraremos cinco estratégias práticas que você pode começar a usar hoje para gerenciar os sintomas da ansiedade e cultivar um maior senso de paz interior.
            </p>

            <h2>1. Pratique a Respiração Profunda</h2>
            <p>
              Quando você está ansioso, sua respiração se torna rápida e superficial. A respiração profunda e diafragmática é uma ferramenta poderosa para acalmar seu sistema nervoso.
            </p>
            <ul>
              <li>Encontre um lugar tranquilo para sentar ou deitar.</li>
              <li>Coloque uma mão em seu peito e a outra em sua barriga.</li>
              <li>Inspire lentamente pelo nariz por quatro segundos, sentindo sua barriga se expandir.</li>
              <li>Segure a respiração por quatro segundos.</li>
              <li>Expire lentamente pela boca por seis segundos.</li>
              <li>Repita por vários minutos até se sentir mais calmo.</li>
            </ul>

            <h2>2. Incorpore o Mindfulness</h2>
            <p>
              Mindfulness é a prática de prestar atenção ao momento presente sem julgamento. Isso pode ajudá-lo a se desvincular de pensamentos ansiosos sobre o passado ou o futuro.
            </p>
            
            <blockquote>
              "O momento presente é o único momento disponível para nós, e é a porta para todos os outros momentos." - Thich Nhat Hanh
            </blockquote>

            <h2>3. Movimente Seu Corpo Regularmente</h2>
            <p>
              A atividade física é um redutor de estresse muito eficaz. O exercício regular pode diminuir os hormônios do estresse, como o cortisol, e aumentar as endorfinas, que melhoram o humor. Não precisa ser um treino intenso; uma caminhada de 30 minutos por dia pode fazer uma grande diferença.
            </p>
            
            <figure className="my-8">
              <Image 
                src="https://placehold.co/800x500.png" 
                data-ai-hint="person jogging park"
                alt="Pessoa correndo no parque" 
                width={800} 
                height={500} 
                className="rounded-lg shadow-lg"
              />
              <figcaption className="text-center text-sm text-muted-foreground mt-2">O exercício é uma forma comprovada de melhorar a saúde mental.</figcaption>
            </figure>


            <h2>4. Desafie Pensamentos Ansiosos</h2>
            <p>
              A Terapia Cognitivo-Comportamental (TCC) nos ensina a identificar, desafiar e reformular nossos pensamentos negativos. Quando um pensamento ansioso surgir, pergunte a si mesmo:
            </p>
            <ul>
              <li>Existe uma maneira mais positiva de ver esta situação?</li>
              <li>Qual é a evidência de que esse pensamento é verdadeiro?</li>
              <li>O que eu diria a um amigo que tivesse esse mesmo pensamento?</li>
            </ul>

            <h2>5. Priorize o Sono</h2>
            <p>
              A falta de sono pode ampliar os pensamentos e sentimentos ansiosos. Estabelecer uma rotina de sono consistente e relaxante é crucial. Tente criar um ambiente de sono calmo, escuro e fresco, e evite telas pelo menos uma hora antes de dormir.
            </p>

            <p>
              Lidar com a ansiedade é uma jornada. Seja paciente e compassivo consigo mesmo. Pequenos passos consistentes podem levar a grandes melhorias em seu bem-estar geral. Se a sua ansiedade for grave, considere procurar a ajuda de um profissional de saúde mental.
            </p>
          </div>

          <Separator />
          
          {/* Author Section */}
          <footer className="flex items-center gap-6">
             <Avatar className="h-20 w-20 border-2 border-primary">
              <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="professional woman smiling" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Escrito por</p>
              <h4 className="text-xl font-bold text-foreground">Ana de Almeida</h4>
              <p className="mt-1 text-base text-muted-foreground">
                Ana é uma psicóloga licenciada com mais de 10 anos de experiência em Terapia Cognitivo-Comportamental e Mindfulness.
              </p>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
