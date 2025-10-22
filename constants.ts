import type { Tool } from './types';
import { SceneryIcon, CubeIcon, SparklesIcon, WandIcon, CombineIcon, DiamondIcon } from './components/icons';

export const TOOLS: Tool[] = [
  {
    id: 'magic-scene',
    name: 'Magic Scene',
    Icon: SceneryIcon,
    promptPrefix: "Keeping the subject in the foreground and preserving their facial features, skin texture, and expression, replace the background with a detailed scene of: ",
    placeholder: "e.g., a serene beach at sunset",
  },
  {
    id: 'object-inserter',
    name: 'Object Inserter',
    Icon: CubeIcon,
    promptPrefix: "Add the following object into the scene, ensuring it matches the scale, perspective, and lighting: ",
    placeholder: "e.g., a vintage red bicycle leaning on the wall",
  },
  {
    id: 'style-filter',
    name: 'Style Filter',
    Icon: SparklesIcon,
    promptPrefix: "Redraw the entire image in the following style, while maintaining the original composition and subject identity: ",
    placeholder: "Select a style filter",
    options: [
      { label: 'Cinematic Tone', value: 'cinematic tone with dramatic lighting and color grading' },
      { label: 'Pastel Painting', value: 'soft pastel painting with gentle strokes' },
      { label: 'Film Grain', value: 'vintage film grain look with slightly faded colors' },
      { label: 'Cyberpunk', value: 'cyberpunk style with neon lights and a futuristic feel' },
      { label: 'Oil Painting', value: 'classic oil painting with visible brush strokes' },
    ],
  },
  {
    id: 'magic-edit',
    name: 'Magic Edit',
    Icon: WandIcon,
    promptPrefix: "",
    placeholder: "e.g., change my hair to blue, make my shirt red...",
  },
  {
    id: 'image-fusion',
    name: 'Image Fusion',
    Icon: CombineIcon,
    promptPrefix: "",
    placeholder: "e.g., blend the subject into the second image's environment",
  },
  {
    id: 'enhance-quality',
    name: 'Enhance Quality',
    Icon: DiamondIcon,
    promptPrefix: "Upscale the following image to a high-resolution, photorealistic version (at least 2048x2048 pixels). Enhance details, sharpness, and clarity while preserving the original subject's identity, facial features, skin tone, and composition. The final image should be ultra-detailed, with no compression artifacts or blur.",
    placeholder: "Click 'Enhance' to upscale your image.",
  }
];