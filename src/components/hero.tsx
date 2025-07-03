import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="w-full bg-card py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Find Your Path to Mental Wellness
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Accessible, affordable, and confidential online therapy. Connect
                with licensed therapists from the comfort of your home.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/therapists">Find a Therapist</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
          <Image
            src="https://placehold.co/600/400"
            data-ai-hint="calm therapy session"
            width="600"
            height="400"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  );
}
