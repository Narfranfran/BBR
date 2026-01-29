export default function About() {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Acerca de BBr</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">Nuestra Misión</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Este proyecto tiene como objetivo ofrecer información actualizada sobre locales de hostelería en Castilla y León. 
            Transformamos la burocracia de los datos abiertos en una experiencia social útil para la ciudadanía.
          </p>
          <p className="text-gray-600 leading-relaxed">
            BBr (BuscaBares) nace como respuesta al <strong>Objetivo 4.1</strong> del Proyecto Intermodular, buscando la normalización 
            y puesta en valor de los datasets públicos de la comunidad.
          </p>
        </div>
  
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Fuente de Datos</h3>
            <p className="text-sm text-gray-500">
              Los datos públicos se obtienen en tiempo real de la Junta de Castilla y León a través de su portal de Datos Abiertos.
            </p>
            <a 
              href="https://datosabiertos.jcyl.es/" 
              target="_blank" 
              className="mt-4 inline-block text-sm text-blue-500 hover:underline"
            >
              Visitar Portal JCyL &rarr;
            </a>
          </div>
  
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Tecnología</h3>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Next.js / React (Frontend)</li>
              <li>• Laravel API (Backend)</li>
              <li>• Leaflet (Mapas Interactivos)</li>
              <li>• Chart.js (Visualización de Datos)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
