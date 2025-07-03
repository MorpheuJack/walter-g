'use client';

import { Clock, Zap, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Disponível 24/7',
    description: 'Walter está sempre aqui para você, a qualquer hora do dia ou da noite, sem necessidade de agendamento.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Respostas Imediatas',
    description: 'Receba apoio e conselhos práticos instantaneamente, no momento em que você mais precisa.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: '100% Confidencial',
    description: 'Suas conversas são totalmente privadas e seguras, criando um espaço seguro para você se abrir.',
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'Completamente Gratuito',
    description: 'Acesse suporte de qualidade para sua saúde mental sem nenhum custo, de forma ilimitada.',
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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-headline bg-gradient-to-br from-white to-primary/80 bg-clip-text text-transparent">Por que conversar com Walter?</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-lg">
            Descubra as vantagens de ter um terapeuta digital sempre ao seu lado, oferecendo apoio contínuo e personalizado para sua jornada de bem-estar.
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
