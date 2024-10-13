"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/components/LanguageProvider';

const categories = [
  'Furniture', 'Electronics', 'Clothing', 'Books', 'Sports', 'Music', 'Other'
];

const mockListings = [
  { id: '1', title: 'Vintage Sofa', category: 'Furniture', location: 'New York, NY', description: 'Beautiful vintage sofa in great condition. Must pick up.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop' },
  { id: '2', title: 'Mountain Bike', category: 'Sports', location: 'Los Angeles, CA', description: 'Adult mountain bike, barely used. Perfect for beginners.', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&h=300&fit=crop' },
  { id: '3', title: 'Acoustic Guitar', category: 'Music', location: 'Chicago, IL', description: 'Yamaha acoustic guitar. Great for learning or experienced players.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=300&fit=crop' },
];

export default function EditItem({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
  });

  useEffect(() => {
    const item = mockListings.find(item => item.id === params.id);
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category,
        location: item.location,
      });
    }
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log('Form submitted:', formData);
    // Redirect to listings page after submission
    router.push('/listings');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('editItem')}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">{t('title')}</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">{t('description')}</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">{t('category')}</Label>
          <Select onValueChange={handleCategoryChange} value={formData.category}>
            <SelectTrigger>
              <SelectValue placeholder={t('selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">{t('location')}</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">{t('updateItem')}</Button>
      </form>
    </div>
  );
}