import React from 'react';
import LegalPageLayout from '@/components/Legal/LegalPageLayout';

export const metadata = {
  title: 'Política de Privacidad | BBr',
  description: 'Política de privacidad y protección de datos de BBr.',
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-900/50 border border-white/10 p-6 backdrop-blur-sm mb-8 rounded-lg">
    <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-3">{title}</h2>
    <div className="text-neutral-400 space-y-4">
      {children}
    </div>
  </div>
);

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Política de Privacidad">
      <p className="text-xl text-neutral-300 mb-12 text-center italic">
        Tu privacidad es importante. Esta política detalla transparencia total sobre qué datos recopilamos y cómo los protegemos.
      </p>

      <Section title="1. Información que Recopilamos">
        <p className="text-justify">
          Para mejorar tu experiencia, podemos recopilar:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-400 pl-4">
          <li><strong>Información de Cuenta:</strong> Nombre, email y foto de perfil al registrarte.</li>
          <li><strong>Actividad:</strong> Reseñas, favoritos y lugares visitados.</li>
          <li><strong>Técnica:</strong> Datos de dispositivo y dirección IP para seguridad y análisis.</li>
        </ul>
      </Section>

      <Section title="2. Cómo Usamos tu Información">
        <p className="text-justify">
          Utilizamos estos datos para:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-400 pl-4">
          <li>Personalizar tu experiencia de descubrimiento de bares.</li>
          <li>Mantener la seguridad de la plataforma.</li>
          <li>Enviar notificaciones relevantes (que puedes configurar o desactivar).</li>
          <li>Analizar tendencias anónimas para mejorar el servicio.</li>
        </ul>
      </Section>

      <Section title="3. Compartir Información">
        <p className="text-justify">
          <strong>No vendemos tus datos.</strong> Solo compartimos información con terceros proveedores de servicios (como hosting) bajo estrictos acuerdos de confidencialidad, o si la ley lo requiere.
        </p>
      </Section>

      <Section title="4. Seguridad de los Datos">
        <p className="text-justify">
          Utilizamos cifrado y estándares de seguridad líderes en la industria para proteger tus datos contra acceso no autorizado, alteración o pérdida.
        </p>
      </Section>

      <Section title="5. Tus Derechos">
        <p className="text-justify">
          Tienes control total. Puedes acceder, editar o eliminar tu cuenta y datos personales desde tu perfil en cualquier momento (Zona de Peligro).
        </p>
      </Section>

      <Section title="6. Cambios">
        <p className="text-justify">
          Te notificaremos de cambios significativos en esta política. La versión más reciente siempre estará disponible aquí.
        </p>
      </Section>
    </LegalPageLayout>
  );
}
