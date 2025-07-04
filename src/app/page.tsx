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

const initialState = {
  message: '',
  errors: { email: [] as string[], issue: [] as string[] },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full rounded-lg py-6 text-lg bg-white/90 text-primary-foreground hover:bg-white transition-all duration-300 transform hover:scale-105">
      {pending ? 'Enviando...' : <><Send className="mr-2 h-5 w-5" /> Enviar para Análise</>}
    </Button>
  );
}

const howItWorksSteps = [
    {
      step: 1,
      title: 'Você Descreve',
      description: 'Conte-nos o que está sentindo, de forma simples e confidencial. Não precisa ser um especialista.',
    },
    {
      step: 2,
      title: 'Nós Analisamos',
      description: 'Nossos especialistas analisam sua descrição para identificar as possíveis causas e padrões por trás dos seus sentimentos.',
    },
    {
      step: 3,
      title: 'Você Recebe Clareza',
      description: 'Enviamos para seu e-mail uma explicação clara do que pode estar acontecendo e um plano de ação com os primeiros passos práticos.',
    },
    {
      step: 4,
      title: 'Você Começa a Agir',
      description: 'Use as ferramentas e estratégias que recomendamos para começar a ver mudanças e entender seu progresso.',
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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex items-center min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-12 w-full">
        
        <div className="lg:col-span-3 py-12 lg:py-0">
          <motion.div 
            className="flex flex-col justify-center text-foreground items-center lg:items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="font-headline font-extrabold text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-white to-primary/80 bg-clip-text text-transparent drop-shadow-lg">
              <span className="block">ENTENDA O QUE VOCÊ SENTE</span>
              <span>RECEBA UM PLANO DE AÇÃO</span>
            </h1>
            <p className="mt-2 text-base md:text-lg tracking-[0.2em] text-primary">SEU PRIMEIRO PASSO PARA O BEM-ESTAR MENTAL</p>
            <p className="mt-8 max-w-md text-base md:text-lg text-muted-foreground">
            Se você nunca fez terapia, é normal se sentir perdido. Descreva sua situação e receba uma primeira análise que te dará clareza e um plano de ação para começar a resolver seus problemas.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button className="rounded-lg bg-primary px-6 py-5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-transform duration-300 hover:scale-105" onClick={handleScrollToForm}>
                <Heart className="mr-2 h-5 w-5" />
                Começar Análise
              </Button>
              <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-lg border-accent bg-transparent px-6 py-5 text-base font-semibold text-accent hover:bg-accent/10 transition-transform duration-300 hover:scale-105">
                    Como funciona
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-black/60 backdrop-blur-lg border-white/10 p-6 sm:p-8 text-foreground shadow-2xl rounded-3xl">
                  <DialogHeader className="text-center items-center">
                    <DialogTitle className="text-3xl font-bold">Como Funciona Sua Primeira Análise</DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2 max-w-sm">
                      Veja como é simples ter clareza sobre seus sentimentos em 4 passos.
                    </DialogDescription>
                  </DialogHeader>
                  <motion.div 
                    className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8"
                    variants={popupContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {howItWorksSteps.map((item) => (
                      <motion.div 
                        key={item.step} 
                        className="flex items-start text-left gap-4 md:flex-col md:items-center md:text-center"
                        variants={popupItemVariants}
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg shadow-lg">
                          {item.step}
                        </div>
                        <div className="flex-grow md:flex-grow-0">
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
          <div className="pt-16 sm:pt-24 lg:pt-16">
            <WalterBenefits />
          </div>
        </div>

        <div id="form-section" className="lg:col-span-2">
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
                        <h2 className="text-3xl font-bold text-foreground">Comece Sua Primeira Análise</h2>
                        <p className="mt-2 text-muted-foreground">É confidencial, gratuito e o primeiro passo para você se entender melhor.</p>

                        <form ref={formRef} action={formAction} className="mt-8 space-y-6">
                          <div>
                            <Label htmlFor="email" className="text-muted-foreground">Seu e-mail de contato</Label>
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
                            <Label htmlFor="issue" className="text-muted-foreground">Descreva o problema principal</Label>
                            <Textarea 
                              id="issue" 
                              name="issue" 
                              placeholder="Conte com suas palavras o que você tem sentido. Não se preocupe com termos técnicos. Fale sobre seus sentimentos, situações difíceis ou pensamentos que se repetem." 
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
                          <h3 className="text-2xl font-bold mb-2 text-foreground">Análise em Andamento</h3>
                          <p className="text-muted-foreground mb-6">Seu plano de ação personalizado será enviado para o seu e-mail em breve. Verifique sua caixa de spam.</p>
                        </div>
                        <Button onClick={handleReset} className="mt-8 w-full" variant="outline">
                          <Undo2 className="mr-2 h-4 w-4" />
                          Enviar nova análise
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
