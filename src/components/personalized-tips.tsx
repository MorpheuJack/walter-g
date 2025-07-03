'use client';

import { useFormStatus } from 'react-dom';
import { getPersonalizedTipsAction } from '@/app/actions/generate-tips-action';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lightbulb } from 'lucide-react';
import { useActionState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  tips: [],
  errors: { mood: [], stressors: [] },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : 'Get My Tips'}
    </Button>
  );
}

export default function PersonalizedTips() {
  const [state, formAction] = useActionState(getPersonalizedTipsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'success' && state.tips.length > 0) {
      toast({
        title: "Here are your tips!",
        description: "We've generated some personalized tips for you.",
      });
      formRef.current?.reset();
    } else if (state.message && !['success', 'Invalid form data.'].includes(state.message)) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto max-w-4xl px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl font-headline">AI-Powered Well-being</CardTitle>
            <CardDescription className="md:text-lg">
              Get personalized mental health tips based on how you're feeling right now.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mood">What's your current mood?</Label>
                <Input id="mood" name="mood" placeholder="e.g., anxious, tired, overwhelmed" />
                {state.errors?.mood && <p className="text-sm font-medium text-destructive">{state.errors.mood[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="stressors">What's causing you stress?</Label>
                <Input id="stressors" name="stressors" placeholder="e.g., work deadlines, family issues" />
                 {state.errors?.stressors && <p className="text-sm font-medium text-destructive">{state.errors.stressors[0]}</p>}
              </div>
              <SubmitButton />
            </form>

            {state.tips && state.tips.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Your Personalized Tips</h3>
                <ul className="space-y-3 list-disc list-inside bg-background p-6 rounded-lg">
                  {state.tips.map((tip, index) => (
                    <li key={index} className="text-muted-foreground">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
