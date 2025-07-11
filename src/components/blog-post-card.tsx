import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogPostCardProps {
  title: string;
  category: string;
  imageUrl: string;
  aiHint: string;
  description: string;
}

export default function BlogPostCard({ title, category, imageUrl, aiHint, description }: BlogPostCardProps) {
  return (
    <Link href="#" className="group block overflow-hidden rounded-2xl">
      <div className="relative h-80 w-full transform transition-all duration-500 ease-in-out group-hover:scale-110">
        <Image
          src={imageUrl}
          data-ai-hint={aiHint}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <Badge className="mb-2 w-fit bg-primary/80 text-primary-foreground backdrop-blur-sm">{category}</Badge>
          <h3 className="text-2xl font-bold leading-tight">{title}</h3>
          <p className="mt-2 text-sm text-primary/80 line-clamp-2">{description}</p>
          <div className="mt-4 flex items-center text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Leia Mais <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
