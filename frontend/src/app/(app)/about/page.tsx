export default function About() {
  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto text-neutral-300 font-mono">
      <div className="border-b border-orange-500/50 mb-8 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tighter">
          [ ACERCA DE <span className="text-orange-500">BBR_SYSTEM</span> ]
        </h1>
        <p className="text-sm text-neutral-500 mt-1">ID_REF: SYS_INFO_MODULE</p>
      </div>
      
      <div className="bg-neutral-900/50 border border-white/10 rounded-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-orange-500 mb-3 tracking-widest">
          // MISIÓN
        </h2>
        <p className="text-neutral-300 leading-relaxed mb-4">
          Este proyecto tiene como objetivo ofrecer información actualizada sobre locales de hostelería en Castilla y León. 
          Transformamos la burocracia de los datos abiertos en una experiencia social útil para la ciudadanía.
        </p>
        <p className="text-neutral-400 leading-relaxed border-l-2 border-orange-500 pl-4">
          BBr (BuscaBares) nace como respuesta al <strong className="text-white font-bold">Objetivo 4.1</strong> del Proyecto Intermodular, buscando la normalización 
          y puesta en valor de los datasets públicos de la comunidad.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-sm">
        <div className="bg-neutral-900/50 border border-white/10 rounded-sm p-6">
          <h3 className="font-bold text-orange-500 mb-3 tracking-widest">// FUENTE DE DATOS</h3>
          <p className="text-neutral-400 mb-4">
            Los datos públicos se obtienen en tiempo real de la Junta de Castilla y León a través de su portal de Datos Abiertos.
          </p>
          <a 
            href="https://datosabiertos.jcyl.es/" 
            target="_blank" 
            className="inline-block text-orange-400 hover:text-white hover:underline transition-colors duration-200"
          >
            [ Visitar Portal JCyL &rarr; ]
          </a>
        </div>

        <div className="bg-neutral-900/50 border border-white/10 rounded-sm p-6">
          <h3 className="font-bold text-orange-500 mb-3 tracking-widest">// TECNOLOGÍA</h3>
          <ul className="text-neutral-300 space-y-2">
            <li><span className="text-green-400 mr-2">&gt;</span>Next.js / React (Frontend)</li>
            <li><span className="text-green-400 mr-2">&gt;</span>Laravel API (Backend)</li>
            <li><span className="text-green-400 mr-2">&gt;</span>Leaflet (Mapas Interactivos)</li>
            <li><span className="text-green-400 mr-2">&gt;</span>Chart.js (Visualización de Datos)</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-neutral-600 tracking-widest">
        <p>BBR_SYSTEM_V.1.0 - INTERFAZ DE INFORMACIÓN</p>
      </div>
    </div>
  );
}
