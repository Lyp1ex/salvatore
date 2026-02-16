import { useEffect, useMemo, useRef, useState } from "react";

type ScreenMode = "menu" | "battle" | "paused" | "gameover";

type BrawlerId = "vanguard" | "ember" | "frost" | "bolt";

interface BrawlerDefinition {
  id: BrawlerId;
  name: string;
  role: string;
  rarity: string;
  color: string;
  accent: string;
  unlockCost: number;
  baseHp: number;
  baseSpeed: number;
  baseDamage: number;
  bulletSpeed: number;
  fireCooldown: number;
  range: number;
  superDamage: number;
}

interface ProfileState {
  coins: number;
  selectedId: BrawlerId;
  unlocked: BrawlerId[];
  levels: Partial<Record<BrawlerId, number>>;
  matches: number;
  wins: number;
  highScore: number;
}

interface Vec2 {
  x: number;
  y: number;
}

interface PlayerState extends Vec2 {
  radius: number;
  hp: number;
  maxHp: number;
  speed: number;
  damage: number;
  bulletSpeed: number;
  fireCooldown: number;
  range: number;
  superDamage: number;
  shootCooldown: number;
  dashCooldown: number;
  dashTimer: number;
  superCharge: number;
  aimX: number;
  aimY: number;
  lastMoveX: number;
  lastMoveY: number;
  color: string;
  accent: string;
  level: number;
  dashLatch: boolean;
  superLatch: boolean;
}

interface EnemyState extends Vec2 {
  id: number;
  radius: number;
  hp: number;
  maxHp: number;
  speed: number;
  damage: number;
  fireCooldown: number;
  shootTimer: number;
  preferredRange: number;
  color: string;
}

interface ProjectileState extends Vec2 {
  id: number;
  vx: number;
  vy: number;
  radius: number;
  damage: number;
  ttl: number;
  fromEnemy: boolean;
  color: string;
}

interface GemState extends Vec2 {
  id: number;
  radius: number;
  ttl: number;
}

