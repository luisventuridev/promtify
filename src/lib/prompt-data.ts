// src/lib/prompt-data.ts
export interface SubStyle {
  id: string;
  name: string;
  tokens: string;
}

export interface StyleCategory {
  id: string;
  name: string;
  description: string;
  subStyles: SubStyle[];
}

export const STYLE_LIBRARY: Record<string, StyleCategory> = {
  "Anime": {
    "id": "anime",
    "name": "Anime",
    "description": "Estilos de animación japonesa",
    "subStyles": [
      { "id": "ghibli", "name": "Studio Ghibli", "tokens": "Studio Ghibli style, hand-drawn aesthetic, soft watercolor backgrounds, Hayao Miyazaki inspired" },
      { "id": "shinkai", "name": "Makoto Shinkai", "tokens": "Makoto Shinkai style, hyper-detailed scenery, cinematic lighting, vibrant blue skies" },
      { "id": "retro", "name": "90s Retro", "tokens": "90s retro anime style, Akira inspired, gritty urban textures, hand-painted cel" },
      { "id": "shonen", "name": "Modern Shonen", "tokens": "Ufotable style, dynamic fluid effects, high-budget digital compositing, sharp line art" }
    ]
  },
  "3D Render": {
    "id": "3d",
    "name": "3D Render",
    "description": "Modelado y renderizado digital",
    "subStyles": [
      { "id": "pixar", "name": "Pixar Style", "tokens": "Disney Pixar animation style, cute character design, soft rim lighting, subsurface scattering" },
      { "id": "unreal", "name": "Unreal Engine 5", "tokens": "Unreal Engine 5 render, cinematic ray tracing, photorealistic textures, 8k resolution" },
      { "id": "clay", "name": "Claymation", "tokens": "Stop-motion clay style, handcrafted texture, tactile physical look" }
    ]
  },
  "Digital": {
    "id": "digital",
    "name": "Digital Illustration",
    "description": "Arte digital y pintura",
    "subStyles": [
      { "id": "concept", "name": "Concept Art", "tokens": "Professional concept art, digital painting, atmospheric perspective, Greg Rutkowski inspired" },
      { "id": "flat", "name": "Flat Design", "tokens": "Modern flat illustration, vector art, minimalist shapes, clean lines" },
      { "id": "oil", "name": "Digital Oil", "tokens": "Impressionist oil painting, thick brushstrokes, canvas texture, visible strokes" }
    ]
  },
  "Photography": {
    "id": "photo",
    "name": "Photography",
    "description": "Estilos fotográficos reales",
    "subStyles": [
      { "id": "analog", "name": "Vintage Film", "tokens": "35mm film photography, Kodak Portra 400, film grain, nostalgic warm tones" },
      { "id": "editorial", "name": "Editorial", "tokens": "Vogue editorial style, high fashion photography, studio lighting, sharp focus" },
      { "id": "macro", "name": "Macro Detail", "tokens": "Macro photography, extreme close-up, shallow depth of field, bokeh, hyper-detailed" }
    ]
  }
};