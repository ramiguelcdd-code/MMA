import React, { useState, useEffect } from 'react';
import { 
  Swords, 
  Activity, 
  ClipboardList, 
  Play, 
  Pause, 
  RotateCcw, 
  Youtube,
  Save,
  Trophy,
  Users,
  Plus,
  Trash2,
  ShieldAlert,
  Flame
} from 'lucide-react';

// --- DATA & LIBRARIES ---

const ANIMAL_MOVEMENTS = [
  { name: "Bear Crawls (Gateo de Oso)", desc: "Fuerza en hombros y core. Simula la presión del sprawl." },
  { name: "Gorilla Walks (Desplazamiento Gorila)", desc: "Apertura de cadera, clave para footwork y pases." },
  { name: "Sit-outs a Granby Roll", desc: "Escape fundamental desde tortuga y control de espalda." },
  { name: "Crab Walk (Caminata de Cangrejo)", desc: "Tríceps y core, base para technical stand-ups (paradas técnicas)." },
  { name: "Alligator Crawl (Lagartos)", desc: "Control bajo el centro de gravedad, moverse pegado al mat." },
  { name: "Camarón (Forward/Reverse Shrimp)", desc: "Fuga de cadera. El movimiento #1 para escapes en el suelo." },
  { name: "Duck Walk (Paso de Pato)", desc: "Fuerza en rodillas para penetration steps profundos." },
  { name: "Sprawl a Tortuga Rápido", desc: "Reacción de caída de cadera y recuperación inmediata a base." },
  { name: "Monkey Roll (Rodada lateral)", desc: "Para recuperar guardia cuando te pasan por velocidad." },
  { name: "Lizard Crawl (Lagartija estirada)", desc: "Flexibilidad extrema de ingles, previene lesiones en ganchos." },
  { name: "Ostrich Walk (Caminata Avestruz)", desc: "Estiramiento dinámico de isquiotibiales (patadas altas y triángulos)." }
];

const SHARK_TANK_SCENARIOS = [
  "<strong>Body lock y control contra la reja</strong> (<em>El mayor % de derribos exitosos</em>). Defensor hace pummeling para romper, Atacante busca el takedown.",
  "<strong>Media Guardia Superior</strong> (<em>La mejor posición para GnP moderno</em>). Atacante busca aislar brazo y golpear, Defensor usa underhook para pararse o barrer.",
  "<strong>Intento de Wall Walk</strong> (<em>40% de tomas de espalda ocurren aquí</em>). Defensor se levanta usando la malla, Atacante presiona caderas para meter ganchos.",
  "<strong>Side Control (100 Kilos)</strong>. Atacante mantiene presión pesada y busca crucifijo. Defensor debe enmarcar (frames) y fugar cadera a guardia cerrada.",
  "<strong>Fallo de combinación pesada a Derribo</strong>. Atacante falla un volado 1-2, Defensor entra al Double Leg instantáneo. Atacante debe hacer Sprawl tardío.",
  "<strong>Clinch de Muay Thai Centro del Octágono</strong>. Atacante busca codos/rodillas. Defensor busca transición rápida a derribo de cadera (Judo throw/Body lock).",
  "<strong>Tortuga (Turtle) bajo presión</strong>. Atacante presiona buscando el cuello. Defensor debe atrapar un brazo o hacer sit-out para recuperar la guardia.",
  "<strong>Espalda plana (Back mount) aplanado</strong>. Defensor está boca abajo con el rival encima. Sobrevivir 2 minutos: proteger el cuello e intentar girar.",
  "<strong>Atrapado en Guillotina (Guillotine choke) de pie</strong>. Atacante tiene el cuello tras un sprawl. Defensor debe defender manos, pasar la guardia o derribar.",
  "<strong>Doble Esgrima (Double Underhooks) contra la reja</strong>. Defensor está atrapado. Debe pelear el control de bíceps, bajar el centro de gravedad y salir.",
  "<strong>Montada Completa (Full Mount)</strong>. Atacante busca sumisión (Armbar/Triángulo). Defensor debe atrapar pierna (Knee elbow escape) o puente explosivo (Upa).",
  "<strong>Triángulo desde guardia cerrada (Setup)</strong>. Atacante inicia con postura rota. Defensor debe posturarse, defender brazos y abrir la guardia.",
  "<strong>Kimura Trap (Trampa de Kimura) desde Norte-Sur</strong>. Atacante ataca el brazo. Defensor defiende escondiendo la mano e intentando girar al rival.",
  "<strong>Pummeling a Single Leg (A un brazo)</strong>. Romper el clinch usando un snap-down para atacar la pierna adelantada inmediatamente.",
  "<strong>Golpeo Ground & Pound dentro de guardia cerrada</strong>. Atacante posturado tirando manos rectos. Defensor controla postura (Overhook/Bíceps) y escala piernas."
];

