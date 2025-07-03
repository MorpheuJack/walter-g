'use client';

import { useFormStatus } from 'react-dom';
import { getPersonalizedTipsAction } from '@/app/actions/generate-tips-action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, ArrowRight, Send, Lock, CheckCircle2, Undo2 } from 'lucide-react';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import WalterBenefits from '@/components/walter-benefits';
import Link from 'next/link';

const initialState = {
  message: '',
  errors: { email: [] as string[], issue: [] as string[] },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full rounded-lg py-6 text-lg bg-white/90 text-primary-foreground hover:bg-white transition-all duration-300 transform hover:scale-105">
      {pending ? 'Enviando...' : <><Send className="mr-2 h-5 w-5" /> Enviar Mensagem</>}
    </Button>
  );
}

const howItWorksSteps = [
    {
      step: 1,
      title: 'Compartilhe Seu E-mail',
      description: 'Digite seu e-mail no campo indicado para que possamos entrar em contato.',
    },
    {
      step: 2,
      title: 'Descreva sua situação',
      description: 'Use o campo de texto para nos contar o que está acontecendo. Suas informações são 100% confidenciais.',
    },
    {
      step: 3,
      title: 'Envie sua Mensagem',
      description: 'Clique no botão de envio. Nossa equipe receberá sua mensagem de forma segura.',
    },
    {
      step: 4,
      title: 'Aguarde nosso Contato',
      description: 'Em até 24 horas, um de nossos especialistas entrará em contato com você pelo e-mail fornecido.',
    },
  ];

const popupContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const popupItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export default function Home() {
  const [state, formAction] = useActionState(getPersonalizedTipsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const formAnimationControls = useAnimationControls();

  useEffect(() => {
    if (state.message === 'success') {
      setShowSuccess(true);
      formRef.current?.reset();
    } else if (state.message && !['success', 'Invalid form data.'].includes(state.message)) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: state.message,
      });
    }
  }, [state, toast]);

  const handleReset = () => {
    setShowSuccess(false);
    // This is a workaround to clear previous errors when the form is shown again.
    Object.assign(state, initialState);
  };
  
  const handleScrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartNowClick = () => {
    setIsPopupOpen(false);
    handleScrollToForm();
    formAnimationControls.start({
      boxShadow: [
        '0 0 0 0px hsl(var(--primary) / 0.0)',
        '0 0 0 4px hsl(var(--primary) / 0.7)',
        '0 0 0 0px hsl(var(--primary) / 0.0)',
      ],
      transition: { duration: 1.5, ease: 'easeInOut', times: [0, 0.3, 1] },
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: '0.3' } },
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-12">
        
        <div className="lg:col-span-3">
          <div className="flex flex-col justify-center text-center lg:text-left min-h-screen lg:py-16">
            <motion.div 
              className="flex flex-col justify-center text-foreground items-center lg:items-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="font-headline font-extrabold text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-white to-primary/80 bg-clip-text text-transparent drop-shadow-lg">
                <span className="block">WALTER</span>
                <span>TERAPEUTA</span>
              </h1>
              <p className="mt-2 text-base md:text-lg tracking-[0.2em] text-primary">TERAPIA DIGITAL GRATUITA</p>
              <p className="mt-8 max-w-md text-base md:text-lg text-muted-foreground">
                Deixe sua mensagem e nossa equipe de especialistas em saúde mental entrará em contato para oferecer suporte emocional, de forma completamente gratuita.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button className="rounded-lg bg-primary px-6 py-5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-transform duration-300 hover:scale-105" onClick={handleScrollToForm}>
                  <Heart className="mr-2 h-5 w-5" />
                  Começar Agora
                </Button>
                <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-lg border-accent bg-transparent px-6 py-5 text-base font-semibold text-accent hover:bg-accent/10 transition-transform duration-300 hover:scale-105">
                      Como funciona
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md bg-black/60 backdrop-blur-lg border-white/10 p-8 text-foreground shadow-2xl rounded-3xl">
                    <DialogHeader className="text-center items-center">
                      <DialogTitle className="text-3xl font-bold">Como Funciona o WALTER</DialogTitle>
                      <DialogDescription className="text-muted-foreground mt-2 max-w-sm">
                        Veja como é simples e seguro nos enviar sua mensagem para receber apoio.
                      </DialogDescription>
                    </DialogHeader>
                    <motion.div 
                      className="mt-8 space-y-6"
                      variants={popupContainerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {howItWorksSteps.map((item) => (
                        <motion.div 
                          key={item.step} 
                          className="flex items-start text-left gap-4"
                          variants={popupItemVariants}
                        >
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg shadow-lg">
                            {item.step}
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-bold text-lg text-foreground">{item.title}</h4>
                            <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                    <div className="mt-8 flex justify-center">
                      <Button
                        onClick={handleStartNowClick}
                        className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105"
                      >
                        <Heart className="mr-2 h-5 w-5" />
                        Começar Agora
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          </div>
          <div className="py-16 sm:py-24">
            <WalterBenefits />
          </div>
        </div>

        <div id="form-section" className="lg:col-span-2 lg:sticky lg:top-0 flex items-center h-full lg:h-screen py-12 lg:py-0">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative mx-auto w-full max-w-md rounded-2xl bg-black/30 p-8 shadow-2xl backdrop-blur-xl border border-white/10 overflow-hidden">
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={formAnimationControls}
              />
              <div className="absolute inset-0 z-0 animate-breathing-glow bg-primary/20 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    {!showSuccess ? (
                      <motion.div key="form" variants={cardVariants} initial="hidden" animate="visible" exit="exit">
                        <h2 className="text-3xl font-bold text-foreground">Como podemos te ajudar?</h2>
                        <p className="mt-2 text-muted-foreground">Sua mensagem é confidencial e será enviada para nossa equipe.</p>

                        <form ref={formRef} action={formAction} className="mt-8 space-y-6">
                          <div>
                            <Label htmlFor="email" className="text-muted-foreground">Seu e-mail</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              placeholder="seuemail@exemplo.com" 
                              className="mt-2 bg-input border-border/50 text-foreground placeholder:text-muted-foreground rounded-lg p-3 focus:border-primary focus:ring-primary" 
                              required
                            />
                            {state.errors?.email && <p className="mt-1 text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
                          </div>
                          <div>
                            <Label htmlFor="issue" className="text-muted-foreground">O que está te afligindo?</Label>
                            <Textarea 
                              id="issue" 
                              name="issue" 
                              placeholder="Conte suas dores, medos, ansiedades..." 
                              className="mt-2 min-h-[120px] bg-input border-border/50 text-foreground placeholder:text-muted-foreground rounded-lg p-3 focus:border-primary focus:ring-primary"
                              required
                            />
                            {state.errors?.issue && <p className="mt-1 text-sm font-medium text-destructive">{state.errors.issue[0]}</p>}
                          </div>
                          <SubmitButton />
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div key="success" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
                        <div className="flex flex-col items-center justify-center">
                          <CheckCircle2 className="h-16 w-16 text-green-400 mb-4" />
                          <h3 className="text-2xl font-bold mb-2 text-foreground">Mensagem Enviada!</h3>
                          <p className="text-muted-foreground mb-6">Obrigado por entrar em contato. Responderemos em breve.</p>
                        </div>
                        <Button onClick={handleReset} className="mt-8 w-full" variant="outline">
                          <Undo2 className="mr-2 h-4 w-4" />
                          Enviar outra mensagem
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <p className="mt-6 flex items-center justify-center text-xs text-muted-foreground">
                    <Lock className="mr-2 h-3 w-3" />
                    Suas informações são confidenciais e seguras
                  </p>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
