import { defineConfig, devices } from '@playwright/test';

/**
 * Pruebas end-to-end de Soluciones VSJ.
 *
 * Requieren la app corriendo (frontend en :3000 y backend en :4000), por
 * ejemplo con `docker compose up` desde la raíz del repo, o con
 * `npm run dev` en frontend/ y backend/ por separado.
 *
 * Los usuarios de prueba (ver backend/src/db/seed.ts, `npm run db:seed`):
 *   suribe893@soyudemedellin.edu.co / VSJ2026!
 *   vmonsalve558@soyudemedellin.edu.co / VSJ2026!
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
