
'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import TableOfContents from '@/components/table-of-contents';

const content = [
  {
    id: 'introduction',
    title: 'Introdução: Um Alarme que Não Desliga',
    paragraphs: [
      "A ansiedade parece um alarme que nunca desliga. O coração acelera, a mente dispara com preocupações e uma sensação de aperto no peito se torna uma companhia constante. Se isso soa familiar, saiba que você não está sozinho. A ansiedade é uma das experiências mais comuns no mundo moderno, mas não precisa ser a sua sentença.",
      "No dia a dia, pequenas mudanças de hábito e a aplicação de técnicas específicas podem fazer uma enorme diferença, transformando o modo como você reage aos gatilhos de estresse.",
      "Aqui no Terapia Digital, acreditamos no poder de ferramentas práticas para promover sua saúde mental. Por isso, preparamos uma lista com 5 maneiras eficazes e comprovadas de lidar com a ansiedade no dia a dia, permitindo que você respire mais aliviado e retome as rédeas da sua vida."
    ]
  },
  {
    id: 'breathing-technique',
    title: 'A Técnica da Respiração Diafragmática',
    paragraphs: [
      "Quando a ansiedade ataca, nossa respiração se torna curta e rápida, intensificando a sensação de pânico. A respiração diafragmática, ou abdominal, é a maneira mais rápida de comunicar ao seu cérebro que está tudo bem e que é seguro relaxar.",
      "Como praticar: Encontre um lugar tranquilo e sente-se ou deite-se confortavelmente. Posicione uma mão sobre o peito e a outra sobre o abdômen.",
      "Inspire lentamente pelo nariz por 4 segundos. O objetivo é sentir sua barriga expandir, enquanto o peito se move o mínimo possível. Segure a respiração por 2 segundos.",
      "Expire lentamente pela boca por 6 segundos, sentindo o abdômen se contrair. Repita este ciclo por 5 a 10 vezes.",
      "Essa técnica de relaxamento simples pode ser usada em qualquer lugar – antes de uma reunião importante, no trânsito ou durante uma crise de ansiedade."
    ]
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness: A Arte de Focar no Agora',
    paragraphs: [
      "A ansiedade prospera com preocupações sobre o futuro ('e se...') e ruminações sobre o passado. O mindfulness, ou atenção plena, é a prática de trazer sua consciência para o momento presente, sem julgamentos.",
      "Para controlar a ansiedade com mindfulness, use a Técnica 5-4-3-2-1. Quando sentir a mente acelerar, pause e identifique: 5 coisas que você pode ver (olhe ao redor e nomeie cinco objetos); 4 coisas que você pode sentir (a textura da sua roupa, a cadeira sob você); 3 coisas que você pode ouvir (o teclado, um pássaro lá fora); 2 coisas que você pode cheirar (o aroma do café, um perfume); e 1 coisa que você pode provar (um gole de água).",
      "Essa prática ancora você no presente de forma imediata, interrompendo o ciclo de pensamentos ansiosos e trazendo sua atenção para a realidade sensorial."
    ]
  },
  {
    id: 'worry-time',
    title: 'Organize Suas Preocupações: O "Tempo de Preocupação"',
    paragraphs: [
      "Pode parecer contraintuitivo, mas agendar um horário para se preocupar é uma técnica poderosa da Terapia Cognitivo-Comportamental (TCC). Em vez de deixar a ansiedade consumir seu dia inteiro, você designa um período específico para ela.",
      "Para implementar, agende um horário fixo de 15 a 20 minutos no seu dia, evitando que seja perto da hora de dormir. Quando uma preocupação surgir fora desse período, anote-a e diga a si mesmo: 'Vou pensar sobre isso no meu tempo de preocupação'.",
      "Durante o tempo agendado, revise a lista. Você pode descobrir que muitas das preocupações já não parecem tão urgentes. Para as que restam, pense em um pequeno passo que você pode dar para resolvê-las. Isso helps a conter a ansiedade, em vez de deixá-la livre para aparecer a qualquer momento."
    ]
  },
  {
    id: 'movement',
    title: 'Movimente o Corpo para Acalmar a Mente',
    paragraphs: [
      "A atividade física é um dos antidepressivos e ansiolíticos mais naturais que existem. Exercícios liberam endorfinas, neurotransmissores que promovem uma sensação de bem-estar e aliviam a tensão física e mental.",
      "Você não precisa correr uma maratona. Encontrar uma atividade que você goste é a chave para a consistência. Pode ser uma caminhada de 20 minutos para espairecer, uma prática de yoga que combina movimento e respiração, ou simplesmente dançar sua música favorita.",
      "O importante é quebrar o estado de imobilidade e tensão que a ansiedade muitas vezes impõe, usando o movimento para mudar seu estado fisiológico e emocional."
    ]
  },
  {
    id: 'question-thoughts',
    title: 'Questione Seus Pensamentos Ansiosos',
    paragraphs: [
      "A ansiedade muitas vezes nos faz acreditar em cenários catastróficos como se fossem fatos. Aprender a questionar esses pensamentos é fundamental para reduzir seu poder sobre você.",
      "Quando um pensamento ansioso surgir, pergunte-se: Qual é a evidência real de que isso vai acontecer? Qual é a pior coisa que realisticamente poderia acontecer, e eu conseguiria lidar com isso?",
      "Questione também: Existe uma maneira mais positiva ou realista de ver esta situação? Que conselho eu daria a um amigo que estivesse pensando isso?",
      "Ao desafiar a validade desses pensamentos, você cria uma distância saudável entre você e a sua ansiedade, percebendo que seus pensamentos não são, necessarily, a realidade."
    ]
  },
  {
    id: 'conclusion',
    title: 'Conclusão: Seu Próximo Passo',
    paragraphs: [
      "Lidar com a ansiedade no dia a dia é um processo contínuo, não uma solução instantânea. Comece escolhendo uma ou duas dessas técnicas para praticar. Seja gentil consigo mesmo e celebre as pequenas vitórias.",
      "Lembre-se: entender como controlar a ansiedade é um ato de autocuidado e fortalecimento.",
      "Se a ansiedade continua sendo um obstáculo significativo em sua vida, buscar o apoio de um profissional de saúde mental é um passo corajoso e transformador. Aqui no Terapia Digital, conectamos você a psicólogos qualificados que podem oferecer orientação personalizada e estratégias eficazes para o seu bem-estar."
    ]
  }
];

