import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ArrowRight } from 'lucide-react';

const featuredItems = [
  { id: 1, title: 'Vintage Sofa', category: 'Furniture', location: 'New York, NY', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop' },
  { id: 2, title: 'Mountain Bike', category: 'Sports', location: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&h=300&fit=crop' },
  { id: 3, title: 'Acoustic Guitar', category: 'Music', location: 'Chicago, IL', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=300&fit=crop' },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
        <h1 className="text-5xl font-bold mb-6">Welcome to FreeStuff</h1>
        <p className="text-xl mb-8">Find and post free used items in your area</p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/post">Post an Item</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/search">Search Items</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
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
      </section>

      <section className="bg-muted p-8 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Post Your Item</h3>
            <p>List your unwanted items for free</p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p>Chat with interested people nearby</p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Give Away</h3>
            <p>Meet up and give your item a new home</p>
          </div>
        </div>
      </section>
    </div>
  );
}