import React from 'react';
import LegalPageLayout from '@/components/Legal/LegalPageLayout';

export const metadata = {
  title: 'Términos y Condiciones | BBr',
  description: 'Términos y condiciones de uso de la plataforma BBr.',
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-neutral-900/50 border border-white/10 p-6 backdrop-blur-sm mb-8 rounded-lg">
    <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-3">{title}</h2>
    <div className="text-neutral-400 space-y-4">
      {children}
    </div>
  </div>
);

export default function TermsPage() {
  return (
    <LegalPageLayout title="Términos y Condiciones">
      <p className="text-xl text-neutral-300 mb-12 text-center italic">
        Bienvenido a BBr. Al utilizar nuestros servicios, aceptas estos términos. Están diseñados para asegurar una experiencia segura y auténtica para todos.
      </p>

      <Section title="1. Introducción">
        <p className="text-justify">
          Bienvenido a BBr (&quot;nosotros&quot;, &quot;nuestro&quot;, o &quot;la Plataforma&quot;). Al acceder y utilizar nuestro sitio web y servicios, aceptas cumplir con estos Términos y Condiciones. 
          Si no estás de acuerdo con alguna parte de estos términos, por favor, abstente de utilizar nuestros servicios.
        </p>
      </Section>

      <Section title="2. Uso de la Plataforma y Conducta">
        <p className="text-justify">
          BBr es una plataforma de descubrimiento social. Valoramos la autenticidad y el respeto. Te comprometes a utilizar la plataforma legalmente y a:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-400 pl-4">
          <li>No realizar actividades ilícitas, fraudulentas o dañinas.</li>
          <li>No intentar vulnerar la seguridad de la plataforma ni acceder a cuentas de terceros.</li>
          <li>Mantener un tono respetuoso en reseñas y comentarios. El discurso de odio, acoso o contenido inapropiado será eliminado.</li>
        </ul>
      </Section>

      <Section title="3. Cuentas de Usuario">
        <p className="text-justify">
          Eres responsable de mantener la seguridad de tu cuenta. Cualquier actividad realizada bajo tu perfil es tu responsabilidad. Notifícanos inmediatamente si detectas un acceso no autorizado.
        </p>
      </Section>

      <Section title="4. Contenido Generado por el Usuario">
        <p className="text-justify">
          Al publicar en BBr, mantienes la propiedad de tu contenido, pero nos otorgas una licencia mundial, no exclusiva y gratuita para usarlo en relación con el funcionamiento y promoción de la plataforma.
          Garantizas que tu contenido es original y no infringe derechos de terceros.
        </p>
      </Section>

      <Section title="5. Propiedad Intelectual">
        <p className="text-justify">
          La marca BBr, el diseño, código y bases de datos son propiedad exclusiva de BBr. No está permitido copiar, modificar o distribuir nuestro contenido sin autorización expresa.
        </p>
      </Section>

      <Section title="6. Limitación de Responsabilidad">
        <p className="text-justify">
          BBr se ofrece &quot;tal cual&quot;. No garantizamos que el servicio sea ininterrumpido o libre de errores. No nos hacemos responsables de daños indirectos derivados del uso de la plataforma, incluyendo la exactitud de la información de los establecimientos.
        </p>
      </Section>

      <Section title="7. Modificaciones">
        <p className="text-justify">
          Podemos actualizar estos términos ocasionalmente. El uso continuado de la plataforma implica la aceptación de los nuevos términos.
        </p>
      </Section>

      <Section title="8. Contacto">
        <p className="text-justify">
          Para dudas legales o reportes, contáctanos a través de nuestro soporte oficial o en legal@bbr.app (ficticio).
        </p>
      </Section>
    </LegalPageLayout>
  );
}
