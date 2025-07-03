import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock, Smartphone, ShieldCheck, Smile } from 'lucide-react';

const benefits = [
  {
    icon: <Smartphone className="h-10 w-10 text-accent" />,
    title: 'Convenience',
    description: 'Access therapy from anywhere, at any time, using your device.',
  },
  {
    icon: <Clock className="h-10 w-10 text-accent" />,
    title: 'Flexibility',
    description: 'Schedule sessions that fit your busy life without the commute.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-accent" />,
    title: 'Confidentiality',
    description: 'Our platform is secure and HIPAA-compliant to protect your privacy.',
  },
  {
    icon: <Smile className="h-10 w-10 text-accent" />,
    title: 'Effectiveness',
    description: 'Online therapy is proven to be just as effective as in-person sessions.',
  },
];

export default function Benefits() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Why Choose Digital Therapy?</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Experience the benefits of modern mental healthcare tailored to your lifestyle.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center">
                {benefit.icon}
                <CardTitle className="mt-4">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
