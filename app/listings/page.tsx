"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Trash2, Edit } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const mockListings = [
  { id: 1, title: 'Vintage Sofa', category: 'Furniture', location: 'New York, NY', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop', status: 'Available' },
  { id: 2, title: 'Mountain Bike', category: 'Sports', location: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&h=300&fit=crop', status: 'Pending Pickup' },
  { id: 3, title: 'Acoustic Guitar', category: 'Music', location: 'Chicago, IL', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=300&fit=crop', status: 'Available' },
];

export default function Listings() {
  const [listings, setListings] = useState(mockListings);
  const { t } = useLanguage();

  const handleDelete = (id: number) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  const handleRequestPickup = (id: number) => {
    setListings(listings.map(listing =>
      listing.id === id ? { ...listing, status: 'Pending Pickup' } : listing
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('myListings')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item) => (
          <Card key={item.id}>
            <Image src={item.image} alt={item.title} width={500} height={300} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {item.location}
              </p>
              <p className="mt-2">{t('status')}: {t(item.status.toLowerCase())}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <Link href={`/item/${item.id}`}>{t('viewDetails')}</Link>
              </Button>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" asChild>
                  <Link href={`/edit/${item.id}`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
            {item.status === 'Available' && (
              <CardFooter>
                <Button onClick={() => handleRequestPickup(item.id)} className="w-full">
                  {t('requestPickup')}
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}