const posts = [
  {
    title: '5 Maneiras de Lidar com a Ansiedade no Dia a Dia',
    category: 'Ansiedade',
    imageUrl: 'https://placehold.co/1200x800.png',
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


const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleAudio = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };
    
    const formatTime = (time: number) => {
      if (isNaN(time)) return '00:00';
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
  
    const handleProgressChange = (value: number[]) => {
      if (audioRef.current) {
        const newTime = (value[0] / 100) * duration;
        audioRef.current.currentTime = newTime;
        setProgress(value[0]);
      }
    };
  
    const handlePlaybackRateChange = () => {
      const rates = [1.0, 1.25, 1.5, 2.0, 0.75];
      const currentIndex = rates.indexOf(playbackRate);
      const nextRate = rates[(currentIndex + 1) % rates.length];
      if (audioRef.current) {
        audioRef.current.playbackRate = nextRate;
      }
      setPlaybackRate(nextRate);
    };
  
    useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
        const updateProgress = () => {
          const currentProgress = (audio.currentTime / audio.duration) * 100;
          setProgress(currentProgress);
          setCurrentTime(audio.currentTime);
        };
        
        const setAudioData = () => {
          setDuration(audio.duration);
        }
  
        const handleEnded = () => {
          setIsPlaying(false);
          setProgress(0);
          audio.currentTime = 0;
        }
  
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('ended', handleEnded);
  
        return () => {
          audio.removeEventListener('timeupdate', updateProgress);
          audio.removeEventListener('loadedmetadata', setAudioData);
          audio.removeEventListener('ended', handleEnded);
        };
      }
    }, []);

    return (
        <div className="rounded-xl bg-card p-6 border border-white/10 w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button onClick={toggleAudio} variant="ghost" size="icon" className="h-14 w-14 flex-shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <div className="flex w-full flex-col gap-2">
                    <span className="text-sm font-semibold text-foreground">5 Maneiras de Lidar com a Ansiedade...</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground font-mono tabular-nums">{formatTime(currentTime)}</span>
                      <Slider value={[progress]} onValueChange={handleProgressChange} max={100} step={1} />
                      <span className="text-xs text-muted-foreground font-mono tabular-nums">{formatTime(duration)}</span>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <Button onClick={() => audioRef.current && (audioRef.current.currentTime = 0)} variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                        <RotateCcw className="h-5 w-5" />
                    </Button>
                    <Button onClick={handlePlaybackRateChange} variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                        <span className="text-sm font-bold">{playbackRate.toFixed(1)}x</span>
                    </Button>
                     <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                        <Volume2 className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            <audio ref={audioRef} src="/audio-placeholder.mp3" />
        </div>
    )
}


