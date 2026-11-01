import type { MsgParams } from '../../types/i18n';
import { type MissionText, colonyMessages, type colonyMsgEn, type colonyUiEn, robotCommandsEn } from './colony.en';

type MsgFn = (p: MsgParams) => string;

export const robotCommandsHu: typeof robotCommandsEn = {
  cleanSolar: { label: 'Napelemtömb tisztítása', short: 'Tisztítás', description: '5 SYS robot letisztítja a 100 kW-os tömböt · por −10%.' },
  harvestRegolith: { label: 'Regolit gyűjtése', short: 'Regolit', description: '20 SCI robot +30 kg nyersanyagot gyűjt javításhoz és építéshez.' },
  mineIce: { label: 'Mélyjég-bányászat', short: 'Jég', description: '20 SCI + 5 NAV robot 2 Solig · +120 kg víz.' },
  serviceModules: { label: 'Modulkarbantartás', short: 'Karbant.', description: '10 SYS robot helyreállítja a legkopottabb modult · +30% integritás · 10 kg regolit.' },
  repairFleet: { label: 'Flottajavítás', short: 'Flotta', description: 'A legkopottabb robotflotta felújítása · +35% állapot · 20 kg regolit.' },
  reinforceTube: { label: 'Lávacső megerősítése', short: 'Lávacső', description: '15 SYS robot 3 Solig · lakótér +20% · 30 kg regolit.' },
  calibrateAntenna: { label: 'Flottaantenna kalibrálása', short: 'Antenna', description: '10 COMM robot hangolja az orbitális kapcsolatot · morál +5.' }
};

