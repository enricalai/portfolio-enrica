/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Autorise les qualités que tu utilises dans ton code
    qualities: [75, 95, 100],
    // Désactive l'optimisation si tu veux éviter d'autres erreurs de config
    // unoptimized: true,
  },
  // La clé 'swcMinify' n'est plus nécessaire dans les versions récentes de Next.js
  // Tu peux la supprimer.
}

export default nextConfig