const BEGINNER_ISOLATIONS = [
  "<strong>Drill Aislado:</strong> Solo Pummeling en la reja. Buscar esgrima (underhook) sin derribar. Resistencia al 50%.",
  "<strong>Drill Aislado:</strong> Paso de guardia básico. El de abajo solo retiene guardia cerrada sin fuerza extrema, el de arriba intenta pasar. Cero golpes.",
  "<strong>Drill Aislado:</strong> Control lateral (Side Control) de 10 segundos. Mantener el peso y balance, el compañero intenta moverse suavemente.",
  "<strong>Drill Aislado:</strong> Derribos desde rodillas (Dog fight). Buscar controlar la espalda o derribar arrancando desde el suelo (sin guillotinas).",
  "<strong>Drill Aislado:</strong> Defensa de Sprawl básica a cámara lenta (30% velocidad). Practicar echar la cadera pesada atrás sincronizado.",
  "<strong>Drill Aislado:</strong> Escape de cadera (Camarones) con compañero encima. El compañero ejerce peso estático, el novato escapa caderas."
];

const DRILLS = [
  { name: "Sprawl rápido a encajar Guillotina o D'Arce choke (Transición)", query: "MMA sprawl to guillotine darce choke drill" },
  { name: "Pummeling en la pared buscando Underhook para girar al rival", query: "MMA cage pummeling underhook drill" },
  { name: "Escape de side control a atrapar Single Leg (Lucha de rodillas)", query: "MMA side control escape to single leg takedown" },
  { name: "Finta de Jab a entrada de Double Leg (Penetration step explosivo)", query: "MMA jab feint to double leg takedown" },
  { name: "Wall walk: Salir desde tortuga pegado a la pared con resistencia", query: "MMA wall walk escape drill turtle" },
  { name: "Transición de striking a control de cabeza y brazo en clinch + rodilla", query: "MMA striking transition to thai clinch knees" },
  { name: "Defensa de derribo en la reja a codo de salida (Break elbow)", query: "MMA cage takedown defense to elbow break" },
  { name: "Pase de guardia con rodilla cruzada (Knee slice) tirando golpes", query: "MMA ground and pound knee slice pass" }
];

const COLORS = [
  'text-red-500 bg-red-950/30 border-red-500/50', 
  'text-blue-500 bg-blue-950/30 border-blue-500/50', 
  'text-green-500 bg-green-950/30 border-green-500/50', 
  'text-yellow-500 bg-yellow-950/30 border-yellow-500/50', 
  'text-purple-500 bg-purple-950/30 border-purple-500/50',
  'text-orange-500 bg-orange-950/30 border-orange-500/50',
  'text-cyan-500 bg-cyan-950/30 border-cyan-500/50'
];

const LEVEL_MAP = {
  'Novato': 1,
  'Medio': 2,
  'Pro': 3
};

// --- HELPER COMPONENTS ---

