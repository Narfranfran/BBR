import React from 'react';
import LegalPageLayout from '@/components/Legal/LegalPageLayout';

export const metadata = {
  title: 'Política de Cookies | BBr',
  description: 'Información sobre el uso de cookies en BBr.',
};

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Política de Cookies">
      <p className="lead text-xl text-neutral-300 mb-8">
        Usamos cookies (y tecnología similar) para que BBr funcione correctamente y para entender cómo lo usas. Aquí explicamos qué son y cómo las controlas.
      </p>

      <h2>1. ¿Qué son las Cookies?</h2>
      <p>
        Son pequeños archivos de texto que se guardan en tu dispositivo cuando visitas un sitio web. Funcionan como la "memoria" del sitio, permitiéndole recordarte en tu próxima visita.
      </p>

      <h2>2. Cómo Usamos las Cookies</h2>
      <p>
        En BBr, el uso es mínimo y esencial:
      </p>
      <ul>
        <li><strong>Sesión:</strong> Para mantenerte logueado mientras navegas.</li>
        <li><strong>Preferencias:</strong> Recordar tu configuración de mapa o filtros.</li>
        <li><strong>Rendimiento:</strong> Analíticas anónimas para detectar errores y mejorar la velocidad.</li>
      </ul>

      <h2>3. Tipos que Utilizamos</h2>
      <ul>
        <li><strong>Esenciales (Estrictamente Necesarias):</strong> Sin ellas, no puedes loguearte o usar funciones básicas.</li>
        <li><strong>Funcionales:</strong> Mejoran la experiencia recordando quién eres.</li>
        <li><strong>Analíticas:</strong> Nos ayudan a contar visitas y fuentes de tráfico (datos agregados/anónimos).</li>
      </ul>

      <h2>4. Tu Control</h2>
      <p>
        Puedes configurar tu navegador para rechazar todas las cookies o indicar cuándo se envía una cookie. Sin embargo, algunas funciones de BBr (como el login) pueden no funcionar correctamente sin cookies esenciales.
      </p>
    </LegalPageLayout>
  );
}
