'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TherapistCard from '@/components/therapist-card';
import { Search } from 'lucide-react';

const therapists = [
  // Placeholder data
  {
    name: 'Dr. Evelyn Reed',
    specialties: ['Anxiety', 'Depression', 'CBT'],
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'professional woman smiling',
  },
  {
    name: 'Dr. Samuel Chen',
    specialties: ['Trauma', 'PTSD', 'EMDR'],
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'professional man smiling',
  },
  {
    name: 'Dr. Isabella Rossi',
    specialties: ['Relationships', 'Family Therapy'],
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'therapist portrait',
  },
  {
    name: 'Dr. Marcus Thorne',
    specialties: ['Stress', 'Burnout', 'Mindfulness'],
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'friendly man portrait',
  },
  {
    name: 'Dr. Aisha Khan',
    specialties: ['OCD', 'Phobias', 'Exposure Therapy'],
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'smiling woman portrait',
  },
  {
    name: 'Dr. Leo Martinez',
    specialties: ['Grief', 'Loss', 'Life Transitions'],
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'kind man smiling',
  },
];

export default function TherapistsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('all');

  const allSpecialties = ['all', ...Array.from(new Set(therapists.flatMap(t => t.specialties)))];

  const filteredTherapists = therapists
    .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(t => specialty === 'all' || t.specialties.includes(specialty));

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl font-headline">Find Your Therapist</h1>
        <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
          Search our directory of qualified professionals to find the right fit for you.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={specialty} onValueChange={setSpecialty}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by specialty" />
          </SelectTrigger>
          <SelectContent>
            {allSpecialties.map(spec => (
              <SelectItem key={spec} value={spec}>
                {spec === 'all' ? 'All Specialties' : spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTherapists.map((therapist, index) => (
          <TherapistCard key={index} {...therapist} />
        ))}
        {filteredTherapists.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground mt-8">
            No therapists match your criteria. Please try a different search.
          </p>
        )}
      </div>
    </div>
  );
}
