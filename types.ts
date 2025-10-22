import type { SVGProps } from 'react';

export interface ImageState {
  base64: string;
  mimeType: string;
}

export interface Tool {
  id: 'magic-scene' | 'object-inserter' | 'style-filter' | 'magic-edit' | 'image-fusion' | 'enhance-quality';
  name: string;
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  promptPrefix: string;
  placeholder: string;
  options?: { label: string; value: string }[];
}