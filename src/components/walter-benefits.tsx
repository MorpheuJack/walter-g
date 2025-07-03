'use client';

import { BrainCircuit, ClipboardList, ShieldCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Análise Técnica Profunda',
    description: 'Identificamos padrões cognitivos e a raiz neuropsicológica do problema, indo além dos sintomas superficiais.',
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
    title: 'Plano de Ação Estruturado',
    description: 'Você recebe um cronograma com ferramentas práticas, técnicas de TCC e exercícios para implementar imediatamente.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: '100% Confidencial',
    description: 'Suas informações são criptografadas e processadas com segurança absoluta para garantir sua privacidade.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'Foco em Resultados',
    description: 'Fornecemos métricas claras para que você possa acompanhar seu progresso e ver a eficácia das estratégias.',
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


export default function WalterBenefits() {
  return (
    <section className="text-foreground">
      <div className="container px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={itemVariants}
          className="flex flex-col items-start space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-headline bg-gradient-to-br from-white to-primary/80 bg-clip-text text-transparent">A Metodologia Walter</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-lg">
            Nossa abordagem combina análise de dados, neurociência e psicologia baseada em evidências para fornecer um plano de ação claro e mensurável.
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
