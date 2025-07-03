import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TherapistCardProps {
  name: string;
  specialties: string[];
  imageUrl: string;
  aiHint: string;
}

export default function TherapistCard({ name, specialties, imageUrl, aiHint }: TherapistCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Image
          src={imageUrl}
          data-ai-hint={aiHint}
          alt={`Portrait of ${name}`}
          width={300}
          height={300}
          className="w-full h-64 object-cover"
        />
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <CardTitle className="mb-2 text-xl">{name}</CardTitle>
        <div className="flex flex-wrap gap-2">
          {specialties.map(spec => (
            <Badge key={spec} variant="secondary">{spec}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full">Book Session</Button>
      </CardFooter>
    </Card>
  );
}
