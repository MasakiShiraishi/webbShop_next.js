'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';

export default function SearchMoter() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex w-full justify-center">
      <div className="relative w-full max-w-xl ml-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a product..."
          className="w-full px-4 py-2 border rounded-3xl pr-10"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <MagnifyingGlassCircleIcon className="h-6 w-6 text-gray-600" />
        </div>
      </div>
    </form>
  );
}
