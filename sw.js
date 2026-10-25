// Service worker: guarda o jogo para jogar sem internet e troca de versão quando o jogador aceita.
// VERSAO e ARQUIVOS são preenchidos pelo tools/build-pwa.mjs a cada publicação.
const VERSAO = "2026.10.25-1804-95265a5";
const ARQUIVOS = ["./","./assets/modelos/LICENCA-Kenney-CC0.txt","./assets/modelos/bathroomSink.json","./assets/modelos/bench.json","./assets/modelos/cardboardBoxClosed.json","./assets/modelos/cardboardBoxOpen.json","./assets/modelos/chair.json","./assets/modelos/chairCushion.json","./assets/modelos/chairDesk.json","./assets/modelos/coatRackStanding.json","./assets/modelos/computerKeyboard.json","./assets/modelos/computerScreen.json","./assets/modelos/desk.json","./assets/modelos/kitchenCabinet.json","./assets/modelos/kitchenCoffeeMachine.json","./assets/modelos/kitchenFridge.json","./assets/modelos/kitchenMicrowave.json","./assets/modelos/loungeSofa.json","./assets/modelos/plantSmall1.json","./assets/modelos/pottedPlant.json","./assets/modelos/sideTable.json","./assets/modelos/table.json","./assets/modelos/toilet.json","./assets/modelos/trashcan.json","./assets/vozes/fiscal-caca-1.mp3","./assets/vozes/fiscal-caca-2.mp3","./assets/vozes/fiscal-caca-3.mp3","./assets/vozes/fiscal-caca-4.mp3","./assets/vozes/fiscal-caca-5.mp3","./assets/vozes/fiscal-caca-6.mp3","./assets/vozes/fiscal-caca-7.mp3","./assets/vozes/fiscal-caca-8.mp3","./assets/vozes/flavio-1.mp3","./assets/vozes/flavio-2.mp3","./assets/vozes/flavio-3.mp3","./assets/vozes/flavio-4.mp3","./assets/vozes/flavio-5.mp3","./assets/vozes/flavio-6.mp3","./assets/vozes/flavio-7.mp3","./assets/vozes/jairo-1.mp3","./assets/vozes/jairo-2.mp3","./assets/vozes/jairo-3.mp3","./assets/vozes/jairo-4.mp3","./assets/vozes/jairo-5.mp3","./assets/vozes/jairo-6.mp3","./assets/vozes/jairo-7.mp3","./assets/vozes/kim-1.mp3","./assets/vozes/kim-2.mp3","./assets/vozes/kim-3.mp3","./assets/vozes/kim-4.mp3","./assets/vozes/kim-5.mp3","./assets/vozes/kim-6.mp3","./assets/vozes/kim-7.mp3","./assets/vozes/kim-8.mp3","./assets/vozes/kim-9.mp3","./assets/vozes/lulao-1.mp3","./assets/vozes/lulao-2.mp3","./assets/vozes/lulao-3.mp3","./assets/vozes/lulao-4.mp3","./assets/vozes/lulao-5.mp3","./assets/vozes/lulao-6.mp3","./assets/vozes/lulao-7.mp3","./assets/vozes/lulao-8.mp3","./assets/vozes/mamae_falou-1.mp3","./assets/vozes/mamae_falou-2.mp3","./assets/vozes/mamae_falou-3.mp3","./assets/vozes/mamae_falou-4.mp3","./assets/vozes/mamae_falou-5.mp3","./assets/vozes/mamae_falou-6.mp3","./assets/vozes/mamae_falou-7.mp3","./assets/vozes/moraez-1.mp3","./assets/vozes/moraez-2.mp3","./assets/vozes/moraez-3.mp3","./assets/vozes/moraez-4.mp3","./assets/vozes/moraez-5.mp3","./assets/vozes/moraez-6.mp3","./assets/vozes/moraez-7.mp3","./assets/vozes/nicolas-1.mp3","./assets/vozes/nicolas-2.mp3","./assets/vozes/nicolas-3.mp3","./assets/vozes/nicolas-4.mp3","./assets/vozes/nicolas-5.mp3","./assets/vozes/nicolas-6.mp3","./assets/vozes/renan-1.mp3","./assets/vozes/renan-2.mp3","./assets/vozes/renan-3.mp3","./assets/vozes/renan-4.mp3","./assets/vozes/renan-5.mp3","./assets/vozes/renan-6.mp3","./assets/vozes/renan-7.mp3","./icones/apple-touch-icon.png","./icones/icone-192.png","./icones/icone-512.png","./icones/icone-maskable-512.png","./index.html","./manifest.webmanifest","./src/audio.js","./src/data/dublagem.js","./src/data/favores.js","./src/data/noite.js","./src/data/paginas.js","./src/data/perguntas.js","./src/data/visitantes.js","./src/logic/clock.js","./src/logic/config.js","./src/logic/esconderijo.js","./src/logic/favores.js","./src/logic/ferramentas.js","./src/logic/fiscal.js","./src/logic/folego.js","./src/logic/inventario.js","./src/logic/noite.js","./src/logic/quiz.js","./src/logic/salvar.js","./src/logic/suspeita.js","./src/main.js","./src/ui/instalar.js","./src/ui/toque-logica.js","./src/ui/toque.js","./src/ui/ui.css","./src/ui/ui.js","./src/versao.js","./src/world/fisica.js","./src/world/jogador.js","./src/world/marcadores.js","./src/world/modelos.js","./src/world/nav.js","./src/world/objetos.js","./src/world/personagens.js","./src/world/planta.js","./src/world/predio.js","./src/world/ps1.js","./src/world/rostos.js","./src/world/texturas.js","./vendor/three/LICENSE","./vendor/three/addons/loaders/GLTFLoader.js","./vendor/three/addons/objects/Reflector.js","./vendor/three/addons/utils/BufferGeometryUtils.js","./vendor/three/three.module.js"];
const CACHE = `plantao-${VERSAO}`;
const EXTERNO = 'plantao-externo'; // fontes do Google

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n !== CACHE && n !== EXTERNO).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  );
});

// O jogo pede para trocar de versão quando o jogador clica em "Atualizar".
self.addEventListener('message', (e) => { if (e.data === 'atualizar') self.skipWaiting(); });

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // Arquivos do jogo: do cache primeiro (funciona offline).
    e.respondWith(caches.match(req, { ignoreSearch: true }).then((r) => r || fetch(req)));
    return;
  }
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    // Fontes: usa a guardada e atualiza em segundo plano.
    e.respondWith(caches.open(EXTERNO).then(async (c) => {
      const guardada = await c.match(req);
      const rede = fetch(req).then((r) => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => guardada);
      return guardada || rede;
    }));
  }
});
