
'use client';

import { BrainCircuit, ClipboardList, ShieldCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Traduza Seus Sentimentos',
    description: 'Ajudamos a dar nome ao que você sente, explicando de forma simples as possíveis causas por trás da sua ansiedade, tristeza ou confusão.',
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
    title: 'Um Caminho a Seguir',
    description: 'Você recebe um plano com os primeiros passos práticos e fáceis de aplicar para começar a lidar com seus problemas hoje mesmo.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: '100% Confidencial',
    description: 'Suas informações são criptografadas e processadas com segurança absoluta para garantir sua privacidade.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'Argumentos Para Você',
    description: 'Com a análise em mãos, você terá mais segurança e argumentos para, se desejar, conversar com um profissional ou simplesmente entender melhor seu próprio processo.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};


export default function ClarityBenefits() {
  return (
    <section className="text-foreground">
      <div className="">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={itemVariants}
          className="flex flex-col items-start space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-headline bg-gradient-to-br from-white to-primary/80 bg-clip-text text-transparent">Clareza Para o Seu Primeiro Passo</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-lg">
            Entendemos que buscar ajuda pode ser difícil. Por isso, criamos um método para te dar um ponto de partida claro, sem jargões complicados, focado em resultados que você pode sentir.
          </p>
        </motion.div>
        <motion.div 
          className="grid gap-x-10 gap-y-12 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} className="flex items-start gap-5" variants={itemVariants}>
               <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-card text-primary shadow-lg border border-white/10">
                 {benefit.icon}
               </div>
               <div className="flex-1">
                 <h3 className="font-bold text-lg text-foreground">{benefit.title}</h3>
                 <p className="text-muted-foreground text-sm mt-1.5">{benefit.description}</p>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
