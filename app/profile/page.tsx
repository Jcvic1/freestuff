"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from '@/components/LanguageProvider';
import { useToast } from "@/hooks/use-toast"

export default function Profile() {
  const router = useRouter();
  const { t } = useLanguage();
  const { toast } = useToast()
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'I love finding and sharing free stuff!',
  });
  const [listings, setListings] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch user profile, listings, and messages
    // This is a mock implementation
    setListings([
      { id: 1, title: 'Vintage Sofa', status: 'Active' },
      { id: 2, title: 'Mountain Bike', status: 'Pending' },
    ]);
    setMessages([
      { id: 1, from: 'Alice', subject: 'Interested in your sofa', read: false },
      { id: 2, from: 'Bob', subject: 'Is the bike still available?', read: true },
    ]);
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Update profile logic here
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('profile')}</h1>
      
      <div className="mb-8 flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">{profile.name}</h2>
          <p className="text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">{t('profileInfo')}</TabsTrigger>
          <TabsTrigger value="listings">{t('myListings')}</TabsTrigger>
          <TabsTrigger value="messages">{t('messages')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t('editProfile')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input id="name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="bio">{t('bio')}</Label>
                  <Textarea id="bio" value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} />
                </div>
                <Button type="submit">{t('updateProfile')}</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <CardTitle>{t('myListings')}</CardTitle>
            </CardHeader>
            <CardContent>
              {listings.map((listing) => (
                <div key={listing.id} className="flex justify-between items-center mb-4">
                  <span>{listing.title}</span>
                  <span className="text-sm text-muted-foreground">{listing.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>{t('messages')}</CardTitle>
            </CardHeader>
            <CardContent>
              {messages.map((message) => (
                <div key={message.id} className="flex justify-between items-center mb-4">
                  <span className={message.read ? '' : 'font-bold'}>{message.from}: {message.subject}</span>
                  {!message.read && <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded">{t('new')}</span>}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}