interface RectBlock {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface BattleState {
  mode: "battle" | "paused" | "gameover";
  selectedId: BrawlerId;
  player: PlayerState;
  enemies: EnemyState[];
  projectiles: ProjectileState[];
  gems: GemState[];
  elapsed: number;
  score: number;
  kills: number;
  spawnTimer: number;
  enemyId: number;
  projectileId: number;
  gemId: number;
  rewardCoins: number;
  rewardApplied: boolean;
}

interface MouseState {
  x: number;
  y: number;
  leftDown: boolean;
  rightDown: boolean;
}

declare global {
  interface Window {
    render_game_to_text?: () => string;
    advanceTime?: (ms: number) => void;
  }
}

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const FIXED_DT = 1 / 60;
const PROFILE_KEY = "arena-stars-profile-v2";
const MAX_LEVEL = 9;

const ARENA_BLOCKS: RectBlock[] = [
  { x: 280, y: 200, w: 130, h: 90 },
  { x: 510, y: 120, w: 100, h: 85 },
  { x: 760, y: 205, w: 150, h: 95 },
  { x: 230, y: 470, w: 160, h: 95 },
  { x: 610, y: 460, w: 130, h: 100 },
  { x: 930, y: 430, w: 130, h: 90 },
];

const BRAWLERS: BrawlerDefinition[] = [
  {
    id: "vanguard",
    name: "Vanguard",
    role: "Dengeli",
    rarity: "Başlangıç",
    color: "#53e2b7",
    accent: "#133f39",
    unlockCost: 0,
    baseHp: 3600,
    baseSpeed: 255,
    baseDamage: 440,
    bulletSpeed: 690,
    fireCooldown: 0.34,
    range: 520,
    superDamage: 1050,
  },
  {
    id: "ember",
    name: "Ember",
    role: "Agresif",
    rarity: "Nadir",
    color: "#ff8f4d",
    accent: "#4b2309",
    unlockCost: 260,
    baseHp: 3100,
    baseSpeed: 276,
    baseDamage: 510,
    bulletSpeed: 740,
    fireCooldown: 0.29,
    range: 500,
    superDamage: 900,
  },
  {
    id: "frost",
    name: "Frost",
    role: "Kontrol",
    rarity: "Süper Nadir",
    color: "#72d4ff",
    accent: "#10273d",
    unlockCost: 420,
    baseHp: 3300,
    baseSpeed: 245,
    baseDamage: 470,
    bulletSpeed: 650,
    fireCooldown: 0.38,
    range: 610,
    superDamage: 1120,
  },
  {
    id: "bolt",
    name: "Bolt",
    role: "Keskin Nişancı",
    rarity: "Epik",
    color: "#ffd85e",
    accent: "#46380a",
    unlockCost: 640,
    baseHp: 2900,
    baseSpeed: 238,
    baseDamage: 650,
    bulletSpeed: 820,
    fireCooldown: 0.46,
    range: 760,
    superDamage: 1380,
  },
];

const BRAWLER_BY_ID: Record<BrawlerId, BrawlerDefinition> = {
  vanguard: BRAWLERS[0],
  ember: BRAWLERS[1],
  frost: BRAWLERS[2],
  bolt: BRAWLERS[3],
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};

const distance = (a: Vec2, b: Vec2): number => {
  return Math.hypot(a.x - b.x, a.y - b.y);
};

const getUpgradeCost = (level: number): number => {
  return 70 + level * 55;
};

const getScaledStats = (base: BrawlerDefinition, level: number) => {
  const clamped = clamp(level, 1, MAX_LEVEL);
  const hpScale = 1 + (clamped - 1) * 0.1;
  const damageScale = 1 + (clamped - 1) * 0.085;

  return {
    maxHp: Math.round(base.baseHp * hpScale),
    speed: base.baseSpeed + (clamped - 1) * 3,
    damage: Math.round(base.baseDamage * damageScale),
    bulletSpeed: base.bulletSpeed,
    fireCooldown: Math.max(0.18, base.fireCooldown - (clamped - 1) * 0.009),
    range: base.range + (clamped - 1) * 8,
    superDamage: Math.round(base.superDamage * damageScale),
  };
};

const makeDefaultProfile = (): ProfileState => {
  return {
    coins: 320,
    selectedId: "vanguard",
    unlocked: ["vanguard"],
    levels: { vanguard: 1 },
    matches: 0,
    wins: 0,
    highScore: 0,
  };
};

const sanitizeProfile = (value: unknown): ProfileState => {
  const fallback = makeDefaultProfile();
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const row = value as Record<string, unknown>;
  const unlockedInput = Array.isArray(row.unlocked) ? row.unlocked : fallback.unlocked;
  const unlocked = unlockedInput.filter((id): id is BrawlerId =>
    BRAWLERS.some((brawler) => brawler.id === id),
  );

  if (!unlocked.includes("vanguard")) {
    unlocked.unshift("vanguard");
  }

  const levels: Partial<Record<BrawlerId, number>> = {};
  if (row.levels && typeof row.levels === "object") {
    const source = row.levels as Record<string, unknown>;
    for (const brawler of BRAWLERS) {
      const rawLevel = source[brawler.id];
      if (typeof rawLevel === "number") {
        levels[brawler.id] = clamp(Math.round(rawLevel), 1, MAX_LEVEL);
      }
    }
  }

  for (const id of unlocked) {
    if (!levels[id]) {
      levels[id] = 1;
    }
  }

  const selected = typeof row.selectedId === "string" && unlocked.includes(row.selectedId as BrawlerId)
    ? (row.selectedId as BrawlerId)
    : "vanguard";

  return {
    coins: typeof row.coins === "number" ? Math.max(0, Math.round(row.coins)) : fallback.coins,
    selectedId: selected,
    unlocked,
    levels,
    matches: typeof row.matches === "number" ? Math.max(0, Math.round(row.matches)) : fallback.matches,
    wins: typeof row.wins === "number" ? Math.max(0, Math.round(row.wins)) : fallback.wins,
    highScore: typeof row.highScore === "number" ? Math.max(0, Math.round(row.highScore)) : fallback.highScore,
  };
};

const loadProfile = (): ProfileState => {
  if (typeof window === "undefined") {
    return makeDefaultProfile();
  }

  const raw = window.localStorage.getItem(PROFILE_KEY);
  if (!raw) {
    return makeDefaultProfile();
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return sanitizeProfile(parsed);
  } catch {
    return makeDefaultProfile();
  }
};

const spawnEnemy = (battle: BattleState): void => {
  battle.enemyId += 1;
  const edge = Math.floor(Math.random() * 4);
  let x = 0;
  let y = 0;

  if (edge === 0) {
    x = Math.random() * CANVAS_WIDTH;
    y = -32;
  } else if (edge === 1) {
    x = CANVAS_WIDTH + 32;
    y = Math.random() * CANVAS_HEIGHT;
  } else if (edge === 2) {
    x = Math.random() * CANVAS_WIDTH;
    y = CANVAS_HEIGHT + 32;
  } else {
    x = -32;
    y = Math.random() * CANVAS_HEIGHT;
  }

  const wave = 1 + Math.floor(battle.elapsed / 20);
  const hpScale = 1 + wave * 0.08;
  const speedScale = 1 + wave * 0.03;

  const variantRoll = Math.random();
  const heavy = variantRoll < 0.25;
  const sniper = variantRoll > 0.77;

  const radius = heavy ? 28 : 22;
  const maxHp = Math.round((heavy ? 1150 : 760) * hpScale);

  battle.enemies.push({
    id: battle.enemyId,
    x,
    y,
    radius,
    hp: maxHp,
    maxHp,
    speed: (heavy ? 122 : 164) * speedScale,
    damage: Math.round((heavy ? 250 : 190) * hpScale),
    fireCooldown: sniper ? 1.85 : 1.18,
    shootTimer: Math.random() * 0.8,
    preferredRange: sniper ? 490 : 220,
    color: heavy ? "#d95575" : sniper ? "#7c9eff" : "#f87272",
  });
};

const resolveCircleBlock = (x: number, y: number, radius: number, block: RectBlock): Vec2 => {
  const nearestX = clamp(x, block.x, block.x + block.w);
  const nearestY = clamp(y, block.y, block.y + block.h);
  const dx = x - nearestX;
  const dy = y - nearestY;
  const distSq = dx * dx + dy * dy;

  if (distSq >= radius * radius) {
    return { x, y };
  }

  if (distSq > 0.0001) {
    const dist = Math.sqrt(distSq);
    const overlap = radius - dist;
    return {
      x: x + (dx / dist) * overlap,
      y: y + (dy / dist) * overlap,
    };
  }

  const leftGap = Math.abs(x - block.x);
  const rightGap = Math.abs(block.x + block.w - x);
  const topGap = Math.abs(y - block.y);
  const bottomGap = Math.abs(block.y + block.h - y);
  const minGap = Math.min(leftGap, rightGap, topGap, bottomGap);

  if (minGap === leftGap) {
    return { x: block.x - radius, y };
  }
  if (minGap === rightGap) {
    return { x: block.x + block.w + radius, y };
  }
  if (minGap === topGap) {
    return { x, y: block.y - radius };
  }
  return { x, y: block.y + block.h + radius };
};

const pointInsideBlock = (x: number, y: number, block: RectBlock): boolean => {
  return x >= block.x && x <= block.x + block.w && y >= block.y && y <= block.y + block.h;
};

const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

export default function App() {
  const [profile, setProfile] = useState<ProfileState>(() => loadProfile());
  const [screen, setScreen] = useState<ScreenMode>("menu");
  const [toast, setToast] = useState("");

  const profileRef = useRef(profile);
  const screenRef = useRef<ScreenMode>(screen);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const battleRef = useRef<BattleState | null>(null);
  const mouseRef = useRef<MouseState>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    leftDown: false,
    rightDown: false,
  });
  const keyStateRef = useRef<Record<string, boolean>>({});
  const rafRef = useRef<number | null>(null);
  const accumulatorRef = useRef(0);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  useEffect(() => {
    screenRef.current = screen;
  }, [screen]);

  useEffect(() => {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const selectedBrawler = useMemo(() => {
    return BRAWLER_BY_ID[profile.selectedId];
  }, [profile.selectedId]);

  const selectedLevel = profile.levels[selectedBrawler.id] ?? 1;
  const selectedStats = useMemo(() => {
    return getScaledStats(selectedBrawler, selectedLevel);
  }, [selectedBrawler, selectedLevel]);

  const winRate = useMemo(() => {
    if (profile.matches <= 0) {
      return 0;
    }
    return Math.round((profile.wins / profile.matches) * 100);
  }, [profile.matches, profile.wins]);

  const startBattle = (): void => {
    const currentProfile = profileRef.current;
    const picked = BRAWLER_BY_ID[currentProfile.selectedId];
    const level = currentProfile.levels[picked.id] ?? 1;
    const stats = getScaledStats(picked, level);

    battleRef.current = {
      mode: "battle",
      selectedId: picked.id,
      player: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        radius: 20,
        hp: stats.maxHp,
        maxHp: stats.maxHp,
        speed: stats.speed,
        damage: stats.damage,
        bulletSpeed: stats.bulletSpeed,
        fireCooldown: stats.fireCooldown,
        range: stats.range,
        superDamage: stats.superDamage,
        shootCooldown: 0,
        dashCooldown: 0,
        dashTimer: 0,
        superCharge: 0,
        aimX: CANVAS_WIDTH / 2 + 40,
        aimY: CANVAS_HEIGHT / 2,
        lastMoveX: 1,
        lastMoveY: 0,
        color: picked.color,
        accent: picked.accent,
        level,
        dashLatch: false,
        superLatch: false,
      },
      enemies: [],
      projectiles: [],
      gems: [],
      elapsed: 0,
      score: 0,
      kills: 0,
      spawnTimer: 0.8,
      enemyId: 0,
      projectileId: 0,
      gemId: 0,
      rewardCoins: 0,
      rewardApplied: false,
    };

    setScreen("battle");
  };

  const backToMenu = (): void => {
    battleRef.current = null;
    setScreen("menu");
    mouseRef.current.leftDown = false;
    mouseRef.current.rightDown = false;
  };

  const grantRewards = (battle: BattleState): void => {
    if (battle.rewardApplied) {
      return;
    }

    const finalScore = Math.floor(battle.score);
    battle.rewardApplied = true;
    battle.rewardCoins = Math.max(20, Math.floor(finalScore / 18) + battle.kills * 12);

    setProfile((previous) => {
      const win = finalScore >= 1400;
      return {
        ...previous,
        coins: previous.coins + battle.rewardCoins,
        matches: previous.matches + 1,
        wins: previous.wins + (win ? 1 : 0),
        highScore: Math.max(previous.highScore, finalScore),
      };
    });
  };

  const tryUnlock = (id: BrawlerId): void => {
    const brawler = BRAWLER_BY_ID[id];

    setProfile((previous) => {
      if (previous.unlocked.includes(id)) {
        return previous;
      }
      if (previous.coins < brawler.unlockCost) {
        return previous;
      }

      const nextUnlocked = [...previous.unlocked, id];
      const nextLevels: Partial<Record<BrawlerId, number>> = {
        ...previous.levels,
        [id]: 1,
      };

      return {
        ...previous,
        coins: previous.coins - brawler.unlockCost,
        selectedId: id,
        unlocked: nextUnlocked,
        levels: nextLevels,
      };
    });
  };

  const tryUpgrade = (id: BrawlerId): void => {
    setProfile((previous) => {
      if (!previous.unlocked.includes(id)) {
        return previous;
      }

      const currentLevel = previous.levels[id] ?? 1;
      if (currentLevel >= MAX_LEVEL) {
        return previous;
      }

      const cost = getUpgradeCost(currentLevel);
      if (previous.coins < cost) {
        return previous;
      }

      return {
        ...previous,
        coins: previous.coins - cost,
        levels: {
          ...previous.levels,
          [id]: currentLevel + 1,
        },
      };
    });
  };

  const setSelected = (id: BrawlerId): void => {
    setProfile((previous) => {
      if (!previous.unlocked.includes(id)) {
        return previous;
      }

      return {
        ...previous,
        selectedId: id,
      };
    });
  };

  const toggleFullscreen = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    if (!document.fullscreenElement) {
      void canvas.requestFullscreen();
      return;
    }

    void document.exitFullscreen();
  };

  const restartBattle = (): void => {
    startBattle();
  };

  const stepBattle = (dt: number): void => {
    const battle = battleRef.current;
    if (!battle) {
      return;
    }

    if (battle.mode === "paused" || battle.mode === "gameover") {
      return;
    }

    battle.elapsed += dt;
    battle.spawnTimer -= dt;

    if (battle.spawnTimer <= 0) {
      spawnEnemy(battle);
      const pace = Math.max(0.35, 1.2 - battle.elapsed * 0.005);
      battle.spawnTimer = pace + Math.random() * 0.35;
    }

    const keys = keyStateRef.current;
    const player = battle.player;
    const mouse = mouseRef.current;

    const moveX =
      (keys.KeyD || keys.ArrowRight ? 1 : 0) -
      (keys.KeyA || keys.ArrowLeft ? 1 : 0);
    const moveY =
      (keys.KeyS || keys.ArrowDown ? 1 : 0) -
      (keys.KeyW || keys.ArrowUp ? 1 : 0);

    const hasMoveInput = moveX !== 0 || moveY !== 0;
    const moveLength = hasMoveInput ? Math.hypot(moveX, moveY) : 1;
    const dirX = hasMoveInput ? moveX / moveLength : 0;
    const dirY = hasMoveInput ? moveY / moveLength : 0;

    if (hasMoveInput) {
      player.lastMoveX = dirX;
      player.lastMoveY = dirY;
    }

    player.shootCooldown = Math.max(0, player.shootCooldown - dt);
    player.dashCooldown = Math.max(0, player.dashCooldown - dt);
    player.dashTimer = Math.max(0, player.dashTimer - dt);

    const dashPressed = Boolean(keys.ShiftLeft || keys.ShiftRight);
    if (dashPressed && !player.dashLatch && player.dashCooldown <= 0) {
      player.dashTimer = 0.18;
      player.dashCooldown = 1.7;
    }
    player.dashLatch = dashPressed;

    const moveBoost = player.dashTimer > 0 ? 2.45 : 1;
    const velocityX = dirX * player.speed * moveBoost;
    const velocityY = dirY * player.speed * moveBoost;

    let nextX = clamp(player.x + velocityX * dt, player.radius, CANVAS_WIDTH - player.radius);
    let nextY = clamp(player.y + velocityY * dt, player.radius, CANVAS_HEIGHT - player.radius);

    for (const block of ARENA_BLOCKS) {
      const corrected = resolveCircleBlock(nextX, nextY, player.radius, block);
      nextX = corrected.x;
      nextY = corrected.y;
    }

    player.x = nextX;
    player.y = nextY;

    player.aimX = mouse.x;
    player.aimY = mouse.y;

    const aimDX = player.aimX - player.x;
    const aimDY = player.aimY - player.y;
    const aimDistance = Math.hypot(aimDX, aimDY);
    const shootX = aimDistance > 1 ? aimDX / aimDistance : player.lastMoveX;
    const shootY = aimDistance > 1 ? aimDY / aimDistance : player.lastMoveY;

    const shouldShoot = mouse.leftDown || Boolean(keys.Space);
    if (shouldShoot && player.shootCooldown <= 0) {
      battle.projectileId += 1;
      battle.projectiles.push({
        id: battle.projectileId,
        x: player.x + shootX * 26,
        y: player.y + shootY * 26,
        vx: shootX * player.bulletSpeed,
        vy: shootY * player.bulletSpeed,
        radius: 7,
        damage: player.damage,
        ttl: player.range / player.bulletSpeed,
        fromEnemy: false,
        color: "#fff3b0",
      });
      player.shootCooldown = player.fireCooldown;
    }

    const superPressed = mouse.rightDown || Boolean(keys.KeyQ);
    if (superPressed && !player.superLatch && player.superCharge >= 100) {
      const blastRadius = 190;
      for (const enemy of battle.enemies) {
        const enemyDistance = distance(player, enemy);
        if (enemyDistance <= blastRadius) {
          enemy.hp -= player.superDamage;
        }
      }
      player.superCharge = 0;
    }
    player.superLatch = superPressed;

    const pullPressed = Boolean(keys.KeyE);

    const remainingProjectiles: ProjectileState[] = [];
    for (const projectile of battle.projectiles) {
      projectile.x += projectile.vx * dt;
      projectile.y += projectile.vy * dt;
      projectile.ttl -= dt;

      if (
        projectile.ttl <= 0 ||
        projectile.x < -20 ||
        projectile.x > CANVAS_WIDTH + 20 ||
        projectile.y < -20 ||
        projectile.y > CANVAS_HEIGHT + 20
      ) {
        continue;
      }

      let blocked = false;
      for (const block of ARENA_BLOCKS) {
        if (pointInsideBlock(projectile.x, projectile.y, block)) {
          blocked = true;
          break;
        }
      }
      if (blocked) {
        continue;
      }

      if (projectile.fromEnemy) {
        if (distance(projectile, player) <= projectile.radius + player.radius) {
          player.hp -= projectile.damage;
          continue;
        }
      } else {
        let hitEnemy = false;
        for (const enemy of battle.enemies) {
          if (distance(projectile, enemy) <= projectile.radius + enemy.radius) {
            enemy.hp -= projectile.damage;
            player.superCharge = clamp(player.superCharge + 9, 0, 100);
            hitEnemy = true;
            break;
          }
        }
        if (hitEnemy) {
          continue;
        }
      }

      remainingProjectiles.push(projectile);
    }

    battle.projectiles = remainingProjectiles;

    const aliveEnemies: EnemyState[] = [];
    for (const enemy of battle.enemies) {
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      const dist = Math.hypot(dx, dy);
      const dirEnemyX = dist > 0.001 ? dx / dist : 0;
      const dirEnemyY = dist > 0.001 ? dy / dist : 0;

      if (dist > enemy.preferredRange) {
        enemy.x += dirEnemyX * enemy.speed * dt;
        enemy.y += dirEnemyY * enemy.speed * dt;
      }

      enemy.x = clamp(enemy.x, enemy.radius, CANVAS_WIDTH - enemy.radius);
      enemy.y = clamp(enemy.y, enemy.radius, CANVAS_HEIGHT - enemy.radius);

      enemy.shootTimer -= dt;
      if (enemy.shootTimer <= 0 && dist <= enemy.preferredRange + 60) {
        battle.projectileId += 1;
        const speed = 380;
        battle.projectiles.push({
          id: battle.projectileId,
          x: enemy.x + dirEnemyX * 18,
          y: enemy.y + dirEnemyY * 18,
          vx: dirEnemyX * speed,
          vy: dirEnemyY * speed,
          radius: 6,
          damage: enemy.damage,
          ttl: 1.9,
          fromEnemy: true,
          color: "#ff9ca8",
        });
        enemy.shootTimer = enemy.fireCooldown + Math.random() * 0.6;
      }

      if (dist < player.radius + enemy.radius + 4) {
        player.hp -= enemy.damage * 0.55 * dt;
      }

      if (enemy.hp <= 0) {
        battle.kills += 1;
        battle.score += 90;
        battle.gemId += 1;
        battle.gems.push({
          id: battle.gemId,
          x: enemy.x,
          y: enemy.y,
          radius: 8,
          ttl: 8,
        });
        continue;
      }

      aliveEnemies.push(enemy);
    }

    battle.enemies = aliveEnemies;

    const remainingGems: GemState[] = [];
    for (const gem of battle.gems) {
      gem.ttl -= dt;
      if (gem.ttl <= 0) {
        continue;
      }

      const dx = player.x - gem.x;
      const dy = player.y - gem.y;
      const dist = Math.hypot(dx, dy);

      const pullRadius = pullPressed ? 240 : 130;
      if (dist <= pullRadius && dist > 0.01) {
        const magnetSpeed = pullPressed ? 460 : 260;
        gem.x += (dx / dist) * magnetSpeed * dt;
        gem.y += (dy / dist) * magnetSpeed * dt;
      }

      if (distance(gem, player) <= gem.radius + player.radius) {
        battle.score += 32;
        player.superCharge = clamp(player.superCharge + 6, 0, 100);
        player.hp = clamp(player.hp + 70, 0, player.maxHp);
        continue;
      }

      remainingGems.push(gem);
    }

    battle.gems = remainingGems;

    battle.score += dt * 34;

    if (player.hp <= 0) {
      player.hp = 0;
      battle.mode = "gameover";
      setScreen("gameover");
      grantRewards(battle);
    }
  };

  const renderFrame = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gradient.addColorStop(0, "#12233f");
    gradient.addColorStop(1, "#1a4a66");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.strokeStyle = "rgba(255,255,255,0.055)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= CANVAS_WIDTH; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= CANVAS_HEIGHT; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }

    for (const block of ARENA_BLOCKS) {
      drawRoundedRect(ctx, block.x, block.y, block.w, block.h, 18);
      ctx.fillStyle = "rgba(76, 122, 93, 0.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(12, 45, 28, 0.8)";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    const battle = battleRef.current;
    if (!battle) {
      ctx.fillStyle = "rgba(0,0,0,0.36)";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = "#f8f9ff";
      ctx.textAlign = "center";
      ctx.font = "700 56px 'Trebuchet MS', sans-serif";
      ctx.fillText("ARENA STARS", CANVAS_WIDTH / 2, 210);
      ctx.font = "600 24px 'Trebuchet MS', sans-serif";
      ctx.fillText("Brawl tarzı hızlı arena prototipi", CANVAS_WIDTH / 2, 258);
      ctx.font = "500 20px 'Trebuchet MS', sans-serif";
      ctx.fillText("Karakter seç, yükselt, savaşa gir.", CANVAS_WIDTH / 2, 295);
      return;
    }

    for (const gem of battle.gems) {
      ctx.beginPath();
      ctx.arc(gem.x, gem.y, gem.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#85f2ff";
      ctx.fill();
      ctx.strokeStyle = "#d6fbff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    for (const projectile of battle.projectiles) {
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
      ctx.fillStyle = projectile.color;
      ctx.fill();
    }

    for (const enemy of battle.enemies) {
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
      ctx.fillStyle = enemy.color;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 3;
      ctx.stroke();

      const hpRatio = clamp(enemy.hp / enemy.maxHp, 0, 1);
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(enemy.x - 26, enemy.y - enemy.radius - 16, 52, 6);
      ctx.fillStyle = "#7bff9a";
      ctx.fillRect(enemy.x - 26, enemy.y - enemy.radius - 16, 52 * hpRatio, 6);
    }

    const player = battle.player;
    const scoreValue = Math.floor(battle.score);
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.strokeStyle = player.accent;
    ctx.lineWidth = 4;
    ctx.stroke();

    const aimDx = player.aimX - player.x;
    const aimDy = player.aimY - player.y;
    const aimLength = Math.hypot(aimDx, aimDy);
    if (aimLength > 0.001) {
      const nx = aimDx / aimLength;
      const ny = aimDy / aimLength;
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(player.x, player.y);
      ctx.lineTo(player.x + nx * 34, player.y + ny * 34);
      ctx.stroke();
    }

    const hpRatio = clamp(player.hp / player.maxHp, 0, 1);
    const superRatio = clamp(player.superCharge / 100, 0, 1);

    drawRoundedRect(ctx, 22, 20, 320, 72, 16);
    ctx.fillStyle = "rgba(9,15,29,0.65)";
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.18)";
    drawRoundedRect(ctx, 36, 42, 210, 14, 7);
    ctx.fill();

    ctx.fillStyle = "#6dffa0";
    drawRoundedRect(ctx, 36, 42, 210 * hpRatio, 14, 7);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.18)";
    drawRoundedRect(ctx, 36, 64, 210, 12, 6);
    ctx.fill();

    ctx.fillStyle = "#76c6ff";
    drawRoundedRect(ctx, 36, 64, 210 * superRatio, 12, 6);
    ctx.fill();

    ctx.fillStyle = "#f3f7ff";
    ctx.font = "600 16px 'Trebuchet MS', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`${BRAWLER_BY_ID[battle.selectedId].name} Lv.${player.level}`, 36, 35);
    ctx.fillText(`Skor ${scoreValue}  K.O. ${battle.kills}`, 266, 42);
    ctx.fillText(`Süre ${battle.elapsed.toFixed(1)}s`, 266, 66);

    drawRoundedRect(ctx, CANVAS_WIDTH - 385, 18, 365, 52, 14);
    ctx.fillStyle = "rgba(9,15,29,0.66)";
    ctx.fill();
    ctx.fillStyle = "#d7f0ff";
    ctx.font = "500 15px 'Trebuchet MS', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("WASD/Ok: Hareket  Sol Tık/Space: Ateş", CANVAS_WIDTH - 372, 39);
    ctx.fillText("Shift: Dash  Q/Sağ Tık: Süper  E: Çekim", CANVAS_WIDTH - 372, 59);

    if (keyStateRef.current.Tab) {
      drawRoundedRect(ctx, CANVAS_WIDTH / 2 - 160, 120, 320, 160, 16);
      ctx.fillStyle = "rgba(7, 10, 17, 0.74)";
      ctx.fill();
      ctx.fillStyle = "#f3f7ff";
      ctx.textAlign = "center";
      ctx.font = "700 24px 'Trebuchet MS', sans-serif";
      ctx.fillText("Skor Tablosu", CANVAS_WIDTH / 2, 155);
      ctx.font = "500 18px 'Trebuchet MS', sans-serif";
      ctx.fillText(`Skor: ${scoreValue}`, CANVAS_WIDTH / 2, 196);
      ctx.fillText(`K.O.: ${battle.kills}`, CANVAS_WIDTH / 2, 224);
      ctx.fillText(`Toplanan Coin: ${battle.rewardCoins}`, CANVAS_WIDTH / 2, 252);
    }

    if (battle.mode === "paused") {
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.font = "700 48px 'Trebuchet MS', sans-serif";
      ctx.fillText("Duraklatıldı", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 14);
      ctx.font = "500 24px 'Trebuchet MS', sans-serif";
      ctx.fillText("ESC ile devam et", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 28);
    }

    if (battle.mode === "gameover") {
      ctx.fillStyle = "rgba(0,0,0,0.62)";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.font = "700 52px 'Trebuchet MS', sans-serif";
      ctx.fillText("Yenildin", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);
      ctx.font = "500 28px 'Trebuchet MS', sans-serif";
      ctx.fillText(`Skor: ${scoreValue}  |  Coin: +${battle.rewardCoins}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 6);
      ctx.font = "500 22px 'Trebuchet MS', sans-serif";
      ctx.fillText("R: Tekrar Oyna   M: Menü", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 48);
    }
  };

  const stepGame = (dt: number): void => {
    const battle = battleRef.current;
    if (battle && battle.mode === "battle") {
      stepBattle(dt);
    }

    renderFrame();
  };

  useEffect(() => {
    document.title = "Arena Stars";

    const onKeyDown = (event: KeyboardEvent) => {
      keyStateRef.current[event.code] = true;

      if (event.code === "Tab" || event.code === "Space") {
        event.preventDefault();
      }

      if (event.code === "KeyF") {
        event.preventDefault();
        toggleFullscreen();
      }

      const battle = battleRef.current;
      if (!battle) {
        return;
      }

      if (event.code === "Escape") {
        event.preventDefault();
        if (battle.mode === "battle") {
          battle.mode = "paused";
          setScreen("paused");
        } else if (battle.mode === "paused") {
          battle.mode = "battle";
          setScreen("battle");
        }
      }

      if (battle.mode === "gameover") {
        if (event.code === "KeyR") {
          restartBattle();
        }
        if (event.code === "KeyM") {
          backToMenu();
        }
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      keyStateRef.current[event.code] = false;
    };

    const updateMouseFromEvent = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
      const x = ((event.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
      const y = ((event.clientY - rect.top) / rect.height) * CANVAS_HEIGHT;
      mouseRef.current.x = clamp(x, 0, CANVAS_WIDTH);
      mouseRef.current.y = clamp(y, 0, CANVAS_HEIGHT);
    };

    const canvas = canvasRef.current;
    if (canvas) {
      const onMouseMove = (event: MouseEvent) => {
        updateMouseFromEvent(event);
      };

      const onMouseDown = (event: MouseEvent) => {
        updateMouseFromEvent(event);
        if (event.button === 0) {
          mouseRef.current.leftDown = true;
        }
        if (event.button === 2) {
          mouseRef.current.rightDown = true;
        }
      };

      const onMouseUp = (event: MouseEvent) => {
        if (event.button === 0) {
          mouseRef.current.leftDown = false;
        }
        if (event.button === 2) {
          mouseRef.current.rightDown = false;
        }
      };

      const onContextMenu = (event: MouseEvent) => {
        event.preventDefault();
      };

      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mousedown", onMouseDown);
      canvas.addEventListener("mouseup", onMouseUp);
      canvas.addEventListener("contextmenu", onContextMenu);

      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);

      return () => {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("contextmenu", onContextMenu);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
      };
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    const tick = (timestamp: number) => {
      if (lastFrameRef.current === 0) {
        lastFrameRef.current = timestamp;
      }

      const elapsedMs = timestamp - lastFrameRef.current;
      lastFrameRef.current = timestamp;
      accumulatorRef.current += Math.min(0.25, elapsedMs / 1000);

      while (accumulatorRef.current >= FIXED_DT) {
        stepGame(FIXED_DT);
        accumulatorRef.current -= FIXED_DT;
      }

      renderFrame();
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const renderText = () => {
      const activeBattle = battleRef.current;
      const profileNow = profileRef.current;

      if (!activeBattle) {
        return JSON.stringify({
          mode: "menu",
          coordinate_system: "origin=(0,0) top-left, +x right, +y down",
          selected_brawler: profileNow.selectedId,
          coins: profileNow.coins,
          unlocked: profileNow.unlocked,
          levels: profileNow.levels,
          controls: {
            movement: ["W", "A", "S", "D", "Arrow keys"],
            attack: ["Left click", "Space"],
            super: ["Q", "Right click"],
            dash: ["Shift"],
            interact: ["E"],
            pause: ["Esc"],
            fullscreen: ["F"],
          },
        });
      }

      return JSON.stringify({
        mode: activeBattle.mode,
        coordinate_system: "origin=(0,0) top-left, +x right, +y down",
        arena: {
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          blocks: ARENA_BLOCKS,
        },
        selected_brawler: activeBattle.selectedId,
        player: {
          x: Number(activeBattle.player.x.toFixed(2)),
          y: Number(activeBattle.player.y.toFixed(2)),
          hp: Number(activeBattle.player.hp.toFixed(1)),
          max_hp: activeBattle.player.maxHp,
          super_charge: Number(activeBattle.player.superCharge.toFixed(1)),
          dash_cooldown: Number(activeBattle.player.dashCooldown.toFixed(2)),
          level: activeBattle.player.level,
        },
        enemies: activeBattle.enemies.map((enemy) => ({
          id: enemy.id,
          x: Number(enemy.x.toFixed(1)),
          y: Number(enemy.y.toFixed(1)),
          hp: Number(enemy.hp.toFixed(1)),
          radius: enemy.radius,
        })),
        gems: activeBattle.gems.map((gem) => ({
          id: gem.id,
          x: Number(gem.x.toFixed(1)),
          y: Number(gem.y.toFixed(1)),
        })),
        projectiles: activeBattle.projectiles.length,
        score: Math.floor(activeBattle.score),
        kills: activeBattle.kills,
        elapsed: Number(activeBattle.elapsed.toFixed(2)),
      });
    };

    window.render_game_to_text = renderText;

    window.advanceTime = (ms: number) => {
      const frames = Math.max(1, Math.round(ms / (1000 / 60)));
      for (let i = 0; i < frames; i += 1) {
        stepGame(FIXED_DT);
      }
    };

    return () => {
      delete window.render_game_to_text;
      delete window.advanceTime;
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToast("");
    }, 1900);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toast]);

  const battle = battleRef.current;

  return (
    <div className="game-app">
      <div className="arena-shell">
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} id="arena-canvas" />

        {screen === "menu" ? (
          <section className="overlay menu-overlay">
            <h1>Arena Stars</h1>
            <p className="tagline">Brawl tarzı arena: karakter aç, seç, yükselt ve savaş.</p>

            <div className="session-strip">
              <span>Sezon: Metro Core</span>
              <span>Kazanma: %{winRate}</span>
              <span>Hazır: {selectedBrawler.name}</span>
            </div>

            <div className="profile-strip">
              <span>Coin: {profile.coins}</span>
              <span>Maç: {profile.matches}</span>
              <span>Kazanma: {profile.wins}</span>
              <span>En Yüksek Skor: {profile.highScore}</span>
            </div>

            <div className="brawler-grid">
              {BRAWLERS.map((brawler) => {
                const unlocked = profile.unlocked.includes(brawler.id);
                const selected = profile.selectedId === brawler.id;
                const level = profile.levels[brawler.id] ?? 1;
                const upgradeCost = getUpgradeCost(level);
                const canUpgrade = unlocked && level < MAX_LEVEL && profile.coins >= upgradeCost;
                const scaledStats = getScaledStats(brawler, level);
                const hpPercent = clamp((scaledStats.maxHp / 5200) * 100, 24, 100);
                const speedPercent = clamp((scaledStats.speed / 320) * 100, 24, 100);
                const damagePercent = clamp((scaledStats.damage / 900) * 100, 24, 100);

                return (
                  <article
                    key={brawler.id}
                    className={`brawler-card ${selected ? "is-selected" : ""} ${unlocked ? "" : "is-locked"}`}
                    style={{ borderColor: brawler.color }}
                  >
                    <div className="brawler-top">
                      <span className="rarity">{brawler.rarity}</span>
                      <strong>{brawler.name}</strong>
                    </div>

                    <p>
                      {brawler.role} • Seviye {level}
                    </p>

                    <div className="stat-list" aria-label={`${brawler.name} statları`}>
                      <div className="stat-line">
                        <span>Can</span>
                        <div className="stat-bar">
                          <i style={{ width: `${hpPercent}%` }} />
                        </div>
                      </div>
                      <div className="stat-line">
                        <span>Hız</span>
                        <div className="stat-bar">
                          <i style={{ width: `${speedPercent}%` }} />
                        </div>
                      </div>
                      <div className="stat-line">
                        <span>Güç</span>
                        <div className="stat-bar">
                          <i style={{ width: `${damagePercent}%` }} />
                        </div>
                      </div>
                    </div>

                    {!unlocked ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (profile.coins < brawler.unlockCost) {
                            setToast("Yetersiz coin.");
                            return;
                          }
                          tryUnlock(brawler.id);
                          setToast(`${brawler.name} açıldı.`);
                        }}
                      >
                        Aç ({brawler.unlockCost} coin)
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(brawler.id);
                            setToast(`${brawler.name} seçildi.`);
                          }}
                        >
                          {selected ? "Seçili" : "Seç"}
                        </button>

                        <button
                          type="button"
                          disabled={level >= MAX_LEVEL || !canUpgrade}
                          onClick={() => {
                            if (level >= MAX_LEVEL) {
                              setToast("Maksimum seviyede.");
                              return;
                            }
                            if (profile.coins < upgradeCost) {
                              setToast("Yükseltme için coin yetmiyor.");
                              return;
                            }
                            tryUpgrade(brawler.id);
                            setToast(`${brawler.name} seviye ${level + 1} oldu.`);
                          }}
                        >
                          {level >= MAX_LEVEL ? "Maks" : `Yükselt (${upgradeCost})`}
                        </button>
                      </>
                    )}
                  </article>
                );
              })}
            </div>

            <div className="menu-bottom">
              <div className="selected-preview">
                <strong>Seçili: {selectedBrawler.name}</strong>
                <span>Rol: {selectedBrawler.role}</span>
                <span>Seviye: {selectedLevel}</span>
                <div className="selected-metrics">
                  <span>Can {selectedStats.maxHp}</span>
                  <span>Hasar {selectedStats.damage}</span>
                  <span>Menzil {selectedStats.range}</span>
                </div>
              </div>

              <button id="start-btn" className="start-btn" type="button" onClick={startBattle}>
                Savaşa Başla
              </button>
            </div>

            <p className="control-note">
              Kontroller: WASD/Ok, Sol Tık/Space ateş, Shift dash, Q/Sağ Tık süper, E çekim, ESC duraklat, F fullscreen.
            </p>
          </section>
        ) : null}

        {screen !== "menu" ? (
          <section className="overlay battle-overlay">
            <div className="battle-buttons">
              <button
                type="button"
                onClick={() => {
                  const activeBattle = battleRef.current;
                  if (!activeBattle) {
                    return;
                  }

                  if (activeBattle.mode === "battle") {
                    activeBattle.mode = "paused";
                    setScreen("paused");
                    return;
                  }

                  if (activeBattle.mode === "paused") {
                    activeBattle.mode = "battle";
                    setScreen("battle");
                  }
                }}
              >
                {screen === "paused" ? "Devam Et" : "Duraklat"}
              </button>

              <button
                type="button"
                onClick={() => {
                  restartBattle();
                }}
              >
                Yeniden Başlat
              </button>

              <button
                type="button"
                onClick={() => {
                  const activeBattle = battleRef.current;
                  if (activeBattle) {
                    grantRewards(activeBattle);
                  }
                  backToMenu();
                }}
              >
                Menü
              </button>
            </div>

            {battle?.mode === "gameover" ? (
              <div className="result-card">
                <strong>Maç bitti</strong>
                <span>Skor: {Math.floor(battle.score)}</span>
                <span>Coin: +{battle.rewardCoins}</span>
              </div>
            ) : null}
          </section>
        ) : null}

        {toast ? <div className="toast">{toast}</div> : null}
      </div>
    </div>
  );
}
