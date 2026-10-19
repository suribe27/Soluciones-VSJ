import { expect, test } from '@playwright/test';

const CORREO_DEMO = 'suribe893@soyudemedellin.edu.co';
const PASSWORD_DEMO = 'VSJ2026!';

// CU-01 / HU-01: iniciar sesión con correo institucional válido.
test.describe('Login', () => {
  test('muestra el formulario de inicio de sesión', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('VSJ Alerta Temprana')).toBeVisible();
    await expect(page.getByPlaceholder('correo@soyudemedellin.edu.co')).toBeVisible();
    await expect(page.getByPlaceholder('Contraseña')).toBeVisible();
  });

  // RN-01: solo se permite iniciar sesión con correo @soyudemedellin.edu.co.
  test('rechaza un correo que no sea del dominio institucional', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('correo@soyudemedellin.edu.co').fill('estudiante@gmail.com');
    await page.getByPlaceholder('Contraseña').fill('cualquiera');
    await page.getByRole('button', { name: 'Ingresar' }).click();

    await expect(page.getByText(/correo institucional/i)).toBeVisible();
  });

  test('inicia sesión con credenciales válidas y llega al Dashboard', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('correo@soyudemedellin.edu.co').fill(CORREO_DEMO);
    await page.getByPlaceholder('Contraseña').fill(PASSWORD_DEMO);
    await page.getByRole('button', { name: 'Ingresar' }).click();

    // CU-01: tras un login exitoso, el estudiante ve su nivel de riesgo.
    await expect(page.getByText('Tu Nivel de Estabilidad')).toBeVisible({ timeout: 10000 });
  });

  test('muestra un error con credenciales inválidas', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('correo@soyudemedellin.edu.co').fill(CORREO_DEMO);
    await page.getByPlaceholder('Contraseña').fill('contraseña-incorrecta');
    await page.getByRole('button', { name: 'Ingresar' }).click();

    await expect(page.getByText(/credenciales inválidas/i)).toBeVisible({ timeout: 10000 });
  });
});