export const missionsHu: Record<string, MissionText> = {
  M001: {
    title: 'Első lélegzet',
    brief: '1. Sol. Az ARES-1 készleteit tizenkét főre méretezték, nem százra. Bellini felpörgetné az elektrolízist, hogy oxigént nyerjen; Varga előbb a víz-visszanyerést stabilizálná. Kézzel mindkettő a mai munkaidő nagy részét elviszi.',
    options: {
      o2: { label: 'Oxigén az első', detail: 'Elektrolízis túlhajtva. A WRS karbantartása csúszik.', later: 'Az elhanyagolt WRS-kör eldugult. A szennyezett vizet ki kellett önteni.' },
      wrs: { label: 'Víz-visszanyerés az első', detail: 'A WRS stabilizálása. Az oxigéntartalék néhány Solig csökken.' },
      both: { label: 'Mindkettő kézzel', detail: 'Mindenki a körön dolgozik. A mai akciópontok nagy részébe kerül.' }
    }
  },
  M002: {
    title: 'Ellenőrizetlen útvonal',
    brief: 'Az orbitális felvételeken a Delta Ridge stabil kifolyási teraszként látszik, de a szektor ELLENŐRIZETLEN jelzésű. Okafor előbb drónos átrepülést kér. Varga még ma a gerincen akarja látni a rovert.',
    options: {
      rover: { label: 'A rover induljon', detail: 'Azonnali előrehaladás a gerinc felé. Okafor tiltakozik.', later: 'A terasz beszakadt a rover nyomvonala alatt — az az instabilitás, ami Okafor adataiban szerepelt.' },
      drone: { label: 'Előbb drónos felmérés', detail: 'Időbe kerül az útvonal ellenőrzése. Okafor megnyugszik.' },
      abandon: { label: 'A gerinc egyelőre marad', detail: 'Nincs kockázat, nincs haladás. A tudományos csapat elbizonytalanodik.' }
    }
  },
  M003: {
    title: 'Sabatier-impulzus',
    brief: 'A Sabatier-reaktor indításkor nyomáscsúcsokat produkál. Bellini kontrollált leállítást követel. Varga a vízmérlegre mutat.',
    options: {
      force: { label: 'Erőltetett indítás', detail: 'Víz most, a reaktor integritásának rovására.', later: 'Megrepedt a katalizátorágy — a hiba, amit Bellini sosem naplózott.' },
      shutdown: { label: 'Kontrollált leállítás', detail: 'A reaktor offline, átvizsgálás. Lassabb, biztonságosabb.' }
    }
  },
  M004: {
    title: 'Életfenntartási szorítás',
    brief: 'Öt Sol után a fogyasztási görbék már nem találkoznak a termelésiekkel. Valamiből engedni kell.',
    options: {
      ration: { label: 'Fejadag-csökkentés', detail: 'Kisebb élelmiszeradagok. A tartalék helyreáll, a morál romlik.' },
      reserves: { label: 'Tartalék felhasználása', detail: 'Most mindenki rendesen eszik, bízunk a következő ledobásban.', later: 'A tartalékfelélés utolért minket: az élelmiszerraktár hiányos.' },
      overclock: { label: 'Elektrolízis túlhajtása', detail: 'Oxigén modulkopás árán.' }
    }
  },
  M005: {
    title: 'Mélyradar',
    brief: 'A talajradar strukturált visszhangot ad negyven méterrel a lávacső-mező alatt — és pulzál.',
    options: {
      isolate: { label: 'A jel elszigetelése', detail: 'Leválasztás a hálózatról. Bellini egyetért, Varga nem.' },
      monitor: { label: 'Megfigyelés', detail: 'A műszerek rajta maradnak. Varga lelkes.', later: 'A jel a hálózattal szinkronban pulzált, és lemerítette az akkumulátorbankot.' }
    }
  },
  M006: {
    title: 'Napkitörés',
    brief: 'SPE-riasztás: órákon belül protonvihar érkezik — a felszínen 4500 mSv/év egyenérték. A legénység és a robotok szétszórva dolgoznak.',
    options: {
      slow: { label: 'Rendezett kiürítés', detail: 'Mindenkit és mindent behozunk. Egész napba telik.' },
      fast: { label: 'Vészkiürítés', detail: 'Előbb az emberek. Öt NAV robot kint marad.' },
      sacrifice: { label: 'A COMM-tömb csapata kint marad', detail: 'A kapcsolat megmarad. Tíz COMM robot elvész — Mercer ezt nem felejti el.', later: 'Mercer gondoskodott róla, hogy a legénység megtudja, kiket hagytak kint.' }
    }
  },
  M007: {
    title: 'Felszín alatti vízmátrix',
    brief: 'Varga jéglencsét talált a lávacső-mező alatt. Gyors fúrással hetekre megoldódna a víz kérdése.',
    options: {
      safe: { label: 'Biztonságos fúrás', detail: 'Lassú, megtámasztott fúrások. Egyenletes vízhozam.' },
      aggressive: { label: 'Agresszív fúrás', detail: 'Dupla hozam. Bellini figyelmeztet a lávacső tetejére.', later: 'Süllyedés: az agresszív fúrás meggyengítette a lávacső mennyezetét.' }
    }
  },
  M008: {
    title: 'Suttogás a kódban',
    brief: 'Mercer naplókat hoz: valaki átírta a Sabatier hibajelentéseit. Az aláírás Bellinié.',
    options: {
      expose: { label: 'Leleplezés', detail: 'A legénység elé kerül. A reaktort rendesen megjavítják; Bellini megszégyenül.' },
      cover: { label: 'Csendes eltussolás', detail: 'Bellini tekintélye megmarad. Mercer neheztel.', later: 'A rejtett katalizátorhiba most valóban bekövetkezett.' }
    }
  },
  M009: {
    title: 'A Mars-paradoxon',
    brief: 'A jel egy ajtó. Varga ki akarja nyitni a lávacsövek alatti Vaultot. Bellini a jel energiaforrását a hálózatba vezetné, és örökre eltemetné. Ez a döntés határozza meg, milyen kolóniát örökölnek a menekültek.',
    options: {
      vault: { label: 'A Vault megnyitása', detail: 'Ami lent van, felszínre kerül. A tudomány felemelkedik; a Rendszerek szakítanak veled.' },
      drain: { label: 'A jel lecsapolása', detail: 'Stabil hálózat, lezárt kérdés. A Tudomány szakít veled.' }
    }
  },
  A2: { title: 'II. felvonás · Az alapok', brief: 'A flotta megerősíti az 500 Solos ablakot. Most építkezni kell: napelemkészletek, relétorony és lávacső-lakótér. Teherledobás pótolja az élelmet, a hidrogént és a regolitot.', options: { ack: { label: 'Építkezés indul', detail: '' } } },
  A3: { title: 'III. felvonás · A néma jel', brief: 'A flottával való kapcsolat órákra elnémul. Most Mercer antennacsapatain múlik minden — és azon, amit elhallgat.', options: { ack: { label: 'Értettem', detail: '' } } },
  A4: { title: 'IV. felvonás · Az emberi tényező', brief: 'A gépek megjavíthatók. Az embereket nem lehet újraindítani. A következő száz Solt a bizalom és a morál dönti el.', options: { ack: { label: 'Értettem', detail: '' } } },
  A5: { title: 'V. felvonás · Az utolsó érkezés', brief: 'Kiírták az első menekült-leszállókat. Minden rendszert, amit építettél, százszoros terhelés alatt teszteljük.', options: { ack: { label: 'Leszállózóna előkészítése', detail: '' } } },
  A6: { title: 'VI. felvonás · Új emberiség', brief: 'Az utolsó szakasz. Amivé most az ARES-1 válik, azzá válik az emberiség.', options: { ack: { label: 'A munka befejezése', detail: '' } } }
};

