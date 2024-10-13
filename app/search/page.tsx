"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ArrowRight } from 'lucide-react';

const categories = [
  'All', 'Furniture', 'Electronics', 'Clothing', 'Books', 'Sports', 'Music', 'Other'
];

const mockItems = [
  { id: 1, title: 'Vintage Sofa', category: 'Furniture', location: 'New York, NY', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop' },
  { id: 2, title: 'Mountain Bike', category: 'Sports', location: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&h=300&fit=crop' },
  { id: 3, title: 'Acoustic Guitar', category: 'Music', location: 'Chicago, IL', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=300&fit=crop' },
  { id: 4, title: 'iPhone 11', category: 'Electronics', location: 'Houston, TX', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=300&fit=crop' },
  { id: 5, title: 'Harry Potter Book Set', category: 'Books', location: 'Phoenix, AZ', image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=500&h=300&fit=crop' },
];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState(mockItems);

  const handleSearch = () => {
    const filteredItems = mockItems.filter(item =>
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
    );
    setItems(filteredItems);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Search Free Items</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Input
          placeholder="Search by title or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden transition-transform hover:scale-105">
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
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href={`/item/${item.id}`} className="flex items-center justify-center">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}