import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogPostCardProps {
  slug: string;
  title: string;
  category: string;
  imageUrl: string;
  aiHint: string;
  description: string;
}

export default function BlogPostCard({ slug, title, category, imageUrl, aiHint, description }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-52 w-full">
        <Image
          src={imageUrl}
          data-ai-hint={aiHint}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className='p-6'>
        <Badge className="mb-2 w-fit">{category}</Badge>
        <h3 className="text-xl font-bold leading-tight text-card-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center text-sm font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Leia Mais <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
