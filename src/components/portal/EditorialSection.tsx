import React from 'react';
import { NewsItem } from './NewsCard';
import { SectionHeader } from './SectionHeader';
import { NewsGrid } from './NewsGrid';
import { EditorialType } from '@/contexts/EditorialContext';

interface EditorialSectionProps {
  title: string;
  editorial: EditorialType;
  news: NewsItem[];
}

export function EditorialSection({ title, editorial, news }: EditorialSectionProps) {
  return (
    <section className={`editorial-${editorial}`}>
      <div className="container py-8">
        <SectionHeader title={title} editorial={editorial} />
        <NewsGrid news={news} columns={4} />
      </div>
    </section>
  );
}
