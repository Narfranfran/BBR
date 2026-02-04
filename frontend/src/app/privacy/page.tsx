import React from 'react';
import LegalPageLayout from '@/components/Legal/LegalPageLayout';

export const metadata = {
  title: 'Política de Privacidad | BBr',
  description: 'Política de privacidad y protección de datos de BBr.',
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Política de Privacidad">
      <p className="lead text-xl text-neutral-300 mb-8">
        Tu privacidad es importante. Esta política detalla transparencia total sobre qué datos recopilamos y cómo los protegemos.
      </p>

      <h2>1. Información que Recopilamos</h2>
      <p>
        Para mejorar tu experiencia, podemos recopilar:
      </p>
      <ul>
        <li><strong>Información de Cuenta:</strong> Nombre, email y foto de perfil al registrarte.</li>
        <li><strong>Actividad:</strong> Reseñas, favoritos y lugares visitados.</li>
        <li><strong>Técnica:</strong> Datos de dispositivo y dirección IP para seguridad y análisis.</li>
      </ul>

      <h2>2. Cómo Usamos tu Información</h2>
      <p>
        Utilizamos estos datos para:
      </p>
      <ul>
        <li>Personalizar tu experiencia de descubrimiento de bares.</li>
        <li>Mantener la seguridad de la plataforma.</li>
        <li>Enviar notificaciones relevantes (que puedes configurar o desactivar).</li>
        <li>Analizar tendencias anónimas para mejorar el servicio.</li>
      </ul>

      <h2>3. Compartir Información</h2>
      <p>
        <strong>No vendemos tus datos.</strong> Solo compartimos información con terceros proveedores de servicios (como hosting) bajo estrictos acuerdos de confidencialidad, o si la ley lo requiere.
      </p>

      <h2>4. Seguridad de los Datos</h2>
      <p>
        Utilizamos cifrado y estándares de seguridad líderes en la industria para proteger tus datos contra acceso no autorizado, alteración o pérdida.
      </p>

      <h2>5. Tus Derechos</h2>
      <p>
        Tienes control total. Puedes acceder, editar o eliminar tu cuenta y datos personales desde tu perfil en cualquier momento (Zona de Peligro).
      </p>

      <h2>6. Cambios</h2>
      <p>
        Te notificaremos de cambios significativos en esta política. La versión más reciente siempre estará disponible aquí.
      </p>
    </LegalPageLayout>
  );
}
