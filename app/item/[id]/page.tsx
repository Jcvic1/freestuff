import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

const mockItems = [
  { id: '1', title: 'Vintage Sofa', category: 'Furniture', location: 'New York, NY', description: 'Beautiful vintage sofa in great condition. Must pick up.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop' },
  { id: '2', title: 'Mountain Bike', category: 'Sports', location: 'Los Angeles, CA', description: 'Adult mountain bike, barely used. Perfect for beginners.', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&h=300&fit=crop' },
  { id: '3', title: 'Acoustic Guitar', category: 'Music', location: 'Chicago, IL', description: 'Yamaha acoustic guitar. Great for learning or experienced players.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=300&fit=crop' },
];

export function generateStaticParams() {
  return mockItems.map((item) => ({
    id: item.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const item = mockItems.find((item) => item.id === params.id);
  return {
    title: item ? `${item.title} | FreeStuff` : 'Item Not Found',
    description: item ? item.description : 'This item could not be found.',
  };
}

export default function ItemDetail({ params }: { params: { id: string } }) {
  const item = mockItems.find((item) => item.id === params.id);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <Image src={item.image} alt={item.title} width={500} height={300} className="w-full h-64 object-cover" />
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.category}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{item.description}</p>
          <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-muted-foreground hover:text-primary">
            <MapPin className="w-4 h-4 mr-1" />
            {item.location}
          </Link>
          <div className="flex space-x-4">
            <Button className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Poster</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" required />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}