const moduleNamesHu: Record<string, string> = { sabatier: 'Sabatier-reaktor', wrs: 'Víz-visszanyerés', electrolysis: 'Elektrolízis' };
const leadsHu: Record<string, string> = { nav: 'Okafor', sci: 'Varga', sys: 'Bellini', comm: 'Mercer' };
const secretsHu: Record<string, string> = {
  nav: 'Okafor megosztja a Delta Ridge instabilitásáról eltitkolt adatait. A gerinc következménye hatástalanítva.',
  sci: 'Varga felfedi a nyilvántartáson kívül tartott, azonosítatlan kémiai mintákat · +40 kg anyag.',
  sys: 'Bellini beismeri a hibás Sabatier-katalizátorágyat, és rendesen megjavítja.',
  comm: 'Mercer felfedi a legénységfigyelő algoritmust — és leállítja. A morál javul.'
};
const gridHu = ['Névleges', 'SCI lekapcsolva', 'NAV lekapcsolva', 'Modulok lekapcsolva', 'Életfenntartás leáll'];

export const colonyUiHu: typeof colonyUiEn = {
  meci: {
    label: 'MECI',
    lives: (n: string) => `${n} élet`,
    delay: (n: number) => n === 0 ? 'Ütemterv szerint' : `${n} Sol késés`,
    title: 'Ennyi életet tud még befogadni a kolónia. Minden Sol késés 250 000-be kerül.'
  },
  panel: {
    resources: 'Életfenntartási tartalékok',
    loop: 'Vegyi körforgás',
    power: 'Energiahálózat',
    crew: 'Legénység és lakótér',
    perSol: '/Sol',
    solsLeft: (n: number) => Number.isFinite(n) ? `${n} Sol van hátra` : 'Stabil',
    battery: 'Akkumulátorbank',
    generation: 'Termelés',
    load: 'Terhelés',
    dust: 'Por a tömbön',
    capacity: (kw: number) => `${kw} kW nap · 20 kW RTG`,
    colonists: 'Telepesek',
    morale: 'Morál',
    dose: 'Legénységi dózis',
    shielding: 'Sugárvédelem',
    lavaTube: 'Lávacső-lakótér',
    integrity: 'Integritás',
    failed: 'Ma éjjel meghibásodott',
    forecast: 'Mai éjszakai előrejelzés',
    grid: (level: number) => gridHu[level] ?? gridHu[0],
    modeLocked: 'Végrehajtás közben az üzemmódok zárolva vannak.',
    modeAria: (name: string) => `${name} üzemmód`,
    upkeep: 'Minden működő modul Solonként 1 AP fenntartásba kerül.',
    flare: 'Napkitörés · a felszíni csapatok fedezékben'
  },
  resources: { water: 'Víz', o2: 'Oxigén', food: 'Élelem', h2: 'Hidrogén', regolith: 'Regolit' },
  units: { kg: 'kg', food: 'adag' },
  modules: {
    sabatier: { name: 'Sabatier-reaktor', io: 'CO₂ + H₂ → CH₄ + H₂O' },
    wrs: { name: 'Víz-visszanyerés', io: 'Szennyvíz → 90% tiszta' },
    electrolysis: { name: 'Elektrolízis', io: 'H₂O → O₂ + H₂' }
  },
  modes: { off: 'Ki', on: 'Be', overclock: 'Túlhajt' },
  robotics: {
    title: 'ARN robothálózat',
    free: 'Szabad',
    busy: 'Foglalt',
    lost: 'Elveszett',
    condition: 'Állapot',
    offline: 'Offline',
    halved: 'Fél sebesség',
    tasks: 'Aktív feladatok',
    noTasks: 'Nincs kiküldött robot. A robotfeladatok a parancspalettán találhatók.',
    solsLeft: (n: number) => `még ${n} Sol`,
    note: 'Kopás 2%/Sol × környezet (tiszta ×1, napkitörés ×3, vihar ×5). 50% alatt a flotta fél sebességgel dolgozik; 25% alatt leáll, és a foglalt robotok kint ragadhatnak.',
    total: (free: number, total: number) => `${free}/${total} szabad`,
    fleetAria: (code: string) => `${code} flotta`
  },
  tiers: { loyal: 'Lojális', baseline: 'Alap', friction: 'Súrlódás', defiant: 'Dacos' },
  tierHint: { loyal: '+1 AP · titok feloldva', baseline: 'Nincs AP-hatás', friction: '−1 AP súrlódási adó', defiant: '−2 AP · nyílt ellenszegülés' },
  secretKnown: 'Titok felfedve',
  ap: {
    title: 'Akciópont-keret',
    base: 'Alap',
    infrastructure: 'Infrastruktúra',
    loyalty: 'Lojalitás',
    friction: 'Súrlódási adó',
    environment: 'Környezet',
    upkeep: 'Modulfenntartás',
    grid: 'Hálózati lekapcsolás',
    safeMode: 'Safe mód',
    mission: 'Misszió',
    crisis: 'Válság-alap (morál < 30 vagy életfenntartási hiány)'
  },
  readiness: {
    title: 'Érkezési készültség',
    solsLeft: (n: number) => `${n} Sol a flotta érkezéséig`,
    habitat: 'Lakótér',
    habitatGoal: 'A lávacső-lakótér lezárva a menekülteknek (95% sugárvédelem)'
  },
  mission: {
    decision: 'Missziós döntés',
    briefing: 'Felvonás-eligazítás',
    commit: 'Döntés véglegesítése',
    acknowledge: 'Tovább',
    backs: (name: string) => `${name} támogatja`,
    unknown: 'Hosszú távú hatás ismeretlen',
    irreversible: 'A döntések véglegesek. Egyes következmények csak több tucat Sol múlva jelentkeznek.',
    sol: (sol: number) => `${sol}. Sol`,
    waiting: 'Előbb dönts a misszióról.',
    optionsAria: 'Döntési lehetőségek'
  },
  effects: {
    resource: (name: string, n: number, unit: string) => `${n > 0 ? '+' : '−'}${Math.abs(n)} ${unit} ${name.toLowerCase()}`,
    battery: (n: number) => `${n > 0 ? '+' : '−'}${Math.abs(n)} kWh`,
    morale: (n: number) => `Morál ${n > 0 ? '+' : '−'}${Math.abs(n)}`,
    trust: (code: string, n: number) => `${code} bizalom ${n > 0 ? '+' : '−'}${Math.abs(n)}`,
    delay: (n: number) => `+${n} Sol késés`,
    ap: (n: number) => `−${n} AP ma`,
    robots: (code: string, n: number) => `−${n} ${code} robot`,
    integrity: (name: string, n: number) => `${name} ${n > 0 ? '+' : '−'}${Math.abs(n)}%`,
    mode: (name: string, mode: string) => `${name} → ${mode}`,
    route: 'Útvonal-előrehaladás',
    wheels: (n: number) => `Roverkerekek −${Math.abs(n)}%`,
    flare: 'Napkitörés-fedezék',
    verify: 'Útvonal ellenőrizve',
    tube: (n: number) => `Lávacső ${n > 0 ? '+' : '−'}${Math.abs(n)}%`
  },
  endings: {
    directorate: { name: 'Tudományos Direktórium', text: 'A Vault technológiája a tudósok vezette kolóniát formálja. Tízmillió ember érkezik a csodák világába — és új hierarchiákba.' },
    fragmented: { name: 'Széttöredezett kolónia', text: 'A Vault kinyílt, de a kolónia kettészakadt körülötte. Az érkezők rivális enklávékba és vitatott levegőbe szállnak le.' },
    regime: { name: 'Túlélési rezsim', text: 'A jel eltemetve, a hálózat kitart, de csak jegyrendszerrel és szigorú renddel. Az emberiség túlél — kemény feltételekkel.' },
    united: { name: 'Egyesült Emberi Kolónia', text: 'A jel lecsapolva, a lakótér lezárva, a legénység együtt maradt. A flotta egyetlen kolóniába száll le.' }
  },
  debrief: { lives: 'Megmentett életek', ending: 'Befejezés', delay: 'Késés', of: '10 000 000-ból' },
  missions: missionsHu,
  secrets: secretsHu
};

