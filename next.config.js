const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false // Cambiamos esto para que funcione en desarrollo también
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // tus otras configuraciones de Next.js aquí
}

module.exports = withPWA(nextConfig)