const WarmupBlock = () => {
  const [warmup, setWarmup] = useState([]);

  const generateWarmup = () => {
    const shuffled = [...ANIMAL_MOVEMENTS].sort(() => 0.5 - Math.random());
    setWarmup(shuffled.slice(0, 5));
  };

  useEffect(() => { generateWarmup(); }, []);

  return (
    <div className="space-y-4 mb-8">
      <div className="flex justify-between items-center border-b border-yellow-600/30 pb-2">
        <h3 className="text-lg font-bold text-yellow-500 uppercase flex items-center gap-2">
          <Flame size={20} /> Calentamiento Animal Flow
        </h3>
        <button onClick={generateWarmup} className="text-zinc-400 hover:text-white bg-zinc-800 p-1.5 rounded-md transition-colors">
          <RotateCcw size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {warmup.map((mov, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex gap-3 items-center">
            <div className="text-yellow-600 font-black text-lg w-6 shrink-0 text-center">{idx + 1}</div>
            <div>
              <h4 className="text-white font-bold text-sm">{mov.name}</h4>
              <p className="text-zinc-400 text-xs mt-0.5">{mov.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN TABS COMPONENTS ---

const Setup = ({ users, setUsers, setSetupComplete }) => {
  const [name, setName] = useState('');
  const [striking, setStriking] = useState('Novato');
  const [piso, setPiso] = useState('Novato');
  const [lucha, setLucha] = useState('Novato');

  const addUser = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Formula oculta: Striking*1 + Piso*1.5 + Lucha*2 (Favorece Grappling para Shark Tank)
    const score = (LEVEL_MAP[striking] * 1) + (LEVEL_MAP[piso] * 1.5) + (LEVEL_MAP[lucha] * 2);
    const colorTheme = COLORS[users.length % COLORS.length];

    const newUser = { id: Date.now(), name: name.trim(), striking, piso, lucha, score, colorTheme };
    setUsers([...users, newUser]);
    
    setName(''); setStriking('Novato'); setPiso('Novato'); setLucha('Novato');
  };

  const removeUser = (id) => setUsers(users.filter(u => u.id !== id));

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-white uppercase tracking-wider">Roster del Día</h2>
        <p className="text-zinc-400 text-sm">Registra a los asistentes y sus niveles (Sin egos).</p>
      </div>

      <form onSubmit={addUser} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div>
          <label className="block text-xs uppercase text-zinc-400 font-bold mb-1">Nombre</label>
          <input 
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Migue"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-red-500" required
          />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] uppercase text-zinc-500 font-bold mb-1 text-center">Striking</label>
            <select value={striking} onChange={(e) => setStriking(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white text-xs outline-none focus:border-red-500">
              <option>Novato</option><option>Medio</option><option>Pro</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase text-zinc-500 font-bold mb-1 text-center">Suelo (BJJ)</label>
            <select value={piso} onChange={(e) => setPiso(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white text-xs outline-none focus:border-red-500">
              <option>Novato</option><option>Medio</option><option>Pro</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase text-zinc-500 font-bold mb-1 text-center">Lucha</label>
            <select value={lucha} onChange={(e) => setLucha(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white text-xs outline-none focus:border-red-500">
              <option>Novato</option><option>Medio</option><option>Pro</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
          <Plus size={18} /> AGREGAR PELEADOR
        </button>
      </form>

      {users.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs uppercase text-zinc-500 font-bold pl-2">Asistentes ({users.length})</h3>
          {users.map(u => (
            <div key={u.id} className={`flex justify-between items-center p-3 rounded-xl border ${u.colorTheme}`}>
              <div className="font-bold text-white tracking-wide">{u.name}</div>
              <button onClick={() => removeUser(u.id)} className="text-zinc-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
            </div>
          ))}
          
          <button 
            onClick={() => { if(users.length >= 2) setSetupComplete(true); else alert("Agrega al menos 2 peleadores."); }}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest py-4 px-4 rounded-xl mt-6 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            Comenzar Entrenamiento
          </button>
        </div>
      )}
    </div>
  );
};

const HeavyDay = ({ users }) => {
  const [scenario, setScenario] = useState(null);
  
  // Timer state
  const INITIAL_TIME = 180;
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    else if (timeLeft === 0) setIsActive(false);
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => { setIsActive(false); setTimeLeft(INITIAL_TIME); };
  const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  const generateHeavyRounds = () => {
    // 1. Sort users by hidden score descending to find the Shark Tank group
    const sortedUsers = [...users].sort((a, b) => b.score - a.score);
    const sharkTankGroup = sortedUsers.slice(0, 3); // Top 3
    const specificGroup = sortedUsers.slice(3); // The rest

    // 2. Assign roles for Shark Tank
    if (sharkTankGroup.length >= 2) {
      let shuffledSharks = [...sharkTankGroup].sort(() => 0.5 - Math.random());
      let sitIndex = Math.floor(Math.random() * SHARK_TANK_SCENARIOS.length);
      let text = SHARK_TANK_SCENARIOS[sitIndex];

      let f1 = shuffledSharks[0];
      let f2 = shuffledSharks[1];
      let ref = shuffledSharks.length === 3 ? shuffledSharks[2] : null;

      // 3. Specific group tasks
      let specificTask = null;
      if (specificGroup.length > 0) {
        specificTask = BEGINNER_ISOLATIONS[Math.floor(Math.random() * BEGINNER_ISOLATIONS.length)];
      }

      setScenario({ f1, f2, ref, text, specificGroup, specificTask });
      resetTimer();
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-white uppercase tracking-wider text-red-500">Día Pesado</h2>
        <p className="text-zinc-400 text-sm">Trincheras: Presión, fatiga y control.</p>
      </div>

      <WarmupBlock />

      <button onClick={generateHeavyRounds} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-red-900/50 flex items-center justify-center gap-2">
        <Swords size={20} /> GENERAR RONDAS DE SPARRING
      </button>

      {scenario && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          {/* Shark Tank (Top tier) */}
          <div className="bg-zinc-900 border border-red-900/40 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
            
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-3">
              <div className="text-center flex-1">
                <span className="block text-[10px] text-red-500 uppercase font-black tracking-widest mb-1">Centro Octágono (Shark Tank)</span>
                <div className="flex items-center justify-center gap-2">
                  <span className={`px-2 py-1 rounded text-sm font-bold border ${scenario.f1.colorTheme}`}>{scenario.f1.name}</span>
                  <span className="text-zinc-500 font-bold text-xs">VS</span>
                  <span className={`px-2 py-1 rounded text-sm font-bold border ${scenario.f2.colorTheme}`}>{scenario.f2.name}</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/50">
              <h3 className="text-xs text-zinc-500 uppercase font-bold mb-2">Situación de Desventaja:</h3>
              <p className="text-zinc-200 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: scenario.text }}></p>
            </div>

            {scenario.ref && (
              <div className="mt-3 text-center">
                <span className="text-xs text-zinc-500 uppercase font-bold mr-2">Espera / Juez:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold border ${scenario.ref.colorTheme}`}>{scenario.ref.name}</span>
              </div>
            )}
          </div>

          {/* Specific Work (Beginners / Non-grapplers) */}
          {scenario.specificGroup && scenario.specificGroup.length > 0 && (
            <div className="bg-zinc-900 border border-blue-900/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <span className="block text-[10px] text-blue-400 uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                <ShieldAlert size={14} /> Trabajo Específico (Controlado)
              </span>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {scenario.specificGroup.map(u => (
                  <span key={u.id} className={`px-2 py-0.5 rounded text-xs font-bold border ${u.colorTheme}`}>{u.name}</span>
                ))}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800/50" dangerouslySetInnerHTML={{ __html: scenario.specificTask }}></p>
            </div>
          )}
        </div>
      )}

      {/* Timer */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-6 shadow-lg">
        <div className={`font-mono text-7xl font-black tracking-tighter ${timeLeft <= 30 && timeLeft > 0 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={toggleTimer} className={`flex-1 py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 ${isActive ? 'bg-yellow-500 text-black' : 'bg-red-600 text-white'}`}>
            {isActive ? <Pause size={20} /> : <Play size={20} />} {isActive ? 'PAUSAR' : 'INICIAR'}
          </button>
          <button onClick={resetTimer} className="bg-zinc-800 hover:bg-zinc-700 text-white py-3 px-6 rounded-xl flex items-center justify-center">
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const DynamicDay = ({ users }) => {
  const [circuit, setCircuit] = useState([]);
  const [matchups, setMatchups] = useState([]);

  const generateCircuit = () => {
    // 1. Matchmaking: Pro with Novato based on hidden score
    let sorted = [...users].sort((a, b) => b.score - a.score);
    let pairs = [];
    while (sorted.length >= 2) {
      let high = sorted.shift(); // take from top
      let low = sorted.pop();    // take from bottom
      pairs.push({ p1: high, p2: low });
    }
    if (sorted.length === 1) pairs.push({ p1: sorted[0], p2: null }); // Odd one out
    setMatchups(pairs);

    // 2. Pick 3 random drills
    const shuffled = [...DRILLS].sort(() => 0.5 - Math.random());
    setCircuit(shuffled.slice(0, 3));
  };

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-white uppercase tracking-wider text-orange-500">Día Dinámico</h2>
        <p className="text-zinc-400 text-sm">Flujo, técnica y memoria muscular.</p>
      </div>

      <WarmupBlock />

      <button onClick={generateCircuit} className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2">
        <Activity size={20} /> GENERAR DRILLS TÉCNICOS
      </button>

      {circuit.length > 0 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Mentor Matchmaking */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <h3 className="text-xs uppercase text-zinc-500 font-bold mb-3 flex items-center gap-2"><Users size={14} /> Parejas Asignadas (Mentor-Dummy):</h3>
            <div className="space-y-2">
              {matchups.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold border ${m.p1.colorTheme}`}>{m.p1.name}</span>
                  <span className="text-zinc-500 mx-1">con</span>
                  {m.p2 ? (
                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${m.p2.colorTheme}`}>{m.p2.name}</span>
                  ) : (
                    <span className="text-zinc-500 italic">Rotando (Comodín)</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 mt-3 text-center">*La app empareja mayor exp. con menor exp. de forma automática.</p>
          </div>

          {/* Circuit */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-orange-500 uppercase border-b border-orange-900/50 pb-2">Circuito Técnico</h3>
            {circuit.map((drill, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-sm flex flex-col gap-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-600"></div>
                <div className="flex gap-3">
                  <div className="bg-zinc-950 text-orange-500 font-black w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-zinc-800">
                    {index + 1}
                  </div>
                  <p className="text-white text-sm font-medium pt-1">{drill.name}</p>
                </div>
                <a 
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(drill.query)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors border border-zinc-800"
                >
                  <Youtube size={16} className="text-red-500" /> Ver ideas de este drill en YouTube
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const LogBook = ({ users }) => {
  const [logs, setLogs] = useState([]);
  const [fighterId, setFighterId] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('mma_pro_logs');
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  const saveLog = (e) => {
    e.preventDefault();
    if (!fighterId || !notes.trim()) return;

    const fighter = users.find(u => u.id.toString() === fighterId);
    if(!fighter) return;

    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }),
      fighterName: fighter.name,
      color: fighter.colorTheme,
      notes
    };

    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('mma_pro_logs', JSON.stringify(updated));
    setFighterId(''); setNotes('');
  };

  const deleteLog = (id) => {
    const updated = logs.filter(l => l.id !== id);
    setLogs(updated);
    localStorage.setItem('mma_pro_logs', JSON.stringify(updated));
  };

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-white uppercase tracking-wider">Bitácora</h2>
        <p className="text-zinc-400 text-sm">Registros guardados en este dispositivo.</p>
      </div>

      <form onSubmit={saveLog} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div>
          <select value={fighterId} onChange={(e) => setFighterId(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-red-500" required>
            <option value="" disabled>Seleccionar atleta...</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ej. Defender mejor el underhook izq, falló cardio al min 2..." className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white h-24 resize-none outline-none focus:border-red-500" required></textarea>
        </div>
        <button type="submit" className="w-full bg-white hover:bg-zinc-200 text-black font-black py-3 px-4 rounded-xl transition-all flex justify-center gap-2">
          <Save size={18} /> GUARDAR NOTA
        </button>
      </form>

      <div className="space-y-3">
        {logs.length === 0 ? (
          <div className="text-center p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl border-dashed">
            <Trophy className="mx-auto text-zinc-600 mb-2" size={32} />
            <p className="text-zinc-500 text-sm">Sin registros.</p>
          </div>
        ) : (
          logs.map(log => (
            <div key={log.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 relative">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${log.color}`}>{log.fighterName}</span>
                  <span className="text-zinc-500 text-[10px]">{log.date}</span>
                </div>
                <button onClick={() => deleteLog(log.id)} className="text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
              </div>
              <p className="text-zinc-300 text-sm italic mt-1 leading-relaxed">"{log.notes}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- APP WRAPPER ---

export default function App() {
  const [users, setUsers] = useState([]);
  const [isSetupComplete, setSetupComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('pesado');

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 font-sans selection:bg-red-500/30">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10 p-4 flex items-center justify-center gap-2 shadow-md">
        <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center -skew-x-12">
          <div className="w-2.5 h-2.5 bg-zinc-950 rounded-full skew-x-12"></div>
        </div>
        <h1 className="text-xl font-black uppercase tracking-tighter text-white italic">
          Camp <span className="text-red-500">PRO</span>
        </h1>
      </header>

      <main className="max-w-md mx-auto w-full">
        {!isSetupComplete ? (
          <Setup users={users} setUsers={setUsers} setSetupComplete={setSetupComplete} />
        ) : (
          <>
            {activeTab === 'pesado' && <HeavyDay users={users} />}
            {activeTab === 'dinamico' && <DynamicDay users={users} />}
            {activeTab === 'bitacora' && <LogBook users={users} />}
          </>
        )}
      </main>

      {isSetupComplete && (
        <nav className="fixed bottom-0 left-0 w-full bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 pb-safe z-50">
          <div className="flex justify-around max-w-md mx-auto">
            <button onClick={() => setActiveTab('pesado')} className={`flex-1 flex flex-col items-center justify-center py-3 px-1 gap-1 transition-colors ${activeTab === 'pesado' ? 'text-red-500' : 'text-zinc-500'}`}>
              <Swords size={22} strokeWidth={activeTab === 'pesado' ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Pesado</span>
            </button>
            <button onClick={() => setActiveTab('dinamico')} className={`flex-1 flex flex-col items-center justify-center py-3 px-1 gap-1 transition-colors ${activeTab === 'dinamico' ? 'text-orange-500' : 'text-zinc-500'}`}>
              <Activity size={22} strokeWidth={activeTab === 'dinamico' ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Dinámico</span>
            </button>
            <button onClick={() => setActiveTab('bitacora')} className={`flex-1 flex flex-col items-center justify-center py-3 px-1 gap-1 transition-colors ${activeTab === 'bitacora' ? 'text-white' : 'text-zinc-500'}`}>
              <ClipboardList size={22} strokeWidth={activeTab === 'bitacora' ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Bitácora</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}