'use client';

import { useFormStatus } from 'react-dom';
import { getPersonalizedTipsAction } from '@/app/actions/generate-tips-action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, ArrowRight, Send, Lock } from 'lucide-react';
import { useActionState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  tips: [],
  errors: { email: [], issue: [] },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full rounded-lg py-6 text-lg bg-white/90 text-slate-800 hover:bg-white">
      {pending ? 'Enviando...' : <><Send className="mr-2 h-5 w-5" /> Receber Apoio Gratuito</>}
    </Button>
  );
}

export default function Home() {
  const [state, formAction] = useActionState(getPersonalizedTipsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'success' && state.tips.length > 0) {
      toast({
        title: "Aqui estão suas dicas!",
        description: "Walter gerou algumas dicas personalizadas para você.",
      });
      formRef.current?.reset();
    } else if (state.message && !['success', 'Invalid form data.'].includes(state.message)) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 lg:p-8">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
        
        {/* Left Column */}
        <div className="flex flex-col justify-center text-white">
          <h1 className="font-headline font-extrabold text-6xl md:text-8xl">
            <span className="block">WALTER</span>
            <span>TERAPEUTA</span>
          </h1>
          <p className="mt-2 text-lg tracking-[0.2em] text-primary">TERAPIA DIGITAL GRATUITA</p>
          <p className="mt-8 max-w-md text-lg text-gray-200">
            Conte suas dores e receba ajuda imediata. Walter é um terapeuta digital especializado em saúde mental que oferece suporte emocional 24h por dia, 7 dias por semana, de forma completamente gratuita.
          </p>
          <div className="mt-10 flex gap-4">
            <Button className="rounded-lg bg-primary px-6 py-5 text-base font-semibold text-primary-foreground hover:bg-primary/90">
              <Heart className="mr-2 h-5 w-5" />
              Começar Agora
            </Button>
            <Button variant="outline" className="rounded-lg border-primary bg-transparent px-6 py-5 text-base font-semibold text-primary hover:bg-primary/10">
              Como funciona
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          <div className="w-full max-w-md rounded-2xl bg-black/20 p-8 shadow-2xl backdrop-blur-lg">
            <h2 className="text-3xl font-bold text-white">Como posso te ajudar hoje?</h2>
            <p className="mt-2 text-gray-300">Conte o que está te incomodando e receba ajuda imediata</p>

            <form ref={formRef} action={formAction} className="mt-8 space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-300">Seu e-mail</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="seuemail@exemplo.com" 
                  className="mt-2 bg-input border-white/20 text-white placeholder:text-gray-400 rounded-lg p-3" 
                />
                {state.errors?.email && <p className="mt-1 text-sm font-medium text-red-400">{state.errors.email[0]}</p>}
              </div>
              <div>
                <Label htmlFor="issue" className="text-gray-300">O que está te afligindo?</Label>
                <Textarea 
                  id="issue" 
                  name="issue" 
                  placeholder="Conte suas dores, medos, ansiedades... Walter está aqui para te ajudar." 
                  className="mt-2 min-h-[120px] bg-input border-white/20 text-white placeholder:text-gray-400 rounded-lg p-3"
                />
                {state.errors?.issue && <p className="mt-1 text-sm font-medium text-red-400">{state.errors.issue[0]}</p>}
              </div>
              <SubmitButton />
            </form>
            <p className="mt-6 flex items-center justify-center text-xs text-gray-400">
              <Lock className="mr-2 h-3 w-3" />
              Suas informações são confidenciais e seguras
            </p>
          </div>

          {state.tips && state.tips.length > 0 && (
            <div className="mt-6 w-full max-w-md rounded-2xl bg-black/20 p-6 shadow-2xl backdrop-blur-lg">
              <h3 className="text-xl font-semibold mb-4 text-center text-white">Walter Sugere:</h3>
              <ul className="space-y-3 list-disc list-inside">
                {state.tips.map((tip, index) => (
                  <li key={index} className="text-gray-300">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