export default function BlogPostPage() {
  const navLinks = content.map(item => ({ href: `#${item.id}`, label: item.title }));
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const isTriggerInView = useInView(triggerRef, {
    rootMargin: "0px 0px -40% 0px",
  });
  
  const footerRef = useRef<HTMLDivElement>(null);
  const isFooterVisible = useInView(footerRef, {
      rootMargin: "0px 0px 100% 0px"
  });

  useEffect(() => {
    setSidebarVisible(!isTriggerInView);
  }, [isTriggerInView]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="relative">
        <motion.div
          layout
          transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
          className="space-y-12 flex flex-col items-center"
        >
          <header className="space-y-4 text-center max-w-4xl">
            <p className="font-semibold text-primary">Artigo Completo</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              5 Maneiras de Lidar com a Ansiedade no Dia a Dia
            </h1>
            <p className="text-lg text-muted-foreground">
              Estratégias práticas e eficazes para gerenciar a ansiedade e encontrar mais calma em sua rotina diária, permitindo que você respire mais aliviado.
            </p>
          </header>
          <AudioPlayer />
        </motion.div>

        <div className="mt-16 relative">
          <AnimatePresence>
            {isSidebarVisible && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className={`hidden lg:block top-24 left-16 w-64 ${!isFooterVisible ? 'fixed' : 'absolute bottom-0'}`}
              >
                <TableOfContents
                  navLinks={navLinks}
                  featuredPosts={posts.slice(1, 4)}
                  showExtras={true}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col items-center">
             <div className="w-full max-w-4xl">
                <div ref={triggerRef} className="my-12">
                   <TableOfContents navLinks={navLinks} featuredPosts={[]} showExtras={false} />
                </div>
                
                <motion.article
                  layout
                  className={`prose prose-lg max-w-none prose-headings:font-bold prose-p:text-muted-foreground transition-all duration-300 ${
                    isSidebarVisible ? 'lg:ml-80' : ''
                  }`}
                >
                  {content.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-24">
                      <h2>{section.title}</h2>
                      {section.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </section>
                  ))}
                </motion.article>
            </div>
          </div>
        </div>
      </div>
      <div ref={footerRef}></div>
    </div>
  );
}

```
  </change>
  <change>
    <file>/src/app/layout.tsx</file>
    <content><![CDATA[import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Terapia Digital',
  description: 'Terapia digital e gratuita para todos.',
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Terapia Digital",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth dark">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col'
        )}
      >
        <div className="flex-grow">{children}</div>
        <Footer />
        <Toaster />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-5KHQZCRJWP"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5KHQZCRJWP');
          `}
        </Script>
        <Script id="hotjar-tracking" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6454364,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      </body>
    </html>
  );
}

  