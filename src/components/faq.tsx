import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'Is online therapy effective?',
    answer: 'Yes, numerous studies have shown that online therapy can be just as effective as in-person therapy for a wide range of mental health issues.',
  },
  {
    question: 'How do I choose a therapist?',
    answer: 'You can browse our directory of licensed therapists, read their profiles and specialties, and choose someone who you feel is a good fit. Many offer introductory calls.',
  },
  {
    question: 'Is my information kept private?',
    answer: 'Absolutely. Our platform is HIPAA-compliant, and all communications between you and your therapist are encrypted and confidential.',
  },
  {
    question: 'What are the costs?',
    answer: 'Costs vary depending on the therapist. Each therapist sets their own rates, which are listed on their profile. Some may accept insurance.',
  },
  {
    question: 'How do I book an appointment?',
    answer: 'Once you find a therapist you like, you can see their availability and book a session directly from their profile page. You will receive a confirmation email with all the details.',
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Find answers to common questions about our digital therapy services.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
