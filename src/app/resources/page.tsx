'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ResourceCard from '@/components/resource-card';

const resources = [
  // Placeholder data
  {
    title: 'Understanding Anxiety and How to Cope',
    category: 'Article',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'calm nature',
    description: 'Learn about the different types of anxiety disorders and practical strategies for managing symptoms.',
  },
  {
    title: 'Mindfulness Meditation for Beginners',
    category: 'Video',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'meditation peaceful',
    description: 'A guided 10-minute video to introduce you to the practice of mindfulness for stress reduction.',
  },
  {
    title: 'The Importance of Sleep for Mental Health',
    category: 'Article',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'peaceful sleep',
    description: 'Explore the deep connection between sleep quality and your emotional well-being.',
  },
  {
    title: 'Building Healthier Relationships',
    category: 'Article',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'happy couple',
    description: 'Discover communication techniques and boundary-setting skills for stronger connections.',
  },
  {
    title: 'Guided Deep Breathing Exercise',
    category: 'Video',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'person breathing',
    description: 'Follow along with this short video to calm your nervous system in moments of stress.',
  },
  {
    title: 'Cognitive Behavioral Therapy (CBT) Explained',
    category: 'Article',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'brain illustration',
    description: 'An overview of one of the most effective therapeutic approaches for various conditions.',
  },
];

export default function ResourcesPage() {
  const [category, setCategory] = useState('all');
  
  const allCategories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];

  const filteredResources = resources.filter(r => category === 'all' || r.category === category);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl font-headline">Resource Library</h1>
        <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
          Explore articles, videos, and tools to support your mental health journey.
        </p>
      </div>

      <div className="mb-8 flex justify-end">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {allCategories.map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
    </div>
  );
}
