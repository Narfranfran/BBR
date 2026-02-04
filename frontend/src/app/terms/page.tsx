import React from 'react';
import LegalPageLayout from '@/components/Legal/LegalPageLayout';

export const metadata = {
  title: 'Términos y Condiciones | BBr',
  description: 'Términos y condiciones de uso de la plataforma BBr.',
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Términos y Condiciones">
      <p className="lead text-xl text-neutral-300 mb-8">
        Bienvenido a BBr. Al utilizar nuestros servicios, aceptas estos términos. Están diseñados para asegurar una experiencia segura y auténtica para todos.
      </p>

      <h2>1. Introducción</h2>
      <p>
        Bienvenido a BBr ("nosotros", "nuestro", o "la Plataforma"). Al acceder y utilizar nuestro sitio web y servicios, aceptas cumplir con estos Términos y Condiciones. 
        Si no estás de acuerdo con alguna parte de estos términos, por favor, abstente de utilizar nuestros servicios.
      </p>

      <h2>2. Uso de la Plataforma y Conducta</h2>
      <p>
        BBr es una plataforma de descubrimiento social. Valoramos la autenticidad y el respeto. Te comprometes a utilizar la plataforma legalmente y a:
      </p>
      <ul>
        <li>No realizar actividades ilícitas, fraudulentas o dañinas.</li>
        <li>No intentar vulnerar la seguridad de la plataforma ni acceder a cuentas de terceros.</li>
        <li>Mantener un tono respetuoso en reseñas y comentarios. El discurso de odio, acoso o contenido inapropiado será eliminado.</li>
      </ul>

      <h2>3. Cuentas de Usuario</h2>
      <p>
        Eres responsable de mantener la seguridad de tu cuenta. Cualquier actividad realizada bajo tu perfil es tu responsabilidad. Notifícanos inmediatamente si detectas un acceso no autorizado.
      </p>

      <h2>4. Contenido Generado por el Usuario</h2>
      <p>
        Al publicar en BBr, mantienes la propiedad de tu contenido, pero nos otorgas una licencia mundial, no exclusiva y gratuita para usarlo en relación con el funcionamiento y promoción de la plataforma.
        Garantizas que tu contenido es original y no infringe derechos de terceros.
      </p>

      <h2>5. Propiedad Intelectual</h2>
      <p>
        La marca BBr, el diseño, código y bases de datos son propiedad exclusiva de BBr. No está permitido copiar, modificar o distribuir nuestro contenido sin autorización expresa.
      </p>

      <h2>6. Limitación de Responsabilidad</h2>
      <p>
        BBr se ofrece "tal cual". No garantizamos que el servicio sea ininterrumpido o libre de errores. No nos hacemos responsables de daños indirectos derivados del uso de la plataforma, incluyendo la exactitud de la información de los establecimientos.
      </p>

      <h2>7. Modificaciones</h2>
      <p>
        Podemos actualizar estos términos ocasionalmente. El uso continuado de la plataforma implica la aceptación de los nuevos términos.
      </p>

      <h2>8. Contacto</h2>
      <p>
        Para dudas legales o reportes, contáctanos a través de nuestro soporte oficial o en legal@bbr.app (ficticio).
      </p>
    </LegalPageLayout>
  );
}
