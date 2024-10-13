"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/components/LanguageProvider';
import { useToast } from "@/hooks/use-toast"

const adTypes = ['Banner', 'Sidebar', 'Sponsored Post'];

export default function PostAd() {
  const router = useRouter();
  const { t } = useLanguage();
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    url: '',
    budget: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically send the ad data to your backend
      console.log('Ad submitted:', formData);
      
      toast({
        title: "Ad Posted",
        description: "Your ad has been successfully submitted for review.",
      })

      router.push('/');
    } catch (error) {
      console.error('Error posting ad:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your ad. Please try again.",
        variant: "destructive",
      })
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('postAd')}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">{t('adTitle')}</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">{t('adDescription')}</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">{t('adType')}</Label>
          <Select onValueChange={handleTypeChange} required>
            <SelectTrigger>
              <SelectValue placeholder={t('selectAdType')} />
            </SelectTrigger>
            <SelectContent>
              {adTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="url">{t('adUrl')}</Label>
          <Input
            id="url"
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="budget">{t('adBudget')}</Label>
          <Input
            id="budget"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">{t('submitAd')}</Button>
      </form>
    </div>
  );
}