export const colonyMsgHu = (cmd: MsgFn): ReturnType<typeof colonyMsgEn> =>
colonyMessages({
  taskSolarDust: (p) => `Por a tömbön ${p.pct}%`,
  taskRegolith: (p) => `+${p.n} kg regolit · ${p.total} kg készleten`,
  taskIce: (p) => `+${p.n} kg víz a tartalékba`,
  taskModule: (p) => `${moduleNamesHu[String(p.id)] ?? p.id} ${p.pct}%`,
  taskFleet: (p) => `${p.code} flotta ${p.pct}%`,
  taskTube: (p) => `Lávacső-lakótér ${p.pct}%`,
  taskAntenna: (p) => `Tiszta flottakapcsolat · morál ${p.pct}%`,
  robotShortage: (p) => `Robothiány · ${p.code}`,
  robotShortageDetail: (p) => `A(z) ${cmd(p)} több szabad robotot igényel, mint amennyi a flottában elérhető.`,
  needRegolith: (p) => `${p.n} kg regolit kell`,
  taskDone: (p) => `${cmd(p)} kész`,
  taskStarted: (p) => `${cmd(p)} folyamatban`,
  taskEta: (p) => `Robotok lekötve · ${p.n} Sol múlva kész`,
  missionDecided: (p) => `${p.id} · ${missionsHu[String(p.id)]?.title ?? ''}`,
  missionChoice: (p) => `Döntés: ${missionsHu[String(p.id)]?.options[String(p.opt)]?.label ?? p.opt}`,
  flareIncoming: () => 'Napkitörés (SPE)',
  flareIncomingDetail: () => 'Protonvihar érkezik · a felszíni csapatok fedezékbe vonulnak, robotkopás ×3, −3 AP.',
  flareCleared: () => 'A napkitörés elült',
  flareClearedDetail: (p) => `A legénység összesített dózisa ${p.dose} mSv`,
  gridShed: (p) => `Hálózati lekapcsolás · ${gridHu[Number(p.level)] ?? ''}`,
  gridShedDetail: (p) => `Éjszakai hiány ${p.kwh} kWh. Lekapcsolási sorrend: SCI → NAV → SYS → életfenntartás.`,
  lifeDebt: () => 'Életfenntartási hiány',
  lifeDebtDetail: (p) => `Elfogyott az oxigén, a víz vagy az élelem · ${p.n} Sol óta hiány. Három egymás után a kolónia végét jelenti.`,
  moduleFailed: (p) => `${moduleNamesHu[String(p.id)] ?? p.id} meghibásodott`,
  moduleFailedDetail: (p) => `Integritás ${p.pct}% · holnap offline. Karbantartás nélkül újra leáll.`,
  fleetOffline: (p) => `${p.code} flotta offline`,
  fleetOfflineDetail: () => 'Az állapot 25% alatt. Javítsd meg a flottát, mielőtt feladatot adsz neki.',
  robotsStranded: (p) => `${p.n} ${p.code} robot kint rekedt`,
  robotsStrandedDetail: () => 'A terepen ragadt, elkopott robotok végleg elvesztek.',
  consequenceAverted: (p) => `${p.id} · következmény elhárítva`,
  consequenceAvertedDetail: (p) => `Amit azóta megtudtál, hatástalanította: „${missionsHu[String(p.id)]?.options[String(p.opt)]?.later ?? ''}”`,
  consequenceLanded: (p) => `${p.id} · ${missionsHu[String(p.id)]?.title ?? ''} — következmény`,
  consequenceDetail: (p) => missionsHu[String(p.id)]?.options[String(p.opt)]?.later ?? '',
  secretRevealed: (p) => `${leadsHu[String(p.a)] ?? p.a} megnyílik előtted`,
  secretDetail: (p) => secretsHu[String(p.a)] ?? '',
  defiance: (p) => `${leadsHu[String(p.a)] ?? p.a} saját szakállára cselekszik`,
  defianceDetail: () => 'Nyílt ellenszegülés: egy engedély nélküli készletelvonás 30 kg vízbe és morálba került.',
  lossCollapse: () => 'Az ARES-1 összeomlott három Sol életfenntartási hiány után',
  lossMutiny: () => 'A legénység morálja megtört · az ARES-1 irányítása elveszett',
  resupply: () => 'Teherledobás az orbitális flottától',
  resupplyDetail: (p) => `+${p.food} élelmiszeradag · +${p.h2} kg hidrogén · +40 kg regolit`,
  sysService: () => 'A kopott modul karbantartása',
  sysServiceWhy: (p) => `A(z) ${moduleNamesHu[String(p.id)] ?? p.id} túl van a komfortzónán. 50% alatt éjjel meghibásodhat.`,
  integrityTruth: (p) => `${moduleNamesHu[String(p.id)] ?? p.id} ${p.pct}%`,
  sysClean: () => 'A napelemtömb tisztítása',
  sysCleanWhy: () => 'A por felemészti a termelést. Tiszta tömbbel a bank éjjel is pozitív marad.',
  dustTruth: (p) => `Por a tömbön ${p.pct}%`,
  sysTube: () => 'A lávacső megerősítése',
  sysTubeWhy: () => 'A menekülteknek árnyékolt lakótér kell. Minden szakasz a 95%-os védelem felé visz.',
  tubeTruth: (p) => `Lakótér ${p.from}% → ${p.to}%`,
  sciMineIce: () => 'A jéglencse kitermelése',
  sciMineIceWhy: () => 'A víz a körforgás szűk keresztmetszete. Az elektrolízis gyorsabban fogyasztja, mint ahogy visszanyerjük.',
  waterTruth: (p) => `Víztartalék ${p.kg} kg`,
  sciRegolith: () => 'Regolit gyűjtése',
  sciRegolithWhy: () => 'A javítás és az építés is nyersanyagból él. Majdnem elfogyott.',
  regolithTruth: (p) => `Regolit ${p.n} kg`,
  commMorale: () => 'A flottaantenna kalibrálása',
  commMoraleWhy: () => 'A legénységnek hallania kell a flottát. A tiszta kapcsolat stabilizálja a morált.',
  moraleTruth: (p) => `Morál ${p.pct}%`,
  chkGrid: (p) => `Ma éjjel ${p.kwh} kWh hiány · ${gridHu[Number(p.level)] ?? ''}`,
  chkGridOk: (p) => `Akkumulátorbank hajnalra ~${p.kwh} kWh`,
  chkO2: (p) => `Az oxigéntartalék ilyen ütemben ~${p.n} Solig tart`,
  chkWater: (p) => `A víztartalék ilyen ütemben ~${p.n} Solig tart`,
  chkRobots: (p) => `${p.code} flotta: ${p.need} robot kell · ${p.free} szabad`
});