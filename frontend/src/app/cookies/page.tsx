import React from 'react';
import LegalPageLayout from '@/components/Legal/LegalPageLayout';

export const metadata = {
  title: 'Política de Cookies | BBr',
  description: 'Información sobre el uso de cookies en BBr.',
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-900/50 border border-white/10 p-6 backdrop-blur-sm mb-8 rounded-lg">
    <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-3">{title}</h2>
    <div className="text-neutral-400 space-y-4">
      {children}
    </div>
  </div>
);

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Política de Cookies">
      <p className="text-xl text-neutral-300 mb-12 text-center italic">
        Usamos cookies (y tecnología similar) para que BBr funcione correctamente y para entender cómo lo usas. Aquí explicamos qué son y cómo las controlas.
      </p>

      <Section title="1. ¿Qué son las Cookies?">
        <p className="text-justify">
          Son pequeños archivos de texto que se guardan en tu dispositivo cuando visitas un sitio web. Funcionan como la "memoria" del sitio, permitiéndole recordarte en tu próxima visita.
        </p>
      </Section>

      <Section title="2. Cómo Usamos las Cookies">
        <p className="text-justify">
          En BBr, el uso es mínimo y esencial:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-400 pl-4">
          <li><strong>Sesión:</strong> Para mantenerte logueado mientras navegas.</li>
          <li><strong>Preferencias:</strong> Recordar tu configuración de mapa o filtros.</li>
          <li><strong>Rendimiento:</strong> Analíticas anónimas para detectar errores y mejorar la velocidad.</li>
        </ul>
      </Section>

      <Section title="3. Tipos que Utilizamos">
        <ul className="list-disc list-inside space-y-2 text-neutral-400 pl-4">
          <li><strong>Esenciales (Estrictamente Necesarias):</strong> Sin ellas, no puedes loguearte o usar funciones básicas.</li>
          <li><strong>Funcionales:</strong> Mejoran la experiencia recordando quién eres.</li>
          <li><strong>Analíticas:</strong> Nos ayudan a contar visitas y fuentes de tráfico (datos agregados/anónimos).</li>
        </ul>
      </Section>

      <Section title="4. Tu Control">
        <p className="text-justify">
          Puedes configurar tu navegador para rechazar todas las cookies o indicar cuándo se envía una cookie. Sin embargo, algunas funciones de BBr (como el login) pueden no funcionar correctamente sin cookies esenciales.
        </p>
      </Section>
    </LegalPageLayout>
  );
}
