import React from 'react';
import { SectionHeader } from './SectionHeader';
import { NewsGrid } from './NewsGrid';
import { EditorialType } from '@/contexts/EditorialContext';
import { PostApi } from '@/services/dotnetApi';

interface EditorialSectionProps {
  title: string;
  editorial: EditorialType;
  news: PostApi[];
}

export function EditorialSection({ title, editorial, news }: EditorialSectionProps) {
  return (
    <section className={`editorial-${editorial}`}>
      <div className="container py-10">
        <SectionHeader title={title} editorial={editorial} />
        <NewsGrid news={news} columns={4} />
      </div>
    </section>
  );
}
