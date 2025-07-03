import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';

interface ResourceCardProps {
  title: string;
  category: string;
  imageUrl: string;
  aiHint: string;
  description: string;
}

export default function ResourceCard({ title, category, imageUrl, aiHint, description }: ResourceCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Image
          src={imageUrl}
          data-ai-hint={aiHint}
          alt={title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-4 right-4">{category}</Badge>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <CardTitle className="mb-2 text-xl">{title}</CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="secondary" className="w-full" asChild>
          <Link href="#">Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
