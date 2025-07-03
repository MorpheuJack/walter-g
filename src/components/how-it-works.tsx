import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, CalendarCheck, MessageSquare, Award } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="h-8 w-8 text-primary" />,
    title: '1. Find Your Therapist',
    description: 'Browse our directory of licensed therapists and find the right one for you.',
  },
  {
    icon: <CalendarCheck className="h-8 w-8 text-primary" />,
    title: '2. Book a Session',
    description: 'Schedule a session at a time that works for you, right from their profile.',
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: '3. Start Your Journey',
    description: 'Connect with your therapist via secure video call and begin your path to wellness.',
  },
    {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: '4. Grow and Heal',
    description: 'Engage in ongoing therapy to build resilience and achieve your mental health goals.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Simple Path to Support</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We make starting therapy straightforward and stress-free. Here's how to get started in just a few clicks.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:max-w-none mt-12">
          {steps.map((step, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-0">
                {step.icon}
                <CardTitle className="mt-4">{step.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2">{step.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
