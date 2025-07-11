
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Play, Pause, Clock, ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const content = [
  {
    "chapter": "00",
    "title": "Introdução: Um Alarme que Não Desliga",
    "description": [
      "A ansiedade parece um alarme que nunca desliga. O coração acelera, a mente dispara com preocupações e uma sensação de aperto no peito se torna uma companhia constante. Se isso soa familiar, saiba que você não está sozinho. A ansiedade é uma das experiências mais comuns no mundo moderno, mas não precisa ser a sua sentença.",
      "No dia a dia, pequenas mudanças de hábito e a aplicação de técnicas específicas podem fazer uma enorme diferença, transformando o modo como você reage aos gatilhos de estresse.",
      "Aqui no Terapia Digital, acreditamos no poder de ferramentas práticas para promover sua saúde mental. Por isso, preparamos uma lista com 5 maneiras eficazes e comprovadas de lidar com a ansiedade no dia a dia, permitindo que você respire mais aliviado e retome as rédeas da sua vida."
    ]
  },
  {
    "chapter": "01",
    "title": "A Técnica da Respiração Diafragmática",
    "description": [
      "Quando a ansiedade ataca, nossa respiração se torna curta e rápida, intensificando a sensação de pânico. A respiração diafragmática, ou abdominal, é a maneira mais rápida de comunicar ao seu cérebro que está tudo bem e que é seguro relaxar.",
      "Como praticar: Encontre um lugar tranquilo e sente-se ou deite-se confortavelmente. Posicione uma mão sobre o peito e a outra sobre o abdômen.",
      "Inspire lentamente pelo nariz por 4 segundos. O objetivo é sentir sua barriga expandir, enquanto o peito se move o mínimo possível. Segure a respiração por 2 segundos.",
      "Expire lentamente pela boca por 6 segundos, sentindo o abdômen se contrair. Repita este ciclo por 5 a 10 vezes.",
      "Essa técnica de relaxamento simples pode ser usada em qualquer lugar – antes de uma reunião importante, no trânsito ou durante uma crise de ansiedade."
    ]
  },
  {
    "chapter": "02",
    "title": "Mindfulness: A Arte de Focar no Agora",
    "description": [
      "A ansiedade prospera com preocupações sobre o futuro ('e se...') e ruminações sobre o passado. O mindfulness, ou atenção plena, é a prática de trazer sua consciência para o momento presente, sem julgamentos.",
      "Para controlar a ansiedade com mindfulness, use a Técnica 5-4-3-2-1. Quando sentir a mente acelerar, pause e identifique: 5 coisas que você pode ver (olhe ao redor e nomeie cinco objetos); 4 coisas que você pode sentir (a textura da sua roupa, a cadeira sob você); 3 coisas que você pode ouvir (o teclado, um pássaro lá fora); 2 coisas que você pode cheirar (o aroma do café, um perfume); e 1 coisa que você pode provar (um gole de água).",
      "Essa prática ancora você no presente de forma imediata, interrompendo o ciclo de pensamentos ansiosos e trazendo sua atenção para a realidade sensorial."
    ]
  },
  {
    "chapter": "03",
    "title": "Organize Suas Preocupações: O 'Tempo de Preocupação'",
    "description": [
      "Pode parecer contraintuitivo, mas agendar um horário para se preocupar é uma técnica poderosa da Terapia Cognitivo-Comportamental (TCC). Em vez de deixar a ansiedade consumir seu dia inteiro, você designa um período específico para ela.",
      "Para implementar, agende um horário fixo de 15 a 20 minutos no seu dia, evitando que seja perto da hora de dormir. Quando uma preocupação surgir fora desse período, anote-a e diga a si mesmo: 'Vou pensar sobre isso no meu tempo de preocupação'.",
      "Durante o tempo agendado, revise a lista. Você pode descobrir que muitas das preocupações já não parecem tão urgentes. Para as que restam, pense em um pequeno passo que você pode dar para resolvê-las. Isso ajuda a conter a ansiedade, em vez de deixá-la livre para aparecer a qualquer momento."
    ]
  },
  {
    "chapter": "04",
    "title": "Movimente o Corpo para Acalmar a Mente",
    "description": [
      "A atividade física é um dos antidepressivos e ansiolíticos mais naturais que existem. Exercícios liberam endorfinas, neurotransmissores que promovem uma sensação de bem-estar e aliviam a tensão física e mental.",
      "Você não precisa correr uma maratona. Encontrar uma atividade que você goste é a chave para a consistência. Pode ser uma caminhada de 20 minutos para espairecer, uma prática de yoga que combina movimento e respiração, ou simplesmente dançar sua música favorita.",
      "O importante é quebrar o estado de imobilidade e tensão que a ansiedade muitas vezes impõe, usando o movimento para mudar seu estado fisiológico e emocional."
    ]
  },
  {
    "chapter": "05",
    "title": "Questione Seus Pensamentos Ansiosos",
    "description": [
      "A ansiedade muitas vezes nos faz acreditar em cenários catastróficos como se fossem fatos. Aprender a questionar esses pensamentos é fundamental para reduzir seu poder sobre você.",
      "Quando um pensamento ansioso surgir, pergunte-se: Qual é a evidência real de que isso vai acontecer? Qual é a pior coisa que realisticamente poderia acontecer, e eu conseguiria lidar com isso?",
      "Questione também: Existe uma maneira mais positiva ou realista de ver esta situação? Que conselho eu daria a um amigo que estivesse pensando isso?",
      "Ao desafiar a validade desses pensamentos, você cria uma distância saudável entre você e a sua ansiedade, percebendo que seus pensamentos não são, necessariamente, a realidade."
    ]
  },
  {
    "chapter": "06",
    "title": "Conclusão: Seu Próximo Passo",
    "description": [
      "Lidar com a ansiedade no dia a dia é um processo contínuo, não uma solução instantânea. Comece escolhendo uma ou duas dessas técnicas para praticar. Seja gentil consigo mesmo e celebre as pequenas vitórias.",
      "Lembre-se: entender como controlar a ansiedade é um ato de autocuidado e fortalecimento.",
      "Se a ansiedade continua sendo um obstáculo significativo em sua vida, buscar o apoio de um profissional de saúde mental é um passo corajoso e transformador. Aqui no Terapia Digital, conectamos você a psicólogos qualificados que podem oferecer orientação personalizada e estratégias eficazes para o seu bem-estar."
    ]
  }
];

