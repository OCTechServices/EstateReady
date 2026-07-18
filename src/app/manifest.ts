import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Will & Estate Ready',
    short_name: 'WE Ready',
    description: 'Estate planning readiness assessment. Know where you stand before you meet an attorney.',
    start_url: '/',
    display: 'browser',
    background_color: '#FAF8F2',
    theme_color: '#1A4A2E',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
