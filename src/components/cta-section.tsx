import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section id="booking" className="py-12 md:py-24 lg:py-32 bg-card">
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Ready to Take the First Step?</h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed mt-4">
          Your journey towards a healthier mind starts here. Find a therapist and book your first session today.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/therapists">Browse Therapists</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
