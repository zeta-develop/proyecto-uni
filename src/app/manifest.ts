import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ProActiva',
    short_name: 'ProActiva',
    description: 'Sistema de Gestión Estudiantil',
    start_url: '/',
    display: 'standalone',
    background_color: '#2EC6FE',
    theme_color: '#8936FF',
    icons: [
      {
        src: '/icon512_maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon512_rounded.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ]
  }
}