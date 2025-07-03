'use client';

import { useFormStatus } from 'react-dom';
import { getPersonalizedTipsAction } from '@/app/actions/generate-tips-action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, ArrowRight, Send, Lock, Sparkles, CheckCircle2, Undo2 } from 'lucide-react';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import WalterBenefits from '@/components/walter-benefits';

const initialState = {
  message: '',
  tips: [] as string[],
  errors: { email: [] as string[], issue: [] as string[] },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full rounded-lg py-6 text-lg bg-white/90 text-primary-foreground hover:bg-white transition-all duration-300 transform hover:scale-105">
      {pending ? 'Enviando...' : <><Send className="mr-2 h-5 w-5" /> Receber Apoio Gratuito</>}
    </Button>
  );
}

const howItWorksSteps = [
    {
      step: 1,
      title: 'Compartilhe Seu E-mail',
      description: 'Digite seu e-mail no campo indicado. Suas informações são 100% seguras e confidenciais.',
    },
    {
      step: 2,
      title: 'Desabafe Suas Dores',
      description: 'Conte o que está te incomodando no campo de texto. Seja honesto e aberto - Walter está aqui para te ajudar.',
    },
    {
      step: 3,
      title: 'Receba Apoio Imediato',
      description: 'Clique em "Receber Apoio Gratuito" e aguarde. Walter analisará sua situação com cuidado e empatia.',
    },
    {
      step: 4,
      title: 'Resposta Personalizada',
      description: 'Em até 24 horas, você receberá uma resposta detalhada e personalizada em seu e-mail com orientações e apoio.',
    },
  ];

export default function Home() {
  const [state, formAction] = useActionState(getPersonalizedTipsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    if (state.message === 'success' && state.tips.length > 0) {
      setShowTips(true);
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
    setShowTips(false);
    // This is a workaround to clear previous errors when the form is shown again.
    Object.assign(state, initialState);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-24">
        
        <div className="flex flex-col gap-y-32 py-16">
          <motion.div 
            className="flex flex-col justify-center text-foreground min-h-[60vh]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="font-headline font-extrabold text-6xl md:text-8xl bg-gradient-to-br from-white to-primary/80 bg-clip-text text-transparent drop-shadow-lg">
              <span className="block">WALTER</span>
              <span>TERAPEUTA</span>
            </h1>
            <p className="mt-2 text-lg tracking-[0.2em] text-primary">TERAPIA DIGITAL GRATUITA</p>
            <p className="mt-8 max-w-md text-lg text-muted-foreground">
              Conte suas dores e receba ajuda imediata. Walter é um terapeuta digital especializado em saúde mental que oferece suporte emocional 24h por dia, 7 dias por semana, de forma completamente gratuita.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button className="rounded-lg bg-primary px-6 py-5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-transform duration-300 hover:scale-105">
                <Heart className="mr-2 h-5 w-5" />
                Começar Agora
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-lg border-primary bg-transparent px-6 py-5 text-base font-semibold text-primary hover:bg-primary/10 transition-transform duration-300 hover:scale-105">
                    Como funciona
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-card border-border/50 p-8 text-foreground shadow-2xl rounded-2xl">
                  <DialogHeader className="text-center items-center">
                    <DialogTitle className="text-3xl font-bold">Como Funciona o WALTER</DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                      Siga estes simples passos para receber apoio emocional personalizado
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-8 space-y-6">
                    {howItWorksSteps.map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-foreground">{item.title}</h4>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <DialogClose asChild>
                      <Button size="lg" className="bg-gradient-to-r from-primary via-accent to-primary/80 text-primary-foreground rounded-full py-5 px-8 text-base font-semibold hover:opacity-90 transition-opacity">
                        <Heart className="mr-2 h-5 w-5" />
                        Começar Agora
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
          <WalterBenefits />
        </div>

        <div className="lg:sticky lg:top-16 h-fit py-16">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative w-full max-w-md rounded-2xl bg-black/30 p-8 shadow-2xl backdrop-blur-xl border border-white/10">
              <AnimatePresence mode="wait">
                {!showTips ? (
                  <motion.div key="form" variants={cardVariants} initial="hidden" animate="visible" exit="exit">
                    <h2 className="text-3xl font-bold text-foreground">Como posso te ajudar hoje?</h2>
                    <p className="mt-2 text-muted-foreground">Conte o que está te incomodando e receba ajuda imediata.</p>

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
                  <motion.div key="tips" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
                    <div className="flex flex-col items-center justify-center">
                      <CheckCircle2 className="h-16 w-16 text-green-400 mb-4" />
                      <h3 className="text-2xl font-bold mb-2 text-foreground flex items-center gap-2 justify-center"><Sparkles className="h-6 w-6 text-accent" />Walter Sugere:</h3>
                      <p className="text-muted-foreground mb-6">Aqui estão algumas dicas para te ajudar a seguir em frente.</p>
                    </div>
                    <ul className="space-y-3 list-inside text-left bg-black/20 p-4 rounded-lg border border-white/10">
                      {state.tips.map((tip, index) => (
                        <li key={index} className="text-muted-foreground flex items-start gap-2">
                          <Heart className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                    <Button onClick={handleReset} className="mt-8 w-full" variant="outline">
                      <Undo2 className="mr-2 h-4 w-4" />
                      Pedir novo conselho
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="mt-6 flex items-center justify-center text-xs text-muted-foreground">
                <Lock className="mr-2 h-3 w-3" />
                Suas informações são confidenciais e seguras
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
