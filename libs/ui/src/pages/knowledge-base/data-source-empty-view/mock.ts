import type { Placement } from '@popperjs/core';

export interface IMockDataSource {
  label: string;
  value: string;
  id: number;
  width?: number;
  caption?: string;
  placement?: Placement;
}

export const DATA_SOURCES: IMockDataSource[] = [
  {
    label: 'Plain text',
    value: 'PlainText',
    id: 0,
    width: 175,
    caption: 'Copy and paste, or manually add text directly into your knowledge base.',
    placement: 'left-start',
  },
  {
    label: 'Upload file(s)',
    value: 'File',
    id: 1,
    width: 193,
    caption: 'Supported file formats: .pdf, .txt, .docx. Max file size: 10mb.',
  },
  {
    label: 'URL(s)',
    value: 'URL',
    id: 2,
    width: 172,
    caption: 'Import web page content from public URLs directly into your knowledge base.',
  },
  {
    label: 'Sitemap',
    value: 'Sitemap',
    id: 3,
    width: 189,
    caption: 'Query any sitemap to upload multiple URLs faster.',
  },
  {
    label: 'Integration',
    value: 'Integration',
    id: 4,
    width: 176,
    caption: 'Connect with external platforms like Zendesk or other APIs to import data into your knowledge base.',
  },
];