const ChapterSection = ({ chapter, title, description, isReversed }: { chapter: string; title: string; description: string[]; isReversed?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <motion.section 
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 lg:gap-12 px-4 py-24"
    >
      <div className={`self-start lg:sticky lg:top-32 lg:col-span-1 ${isReversed ? 'lg:order-last' : ''}`}>
        <p className="text-[10rem] lg:text-[15rem] font-black text-foreground/10 leading-none text-center lg:text-left">{chapter}</p>
      </div>

      <div className="lg:col-span-2">
        <div className="w-full space-y-6">
          <h3 className="text-3xl font-bold tracking-tight text-primary">
            {title}
          </h3>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            {description.map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const stats = [
    { value: '10 anos', label: 'no mercado' },
    { value: '500+', label: 'projetos concluídos' },
    { value: '99%', label: 'de clientes satisfeitos' },
];

const CallToActionSection = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="bg-card/50 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "url('https://placehold.co/1920x1080.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} data-ai-hint="dark green leaves"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Transformamos escritórios em zonas de trabalho confortáveis</h2>
                            <p className="text-muted-foreground text-lg">Até mesmo um ambiente de negócios deve ser agradável, por isso criamos projetos únicos que contribuem para o trabalho produtivo de seus funcionários.</p>
                        </div>
                        <div/>
                    </div>
                    <div className="relative z-10 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="relative rounded-2xl overflow-hidden group">
                            <Image src="https://placehold.co/600x400.png" alt="Office with plants" width={600} height={400} className="w-full h-full object-cover" data-ai-hint="office plants" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                 <button className="h-20 w-20 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/50 transition-all duration-300">
                                    <Play className="h-10 w-10 text-white fill-white" />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl flex items-center gap-6">
                                    <p className="text-5xl font-bold text-white">{stat.value}</p>
                                    <p className="text-muted-foreground text-lg">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default function BlogPostPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState('1');
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

  const handlePlaybackRateChange = (rate: string) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = parseFloat(rate);
      setPlaybackRate(rate);
    }
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
    <div className="w-full bg-background text-foreground">
      <header className="container mx-auto max-w-6xl px-4 py-24 md:py-32 text-left">
         <Badge variant="secondary">Ansiedade</Badge>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-3xl">
          5 Maneiras de Lidar com a Ansiedade no Dia a Dia
        </h1>
        <div className="mt-8 max-w-xl space-y-4">
            <div className="flex items-center gap-4">
                <Button 
                    onClick={toggleAudio}
                    variant="outline"
                    size="icon"
                    className="rounded-full h-14 w-14 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 group flex-shrink-0">
                    {isPlaying ? (
                        <Pause className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                        <Play className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    )}
                </Button>
                <div className="w-full flex items-center gap-3">
                    <span className="text-sm text-muted-foreground font-mono">{formatTime(currentTime)}</span>
                    <Slider
                        value={[progress]}
                        onValueChange={handleProgressChange}
                        max={100}
                        step={1}
                    />
                    <span className="text-sm text-muted-foreground font-mono">{formatTime(duration)}</span>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 rounded-lg border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300">
                        <Clock className="h-4 w-4" />
                        <span>{playbackRate}x</span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-24 bg-card">
                    <DropdownMenuRadioGroup value={playbackRate} onValueChange={handlePlaybackRateChange}>
                        <DropdownMenuRadioItem value="0.5">0.5x</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="1">1x</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="1.5">1.5x</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="2">2x</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
      </header>
      
      <div className="flex flex-col">
        {content.map((item, index) => (
          <ChapterSection 
            key={index} 
            chapter={item.chapter} 
            title={item.title} 
            description={item.description}
            isReversed={index % 2 !== 0} 
          />
        ))}
      </div>
      <CallToActionSection />
      <audio ref={audioRef} src="/audio-placeholder.mp3" />
    </div>
  );
}
