/**
 * ============================================================================
 * SUPER MARIO BROS - 6 WORLDS EDITION
 * Pure Vanilla JavaScript (ES6+), Canvas 2D, Web Audio API Synthesis
 * Features 6 distinct progressive worlds with increasing difficulty:
 *  - Mundo 1-1: Pradera Soleada (Overworld Grassland)
 *  - Mundo 1-2: Caverna Subterránea (Underground Cavern)
 *  - Mundo 1-3: Colinas del Atardecer (Sunset Mushroom Heights)
 *  - Mundo 1-4: Castillo de Lava (Bowser's Lava Dungeon)
 *  - Mundo 2-1: Dunas del Desierto (Desert Pyramids)
 *  - Mundo 2-2: Fortaleza Celestial (Cosmic Star Fortress)
 * ============================================================================
 */

// --- 1. WEB AUDIO SYNTHESIZER ---
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  jump(isSuper = false) {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const startFreq = isSuper ? 130 : 160;
      const endFreq = isSuper ? 480 : 580;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.17);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } catch (_) {}
  }

  coin() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (_) {}
  }

  stomp() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.12);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (_) {}
  }

  kickShell() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (_) {}
  }

  bump() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.1);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (_) {}
  }

  brickBreak() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.18);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch (_) {}
  }

  sprout() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(520, now + 0.28);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch (_) {}
  }

  powerup() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [330, 392, 659, 523, 587, 784];
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.1);
      });
    } catch (_) {}
  }

  flagSlide() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.95);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.95);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.95);
    } catch (_) {}
  }

  victory() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const melody = [
        { f: 523.25, d: 0.12 },
        { f: 659.25, d: 0.12 },
        { f: 783.99, d: 0.12 },
        { f: 1046.5, d: 0.28 },
        { f: 880.00, d: 0.15 },
        { f: 1046.5, d: 0.40 }
      ];
      let t = now;
      melody.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(item.f, t);
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + item.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + item.d);
        t += item.d + 0.04;
      });
    } catch (_) {}
  }

  die() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [500, 470, 440, 400, 360, 300, 220, 160];
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.08);
      });
    } catch (_) {}
  }

  gameover() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [330, 294, 261, 196, 174, 130];
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.18;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.25, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.18);
      });
    } catch (_) {}
  }
}

// --- 2. PARTICLES & FLOATING TEXTS ---
class Particle {
  constructor(x, y, vx, vy, color, size, life = 30, gravity = 0.25) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.maxLife = life;
    this.life = life;
    this.gravity = gravity;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.35;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.rotation += this.rotSpeed;
    this.life--;
  }

  draw(ctx, camX) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(Math.round(this.x - camX), Math.round(this.y));
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

class FloatingText {
  constructor(text, x, y, color = '#fcd116', life = 45) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.life = life;
    this.maxLife = life;
  }

  update() {
    this.y -= 0.9;
    this.life--;
  }

  draw(ctx, camX) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillStyle = '#000';
    ctx.fillText(this.text, Math.round(this.x - camX) + 1, Math.round(this.y) + 1);
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, Math.round(this.x - camX), Math.round(this.y));
    ctx.restore();
  }
}

// --- 3. CONSTANTS & WORLD THEMES ---
const TILE_SIZE = 32;
const GRAVITY = 0.49;
const MAX_FALL_SPEED = 11;

// 6 Progressive Worlds with unique color palettes & aesthetics
const WORLD_THEMES = [
  {
    code: '1-1',
    name: 'Pradera Soleada',
    sky: '#5c94fc',
    skyType: 'normal',
    groundTop: '#00a800',
    groundBody: '#b84418',
    brickBody: '#b84418',
    brickHighlight: '#e07438',
    brickShadow: '#541200',
    pipeGreen: '#00a800',
    pipeHighlight: '#5cfc5c',
    pipeShadow: '#005800',
    hasLava: false
  },
  {
    code: '1-2',
    name: 'Caverna Subterránea',
    sky: '#0a0d16',
    skyType: 'cavern',
    groundTop: '#008088',
    groundBody: '#004860',
    brickBody: '#005878',
    brickHighlight: '#2090b8',
    brickShadow: '#002030',
    pipeGreen: '#008899',
    pipeHighlight: '#40d0e0',
    pipeShadow: '#004450',
    hasLava: false
  },
  {
    code: '1-3',
    name: 'Colinas del Atardecer',
    sky: '#d85830',
    skyType: 'sunset',
    groundTop: '#d87020',
    groundBody: '#883010',
    brickBody: '#c83820',
    brickHighlight: '#f06040',
    brickShadow: '#601808',
    pipeGreen: '#b88018',
    pipeHighlight: '#f8c048',
    pipeShadow: '#604008',
    hasLava: false
  },
  {
    code: '1-4',
    name: 'Castillo de Lava',
    sky: '#141218',
    skyType: 'castle',
    groundTop: '#505060',
    groundBody: '#282834',
    brickBody: '#383848',
    brickHighlight: '#686880',
    brickShadow: '#181824',
    pipeGreen: '#555566',
    pipeHighlight: '#888899',
    pipeShadow: '#222233',
    hasLava: true // Lava hazards in gaps!
  },
  {
    code: '2-1',
    name: 'Dunas del Desierto',
    sky: '#f8d070',
    skyType: 'desert',
    groundTop: '#e0b040',
    groundBody: '#b88828',
    brickBody: '#d09830',
    brickHighlight: '#f8c050',
    brickShadow: '#785010',
    pipeGreen: '#8a9a20',
    pipeHighlight: '#c0d840',
    pipeShadow: '#405008',
    hasLava: false
  },
  {
    code: '2-2',
    name: 'Fortaleza Celestial',
    sky: '#0a041c',
    skyType: 'cosmic',
    groundTop: '#ffd700',
    groundBody: '#401868',
    brickBody: '#582088',
    brickHighlight: '#8840c8',
    brickShadow: '#200840',
    pipeGreen: '#ffd700',
    pipeHighlight: '#fff8a0',
    pipeShadow: '#997700',
    hasLava: true
  }
];

// --- 4. PLAYER (MARIO / SUPER MARIO) ---
class Player {
  constructor(x, y) {
    this.startX = x;
    this.startY = y;
    this.isSuper = false;
    this.reset();
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.width = 24;
    this.height = this.isSuper ? 38 : 30;
    this.vx = 0;
    this.vy = 0;
    this.isGrounded = false;
    this.facing = 1;
    this.animFrame = 0;
    this.animTimer = 0;
    this.isSkidding = false;
    this.invulnerableTimer = 0;
    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;
  }

  setSuper(isSuper) {
    this.isSuper = isSuper;
    const oldH = this.height;
    this.height = isSuper ? 38 : 30;
    this.y -= (this.height - oldH);
  }

  update(keys, sounds, particles) {
    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer--;
    }

    const accel = 0.40;
    const maxSpeed = 4.2;
    const friction = this.isGrounded ? 0.82 : 0.92;

    const moveLeft = keys.left || keys.keyA;
    const moveRight = keys.right || keys.keyD;

    if (moveLeft) {
      this.vx -= accel;
      if (this.vx < -maxSpeed) this.vx = -maxSpeed;
      this.facing = -1;
    } else if (moveRight) {
      this.vx += accel;
      if (this.vx > maxSpeed) this.vx = maxSpeed;
      this.facing = 1;
    } else {
      this.vx *= friction;
      if (Math.abs(this.vx) < 0.05) this.vx = 0;
    }

    this.isSkidding = (this.isGrounded && ((this.vx > 0.8 && moveLeft) || (this.vx < -0.8 && moveRight)));
    if (this.isSkidding && Math.random() < 0.3) {
      particles.push(new Particle(this.x + this.width / 2, this.y + this.height - 2, (Math.random() - 0.5) * 2, -1 - Math.random(), '#d8d8d8', 4, 15, 0.1));
    }

    if (this.isGrounded) {
      this.coyoteTimer = 6;
    } else if (this.coyoteTimer > 0) {
      this.coyoteTimer--;
    }

    const jumpPressed = keys.jump;
    if (jumpPressed && !this.prevJumpPressed) {
      this.jumpBufferTimer = 6;
    } else if (this.jumpBufferTimer > 0) {
      this.jumpBufferTimer--;
    }
    this.prevJumpPressed = jumpPressed;

    if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
      this.vy = -12.2;
      this.isGrounded = false;
      this.coyoteTimer = 0;
      this.jumpBufferTimer = 0;
      sounds.jump(this.isSuper);

      for (let i = 0; i < 4; i++) {
        particles.push(new Particle(this.x + this.width / 2, this.y + this.height, (Math.random() - 0.5) * 2.5, -0.5 - Math.random(), '#ccc', 3, 14, 0.05));
      }
    }

    if (!jumpPressed && this.vy < -4.0) {
      this.vy *= 0.52;
    }

    this.vy += GRAVITY;
    if (this.vy > MAX_FALL_SPEED) {
      this.vy = MAX_FALL_SPEED;
    }

    if (this.isGrounded && Math.abs(this.vx) > 0.3) {
      this.animTimer += Math.abs(this.vx) * 0.18;
      if (this.animTimer > 1) {
        this.animFrame = (this.animFrame + 1) % 3;
        this.animTimer = 0;
      }
    } else {
      this.animFrame = 0;
      this.animTimer = 0;
    }
  }

  draw(ctx, camX) {
    if (this.invulnerableTimer > 0 && Math.floor(this.invulnerableTimer / 4) % 2 === 0) {
      return;
    }

    const px = Math.round(this.x - camX);
    const py = Math.round(this.y);
    const w = this.width;
    const h = this.height;

    ctx.save();
    ctx.translate(px + w / 2, py + h);
    ctx.scale(this.facing, 1);

    const isSuper = this.isSuper;
    const yOffset = isSuper ? -8 : 0;

    // Feet / Shoes
    ctx.fillStyle = '#543000';
    if (!this.isGrounded) {
      ctx.fillRect(-12, -6, 10, 6);
      ctx.fillRect(2, -8, 10, 6);
    } else if (this.isSkidding) {
      ctx.fillRect(-10, -5, 12, 5);
      ctx.fillRect(0, -5, 10, 5);
    } else if (this.animFrame === 1) {
      ctx.fillRect(-11, -5, 10, 5);
      ctx.fillRect(1, -7, 10, 5);
    } else if (this.animFrame === 2) {
      ctx.fillRect(-9, -7, 10, 5);
      ctx.fillRect(2, -5, 10, 5);
    } else {
      ctx.fillRect(-11, -5, 10, 5);
      ctx.fillRect(1, -5, 10, 5);
    }

    // Blue Overalls
    ctx.fillStyle = '#0038a8';
    const pantsH = isSuper ? 14 : 10;
    ctx.fillRect(-7, -15 + yOffset / 2, 14, pantsH);

    // Yellow Buttons
    ctx.fillStyle = '#fcd116';
    ctx.fillRect(-4, -13 + yOffset / 2, 2, 2);
    ctx.fillRect(2, -13 + yOffset / 2, 2, 2);

    // Red Shirt
    ctx.fillStyle = '#e52521';
    const torsoH = isSuper ? 9 : 6;
    ctx.fillRect(-8, -20 + yOffset, 16, torsoH);

    // Hands
    if (!this.isGrounded) {
      ctx.fillRect(-12, -26 + yOffset, 5, 8);
      ctx.fillRect(7, -18 + yOffset, 5, 6);
    } else {
      ctx.fillRect(-11, -18 + yOffset, 4, 7);
      ctx.fillRect(7, -18 + yOffset, 4, 7);
    }

    // Head / Face
    ctx.fillStyle = '#fcbc98';
    ctx.fillRect(-6, -26 + yOffset, 12, 7);
    ctx.fillRect(3, -25 + yOffset, 4, 3); // Nose

    // Hair / Mustache
    ctx.fillStyle = '#543000';
    ctx.fillRect(-7, -26 + yOffset, 4, 6);
    ctx.fillRect(0, -22 + yOffset, 7, 3);
    ctx.fillRect(2, -26 + yOffset, 2, 2); // Eye

    // Red Cap
    ctx.fillStyle = '#e52521';
    ctx.fillRect(-7, -30 + yOffset, 14, 5);
    ctx.fillRect(1, -28 + yOffset, 8, 3);

    ctx.restore();
  }
}

// --- 5. SUPER MUSHROOM ITEM ---
class Mushroom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 24;
    this.height = 24;
    this.vx = 1.3;
    this.vy = -3;
    this.isSprouting = true;
    this.sproutProgress = 0;
    this.collected = false;
  }

  update(level) {
    if (this.collected) return;

    if (this.isSprouting) {
      this.y -= 1;
      this.sproutProgress++;
      if (this.sproutProgress >= 28) {
        this.isSprouting = false;
      }
      return;
    }

    this.vy += GRAVITY;
    if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;

    this.x += this.vx;
    for (const solid of level.solids) {
      if (this.checkCollision(this, solid)) {
        if (this.vx > 0) {
          this.x = solid.x - this.width;
          this.vx = -this.vx;
        } else {
          this.x = solid.x + solid.width;
          this.vx = -this.vx;
        }
      }
    }

    this.y += this.vy;
    for (const solid of level.solids) {
      if (this.checkCollision(this, solid)) {
        if (this.vy > 0) {
          this.y = solid.y - this.height;
          this.vy = 0;
        }
      }
    }
  }

  checkCollision(r1, r2) {
    return (
      r1.x < r2.x + r2.width &&
      r1.x + r1.width > r2.x &&
      r1.y < r2.y + r2.height &&
      r1.y + r1.height > r2.y
    );
  }

  draw(ctx, camX) {
    if (this.collected) return;
    const px = Math.round(this.x - camX);
    const py = Math.round(this.y);

    ctx.save();
    ctx.fillStyle = '#e52521';
    ctx.beginPath();
    ctx.arc(px + 12, py + 10, 11, Math.PI, 0, false);
    ctx.fill();
    ctx.fillRect(px + 1, py + 9, 22, 5);

    ctx.fillStyle = '#fff';
    ctx.fillRect(px + 10, py + 3, 4, 4);
    ctx.fillRect(px + 3, py + 8, 4, 4);
    ctx.fillRect(px + 17, py + 8, 4, 4);

    ctx.fillStyle = '#fcbc98';
    ctx.fillRect(px + 6, py + 14, 12, 10);
    ctx.fillStyle = '#000';
    ctx.fillRect(px + 8, py + 16, 2, 4);
    ctx.fillRect(px + 14, py + 16, 2, 4);
    ctx.restore();
  }
}

// --- 6. ENEMIES (GOOMBAS & KOOPAS) ---
class Enemy {
  constructor(x, y, type = 'goomba', speed = 1.1) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 26;
    this.height = type === 'goomba' ? 26 : 32;
    this.vx = -speed;
    this.baseSpeed = speed;
    this.vy = 0;
    this.isDead = false;
    this.isShell = false;
    this.shellMoving = false;
    this.deadTimer = 0;
    this.animTimer = 0;
    this.animFrame = 0;
  }

  update(level) {
    if (this.isDead && this.type === 'goomba') {
      this.deadTimer++;
      return;
    }

    if (this.isShell && this.shellMoving) {
      this.vx = this.shellMoving > 0 ? 6.5 : -6.5;
    } else if (this.isShell && !this.shellMoving) {
      this.vx = 0;
    }

    this.vy += GRAVITY;
    if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;

    this.x += this.vx;
    for (const solid of level.solids) {
      if (this.checkCollision(this, solid)) {
        if (this.vx > 0) {
          this.x = solid.x - this.width;
          this.vx = -this.vx;
          if (this.isShell) this.shellMoving = -1;
        } else if (this.vx < 0) {
          this.x = solid.x + solid.width;
          this.vx = -this.vx;
          if (this.isShell) this.shellMoving = 1;
        }
      }
    }

    this.y += this.vy;
    for (const solid of level.solids) {
      if (this.checkCollision(this, solid)) {
        if (this.vy > 0) {
          this.y = solid.y - this.height;
          this.vy = 0;
        }
      }
    }

    this.animTimer += 0.12;
    if (this.animTimer > 1) {
      this.animFrame = (this.animFrame + 1) % 2;
      this.animTimer = 0;
    }
  }

  checkCollision(r1, r2) {
    return (
      r1.x < r2.x + r2.width &&
      r1.x + r1.width > r2.x &&
      r1.y < r2.y + r2.height &&
      r1.y + r1.height > r2.y
    );
  }

  draw(ctx, camX) {
    const px = Math.round(this.x - camX);
    const py = Math.round(this.y);

    if (this.type === 'goomba') {
      if (this.isDead) {
        ctx.fillStyle = '#a04000';
        ctx.fillRect(px, py + 16, this.width, 10);
        ctx.fillStyle = '#fcbc98';
        ctx.fillRect(px + 4, py + 18, 4, 3);
        ctx.fillRect(px + 18, py + 18, 4, 3);
        ctx.fillStyle = '#000';
        ctx.fillRect(px + 6, py + 18, 2, 2);
        ctx.fillRect(px + 18, py + 18, 2, 2);
        return;
      }

      ctx.save();
      ctx.fillStyle = '#000';
      if (this.animFrame === 0) {
        ctx.fillRect(px - 1, py + 20, 8, 6);
        ctx.fillRect(px + 19, py + 22, 8, 4);
      } else {
        ctx.fillRect(px - 1, py + 22, 8, 4);
        ctx.fillRect(px + 19, py + 20, 8, 6);
      }

      ctx.fillStyle = '#fcbc98';
      ctx.fillRect(px + 5, py + 14, 16, 8);

      ctx.fillStyle = '#a04000';
      ctx.beginPath();
      ctx.arc(px + 13, py + 11, 12, Math.PI, 0, false);
      ctx.fill();
      ctx.fillRect(px + 1, py + 10, 24, 6);

      ctx.fillStyle = '#fff';
      ctx.fillRect(px + 5, py + 8, 4, 6);
      ctx.fillRect(px + 17, py + 8, 4, 6);
      ctx.fillStyle = '#000';
      ctx.fillRect(px + 7, py + 9, 2, 4);
      ctx.fillRect(px + 17, py + 9, 2, 4);

      ctx.fillRect(px + 4, py + 6, 6, 2);
      ctx.fillRect(px + 16, py + 6, 6, 2);
      ctx.restore();
    } else {
      ctx.save();
      if (this.isShell) {
        ctx.fillStyle = '#00a800';
        ctx.beginPath();
        ctx.arc(px + 13, py + 16, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillRect(px + 8, py + 12, 10, 8);
      } else {
        ctx.fillStyle = '#fcbc00';
        ctx.fillRect(px + 4, py + 20, 6, 8);
        ctx.fillRect(px + 16, py + 20, 6, 8);

        ctx.fillStyle = '#00a800';
        ctx.beginPath();
        ctx.arc(px + 13, py + 16, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fcbc00';
        ctx.beginPath();
        ctx.arc(px + (this.vx > 0 ? 18 : 6), py + 8, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.fillRect(px + (this.vx > 0 ? 20 : 4), py + 6, 2, 3);
      }
      ctx.restore();
    }
  }
}

// --- 7. BLOCKS, PIPES & COINS ---
class Block {
  constructor(x, y, type = 'brick', item = null) {
    this.x = x;
    this.y = y;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.type = type; // 'brick', 'question', 'empty', 'ground'
    this.item = item;
    this.bumpOffset = 0;
    this.bumpSpeed = 0;
    this.active = true;
  }

  bump(game) {
    if (this.type === 'empty' || this.bumpOffset !== 0) return;

    this.bumpOffset = -8;
    this.bumpSpeed = 2;

    if (this.type === 'question') {
      this.type = 'empty';
      if (this.item === 'mushroom') {
        game.sounds.sprout();
        game.level.mushrooms.push(new Mushroom(this.x + 4, this.y - 10));
      } else {
        game.sounds.coin();
        game.addScore(200);
        game.addCoin();
        game.floatingTexts.push(new FloatingText('+200', this.x + 4, this.y - 12));
        for (let i = 0; i < 5; i++) {
          game.particles.push(new Particle(this.x + 16, this.y - 8, (Math.random() - 0.5) * 3, -3 - Math.random() * 2, '#fcd116', 5, 20, 0.2));
        }
      }
    } else if (this.type === 'brick') {
      if (game.player.isSuper) {
        game.sounds.brickBreak();
        game.addScore(50);
        const col = game.level.theme.brickBody;
        game.particles.push(new Particle(this.x + 8, this.y + 8, -2.5, -5.5, col, 8, 35, 0.3));
        game.particles.push(new Particle(this.x + 24, this.y + 8, 2.5, -5.5, col, 8, 35, 0.3));
        game.particles.push(new Particle(this.x + 8, this.y + 24, -1.8, -3.5, col, 8, 35, 0.3));
        game.particles.push(new Particle(this.x + 24, this.y + 24, 1.8, -3.5, col, 8, 35, 0.3));
        this.active = false;
      } else {
        game.sounds.bump();
      }
    }
  }

  update() {
    if (this.bumpOffset < 0) {
      this.bumpOffset += this.bumpSpeed;
      if (this.bumpOffset >= 0) {
        this.bumpOffset = 0;
        this.bumpSpeed = 0;
      }
    }
  }

  draw(ctx, camX, timer, theme) {
    if (!this.active) return;
    const px = Math.round(this.x - camX);
    const py = Math.round(this.y + this.bumpOffset);

    if (this.type === 'ground') {
      ctx.fillStyle = theme.groundBody;
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = theme.brickShadow;
      ctx.fillRect(px + 2, py + 8, 12, 10);
      ctx.fillRect(px + 16, py + 8, 14, 10);
      ctx.fillRect(px + 8, py + 20, 16, 10);
      ctx.fillStyle = theme.groundTop;
      ctx.fillRect(px, py, TILE_SIZE, 6);
    } else if (this.type === 'brick') {
      ctx.fillStyle = theme.brickBody;
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = theme.brickShadow;
      ctx.fillRect(px, py + 15, TILE_SIZE, 2);
      ctx.fillRect(px + 15, py, 2, 15);
      ctx.fillRect(px + 7, py + 16, 2, 16);
      ctx.fillRect(px + 23, py + 16, 2, 16);
      ctx.fillStyle = theme.brickHighlight;
      ctx.fillRect(px, py, TILE_SIZE, 2);
      ctx.fillRect(px, py, 2, TILE_SIZE);
    } else if (this.type === 'question') {
      ctx.fillStyle = '#fcd116';
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = '#c79200';
      ctx.strokeRect(px + 1.5, py + 1.5, TILE_SIZE - 3, TILE_SIZE - 3);
      ctx.fillRect(px + 2, py + 2, 2, 2);
      ctx.fillRect(px + TILE_SIZE - 4, py + 2, 2, 2);
      ctx.fillRect(px + 2, py + TILE_SIZE - 4, 2, 2);
      ctx.fillRect(px + TILE_SIZE - 4, py + TILE_SIZE - 4, 2, 2);

      ctx.fillStyle = '#000';
      const pulse = Math.sin(timer * 0.1) * 1;
      ctx.fillRect(px + 12, py + 7 + pulse, 8, 4);
      ctx.fillRect(px + 18, py + 11 + pulse, 4, 4);
      ctx.fillRect(px + 14, py + 15 + pulse, 4, 4);
      ctx.fillRect(px + 14, py + 22 + pulse, 4, 4);
    } else if (this.type === 'empty') {
      ctx.fillStyle = '#8b7355';
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = '#5c4832';
      ctx.lineWidth = 2;
      ctx.strokeRect(px + 1, py + 1, TILE_SIZE - 2, TILE_SIZE - 2);
    }
  }
}

class Pipe {
  constructor(x, y, height) {
    this.x = x;
    this.y = y;
    this.width = 56;
    this.height = height;
  }

  draw(ctx, camX, theme) {
    const px = Math.round(this.x - camX);
    const py = Math.round(this.y);

    ctx.fillStyle = theme.pipeGreen;
    ctx.fillRect(px - 4, py, this.width + 8, 20);
    ctx.fillStyle = theme.pipeHighlight;
    ctx.fillRect(px - 2, py + 2, 6, 16);
    ctx.fillStyle = theme.pipeShadow;
    ctx.fillRect(px + this.width, py + 2, 3, 16);

    ctx.fillStyle = theme.pipeGreen;
    ctx.fillRect(px, py + 20, this.width, this.height - 20);
    ctx.fillStyle = theme.pipeHighlight;
    ctx.fillRect(px + 2, py + 20, 6, this.height - 20);
    ctx.fillStyle = theme.pipeShadow;
    ctx.fillRect(px + this.width - 6, py + 20, 4, this.height - 20);
  }
}

class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 20;
    this.collected = false;
    this.timer = Math.random() * 10;
  }

  update() {
    this.timer += 0.12;
  }

  draw(ctx, camX) {
    if (this.collected) return;
    const px = Math.round(this.x - camX);
    const py = Math.round(this.y);
    const scale = Math.abs(Math.sin(this.timer));
    const currentW = Math.max(3, 14 * scale);

    ctx.save();
    ctx.translate(px + 8, py + 10);
    ctx.fillStyle = '#fcd116';
    ctx.fillRect(-currentW / 2, -10, currentW, 20);
    ctx.fillStyle = '#fff';
    ctx.fillRect(-currentW / 4, -8, Math.max(1, currentW / 3), 16);
    ctx.restore();
  }
}

// --- 8. MULTI-WORLD LEVEL BUILDER ---
class Level {
  constructor(levelIndex = 0) {
    this.levelIndex = levelIndex;
    this.theme = WORLD_THEMES[levelIndex % WORLD_THEMES.length];
    this.width = 3600 + levelIndex * 300; // Levels get progressively longer!
    this.floorY = 384;
    this.deathY = 460;
    this.blocks = [];
    this.solids = [];
    this.coins = [];
    this.enemies = [];
    this.mushrooms = [];
    this.pipes = [];
    this.clouds = [];
    this.hills = [];
    this.stars = [];
    this.flagpole = null;
    this.castle = null;

    this.init();
  }

  init() {
    const diff = this.levelIndex; // 0 to 5
    const enemySpeed = 1.0 + diff * 0.18; // Speed increases per level!

    // Background Scenery
    if (this.theme.skyType === 'cosmic') {
      for (let i = 0; i < 90; i++) {
        this.stars.push({ x: Math.random() * this.width, y: Math.random() * 320, size: Math.random() > 0.8 ? 3 : 2 });
      }
    } else {
      for (let x = 60; x < this.width - 200; x += 220 + Math.random() * 150) {
        this.clouds.push({ x, y: 35 + Math.random() * 80, size: 28 + Math.random() * 20 });
      }
      for (let x = 40; x < this.width; x += 380 + Math.random() * 200) {
        this.hills.push({ x, y: this.floorY, radius: 70 + Math.random() * 40 });
      }
    }

    // 1. Ground segments with gaps (difficulty increases: more gaps & narrower platforms)
    const gapFreq = Math.min(4, 1 + Math.floor(diff / 1.5));
    const groundSegments = [];
    let curX = 0;

    // Start safe zone
    groundSegments.push({ start: 0, end: 950 - diff * 40 });
    curX = 950 - diff * 40;

    while (curX < this.width - 700) {
      const gapWidth = 80 + diff * 16;
      curX += gapWidth;
      const segLength = Math.max(300, 750 - diff * 80 + Math.random() * 200);
      groundSegments.push({ start: curX, end: curX + segLength });
      curX += segLength;
    }
    // End zone for castle
    groundSegments.push({ start: this.width - 750, end: this.width });

    groundSegments.forEach(seg => {
      for (let gx = seg.start; gx < seg.end; gx += TILE_SIZE) {
        const bTop = new Block(gx, this.floorY, 'ground');
        this.blocks.push(bTop);
        this.solids.push(bTop);
        for (let gy = this.floorY + TILE_SIZE; gy <= 450; gy += TILE_SIZE) {
          const bSub = new Block(gx, gy, 'ground');
          this.blocks.push(bSub);
          this.solids.push(bSub);
        }
      }
    });

    // 2. Pipes
    const pipeCount = 3 + diff;
    for (let i = 0; i < pipeCount; i++) {
      const px = 400 + i * 550 + Math.random() * 120;
      if (px < this.width - 800) {
        const ph = 64 + (i % 3) * 32;
        const pipe = new Pipe(px, this.floorY - ph, ph);
        this.pipes.push(pipe);
        this.solids.push({ x: pipe.x, y: pipe.y, width: pipe.width, height: pipe.height });
      }
    }

    // 3. Question Blocks & Bricks
    const addBlock = (x, y, type, item = null) => {
      const b = new Block(x, y, type, item);
      this.blocks.push(b);
      this.solids.push(b);
      return b;
    };

    // First zone powerup
    addBlock(240, this.floorY - 110, 'question', 'coin');
    addBlock(320, this.floorY - 110, 'brick');
    addBlock(352, this.floorY - 110, 'question', 'mushroom'); // Super Mushroom!
    addBlock(384, this.floorY - 110, 'brick');

    // High platform rows
    for (let sec = 600; sec < this.width - 900; sec += 600) {
      for (let i = 0; i < 4; i++) {
        addBlock(sec + i * 32, this.floorY - 110, i === 1 ? 'question' : 'brick', i === 1 ? 'coin' : null);
      }
      if (diff >= 2) {
        // High suspended platform over chasms
        addBlock(sec + 160, this.floorY - 160, 'brick');
        addBlock(sec + 192, this.floorY - 160, 'brick');
      }
    }

    // Mid-level Mushroom
    addBlock(1450, this.floorY - 120, 'question', 'mushroom');

    // Pyramid Stairs
    const stairX = this.width - 950;
    const steps = 6 + Math.min(2, diff);
    for (let step = 0; step < steps; step++) {
      for (let h = 0; h <= step; h++) {
        addBlock(stairX + step * 32, this.floorY - (h + 1) * 32, 'brick');
      }
    }

    // 4. Floating Coins
    for (let x = 200; x < this.width - 800; x += 180) {
      this.coins.push(new Coin(x, this.floorY - (Math.random() > 0.5 ? 45 : 120)));
    }

    // 5. Enemies (Goombas & Koopas scale with level difficulty!)
    const enemyCount = 6 + diff * 3;
    for (let i = 0; i < enemyCount; i++) {
      const ex = 450 + i * (2800 / enemyCount) + Math.random() * 80;
      if (ex < this.width - 800) {
        const isKoopa = (i % 3 === 2) || (diff >= 3 && i % 2 === 1);
        this.enemies.push(new Enemy(ex, this.floorY - (isKoopa ? 32 : 26), isKoopa ? 'koopa' : 'goomba', enemySpeed));
      }
    }

    // 6. Goal Flagpole & Castle
    const flagX = this.width - 550;
    this.flagpole = {
      x: flagX,
      y: this.floorY - 280,
      width: 14,
      height: 280,
      flagY: this.floorY - 270,
      ballColor: this.theme.groundTop,
      poleColor: this.theme.pipeHighlight,
      flagColor: '#e52521',
      reached: false
    };

    const castleX = this.width - 360;
    this.castle = {
      x: castleX,
      y: this.floorY - 140,
      width: 150,
      height: 140
    };
  }

  drawBackground(ctx, camX, timer) {
    const theme = this.theme;

    // 1. Sky Rendering based on Theme
    if (theme.skyType === 'sunset') {
      const grad = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      grad.addColorStop(0, '#c83820');
      grad.addColorStop(0.55, '#e87838');
      grad.addColorStop(1, '#f8b858');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    } else if (theme.skyType === 'cosmic') {
      const grad = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      grad.addColorStop(0, '#0a041c');
      grad.addColorStop(0.7, '#200840');
      grad.addColorStop(1, '#481868');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Twinkling Stars & Big Moon
      this.stars.forEach((s, idx) => {
        const sx = s.x - camX * 0.15;
        if (sx > -10 && sx < ctx.canvas.width + 10) {
          ctx.fillStyle = (timer + idx * 7) % 30 < 15 ? '#ffffff' : '#ffd700';
          ctx.fillRect(sx, s.y, s.size, s.size);
        }
      });

      // Giant Moon
      ctx.fillStyle = '#fffae0';
      ctx.beginPath();
      ctx.arc(680 - (camX * 0.05 % 800), 80, 36, 0, Math.PI * 2);
      ctx.fill();
    } else if (theme.skyType === 'desert') {
      const grad = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      grad.addColorStop(0, '#f8d070');
      grad.addColorStop(0.7, '#e8a848');
      grad.addColorStop(1, '#c88028');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Distant Pyramids
      ctx.fillStyle = '#b88028';
      for (let px = -200; px < ctx.canvas.width + 600; px += 400) {
        const dpx = px - (camX * 0.18 % 400);
        ctx.beginPath();
        ctx.moveTo(dpx, this.floorY);
        ctx.lineTo(dpx + 120, this.floorY - 110);
        ctx.lineTo(dpx + 240, this.floorY);
        ctx.fill();
      }
    } else if (theme.skyType === 'castle') {
      ctx.fillStyle = theme.sky;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // Castle wall columns
      ctx.fillStyle = '#22202a';
      for (let cx = -100; cx < ctx.canvas.width + 200; cx += 140) {
        ctx.fillRect(cx - (camX * 0.2 % 140), 60, 40, this.floorY - 60);
      }
    } else if (theme.skyType === 'cavern') {
      ctx.fillStyle = theme.sky;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // Stalactites on ceiling
      ctx.fillStyle = '#003848';
      for (let cx = -40; cx < ctx.canvas.width + 80; cx += 50) {
        const sx = cx - (camX * 0.3 % 50);
        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx + 25, 35 + (cx % 3) * 15);
        ctx.lineTo(sx + 50, 0);
        ctx.fill();
      }
    } else {
      // Overworld classic sky
      ctx.fillStyle = theme.sky;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    // Parallax Clouds & Hills for open-air levels
    if (this.clouds.length > 0) {
      this.clouds.forEach(c => {
        const cx = c.x - camX * 0.4;
        if (cx > -120 && cx < ctx.canvas.width + 120) {
          ctx.fillStyle = theme.skyType === 'sunset' ? '#f8d0b8' : '#ffffff';
          ctx.beginPath();
          ctx.arc(cx, c.y, c.size, 0, Math.PI * 2);
          ctx.arc(cx + c.size * 0.7, c.y - c.size * 0.25, c.size * 0.8, 0, Math.PI * 2);
          ctx.arc(cx - c.size * 0.7, c.y - c.size * 0.1, c.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    if (this.hills.length > 0) {
      this.hills.forEach(h => {
        const hx = h.x - camX * 0.6;
        if (hx > -150 && hx < ctx.canvas.width + 150) {
          ctx.fillStyle = theme.groundTop;
          ctx.beginPath();
          ctx.arc(hx, h.y + 10, h.radius, Math.PI, 0, false);
          ctx.fill();
        }
      });
    }

    // 2. Lava Hazards in Dungeon/Cosmic worlds
    if (theme.hasLava) {
      const lavaY = this.floorY + 22;
      ctx.fillStyle = '#ff2200';
      ctx.fillRect(0, lavaY, ctx.canvas.width, ctx.canvas.height - lavaY);
      ctx.fillStyle = '#ff8800';
      for (let lx = 0; lx < ctx.canvas.width; lx += 32) {
        const wave = Math.sin((timer * 0.08) + lx) * 5;
        ctx.fillRect(lx, lavaY + wave, 24, 6);
      }
    }

    // Flagpole Base Block
    if (this.flagpole) {
      const bx = Math.round(this.flagpole.x - 9 - camX);
      const by = this.floorY - 16;
      ctx.fillStyle = '#8b7355';
      ctx.fillRect(bx, by, 32, 16);
      ctx.strokeStyle = '#3a2d1f';
      ctx.strokeRect(bx, by, 32, 16);
    }
  }

  drawCastle(ctx, camX) {
    if (!this.castle) return;
    const cx = Math.round(this.castle.x - camX);
    const cy = Math.round(this.castle.y);

    ctx.fillStyle = this.theme.brickBody;
    ctx.fillRect(cx, cy + 40, this.castle.width, this.castle.height - 40);
    ctx.fillRect(cx + 20, cy, this.castle.width - 40, 40);
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(cx + 20 + i * 30, cy - 14, 18, 14);
    }

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx + this.castle.width / 2, cy + this.castle.height - 35, 20, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(cx + this.castle.width / 2 - 20, cy + this.castle.height - 35, 40, 35);

    ctx.fillStyle = '#fff';
    ctx.fillRect(cx + this.castle.width / 2 - 2, cy - 35, 4, 25);
    ctx.fillStyle = '#e52521';
    ctx.beginPath();
    ctx.moveTo(cx + this.castle.width / 2 + 2, cy - 35);
    ctx.lineTo(cx + this.castle.width / 2 + 20, cy - 25);
    ctx.lineTo(cx + this.castle.width / 2 + 2, cy - 15);
    ctx.fill();
  }

  drawFlagpole(ctx, camX) {
    if (!this.flagpole) return;
    const px = Math.round(this.flagpole.x - camX);
    const py = Math.round(this.flagpole.y);

    ctx.fillStyle = this.flagpole.poleColor;
    ctx.fillRect(px, py, this.flagpole.width, this.flagpole.height);

    ctx.fillStyle = '#fcd116';
    ctx.beginPath();
    ctx.arc(px + this.flagpole.width / 2, py - 4, 8, 0, Math.PI * 2);
    ctx.fill();

    const fy = Math.round(this.flagpole.flagY);
    ctx.fillStyle = this.flagpole.flagColor;
    ctx.beginPath();
    ctx.moveTo(px, fy);
    ctx.lineTo(px - 32, fy + 16);
    ctx.lineTo(px, fy + 32);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(px - 14, fy + 16, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- 9. MAIN GAME ENGINE ---
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.sounds = new SoundSystem();

    this.state = 'START'; // 'START', 'TRANSITION', 'PLAYING', 'PAUSED', 'DYING', 'FLAG_SLIDE', 'VICTORY', 'GAMEOVER'
    this.currentLevelIndex = 0; // 0 to 5
    this.score = 0;
    this.coins = 0;
    this.lives = 3;
    this.timeLeft = 300;
    this.timeCounter = 0;
    this.highScore = parseInt(localStorage.getItem('mario_highscore') || '0', 10);

    this.camX = 0;
    this.level = new Level(this.currentLevelIndex);
    this.player = new Player(80, this.level.floorY - 40);
    this.particles = [];
    this.floatingTexts = [];
    this.globalTimer = 0;

    this.transitionTimer = 0;
    this.victoryTimer = 0;
    this.fireworkTimer = 0;
    this.deathTimer = 0;

    this.keys = {
      left: false,
      right: false,
      jump: false,
      keyA: false,
      keyD: false
    };

    this.bindInputs();
    this.bindButtons();
    this.updateHUDHeader();

    requestAnimationFrame(this.loop.bind(this));
  }

  updateHUDHeader() {
    const badge = document.getElementById('levelBadge');
    const infoTag = document.getElementById('worldInfoTag');
    const theme = WORLD_THEMES[this.currentLevelIndex];
    if (badge) badge.textContent = `MUNDO ${theme.code}`;
    if (infoTag) infoTag.textContent = `MUNDO ${theme.code} • ${theme.name.toUpperCase()}`;
  }

  bindInputs() {
    window.addEventListener('keydown', e => {
      this.sounds.init();

      if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.keys.left = true;
      if (e.code === 'ArrowRight' || e.key === 'ArrowRight') this.keys.right = true;
      if (e.code === 'KeyA' || e.key === 'a' || e.key === 'A') this.keys.keyA = true;
      if (e.code === 'KeyD' || e.key === 'd' || e.key === 'D') this.keys.keyD = true;

      if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space' || e.key === ' ') {
        this.keys.jump = true;
        e.preventDefault();
      }

      if (e.code === 'Enter' || e.code === 'Space') {
        if (this.state === 'START') this.startGame();
        else if (this.state === 'GAMEOVER') this.restartGame();
        else if (this.state === 'VICTORY' && this.currentLevelIndex === 5) this.restartCampaign();
      }

      if (e.code === 'KeyP' || e.code === 'Escape') {
        if (this.state === 'PLAYING') this.state = 'PAUSED';
        else if (this.state === 'PAUSED') this.state = 'PLAYING';
      }

      if (e.code === 'KeyM') this.toggleSound();
      if (e.code === 'KeyR') this.resetCurrentLevel();
    });

    window.addEventListener('keyup', e => {
      if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.keys.left = false;
      if (e.code === 'ArrowRight' || e.key === 'ArrowRight') this.keys.right = false;
      if (e.code === 'KeyA' || e.key === 'a' || e.key === 'A') this.keys.keyA = false;
      if (e.code === 'KeyD' || e.key === 'd' || e.key === 'D') this.keys.keyD = false;
      if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space' || e.key === ' ') {
        this.keys.jump = false;
      }
    });

    this.canvas.addEventListener('click', () => {
      this.sounds.init();
      if (this.state === 'START') this.startGame();
      else if (this.state === 'GAMEOVER') this.restartGame();
      else if (this.state === 'VICTORY' && this.currentLevelIndex === 5) this.restartCampaign();
    });
  }

  bindButtons() {
    const soundBtn = document.getElementById('soundBtn');
    const resetBtn = document.getElementById('resetBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.sounds.init();
        this.toggleSound();
      });
    }

    if (resetBtn) resetBtn.addEventListener('click', () => this.resetCurrentLevel());

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        const cabinet = document.getElementById('cabinet');
        if (!document.fullscreenElement) {
          cabinet.requestFullscreen?.() || cabinet.webkitRequestFullscreen?.();
        } else {
          document.exitFullscreen?.() || document.webkitExitFullscreen?.();
        }
      });
    }

    const touchLeft = document.getElementById('touchLeft');
    const touchRight = document.getElementById('touchRight');
    const touchJump = document.getElementById('touchJump');

    const setupBtn = (btn, onDown, onUp) => {
      if (!btn) return;
      btn.addEventListener('touchstart', e => { e.preventDefault(); this.sounds.init(); btn.classList.add('pressed'); onDown(); }, { passive: false });
      btn.addEventListener('touchend', e => { e.preventDefault(); btn.classList.remove('pressed'); onUp(); }, { passive: false });
    };

    setupBtn(touchLeft, () => { this.keys.left = true; }, () => { this.keys.left = false; });
    setupBtn(touchRight, () => { this.keys.right = true; }, () => { this.keys.right = false; });
    setupBtn(touchJump, () => {
      this.keys.jump = true;
      if (this.state === 'START' || this.state === 'GAMEOVER') this.startGame();
      else if (this.state === 'VICTORY' && this.currentLevelIndex === 5) this.restartCampaign();
    }, () => {
      this.keys.jump = false;
    });
  }

  toggleSound() {
    const isMuted = this.sounds.toggleMute();
    const soundIcon = document.getElementById('soundIcon');
    const soundText = document.getElementById('soundText');
    if (soundIcon) soundIcon.textContent = isMuted ? '🔇' : '🔊';
    if (soundText) soundText.textContent = isMuted ? 'SILENCIO' : 'AUDIO';
  }

  addScore(pts) {
    this.score += pts;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('mario_highscore', this.highScore.toString());
    }
  }

  addCoin() {
    this.coins++;
    if (this.coins >= 100) {
      this.coins = 0;
      this.lives++;
      this.floatingTexts.push(new FloatingText('1-UP!', this.player.x, this.player.y - 20, '#5cfc5c'));
      this.sounds.coin();
    }
  }

  startGame() {
    this.state = 'TRANSITION';
    this.transitionTimer = 90; // 1.5 seconds world title screen
    this.timeLeft = 300;
    this.updateHUDHeader();
  }

  loadLevel(levelIndex) {
    this.currentLevelIndex = levelIndex;
    this.level = new Level(this.currentLevelIndex);
    this.player.x = 80;
    this.player.y = this.level.floorY - 40;
    this.player.vx = 0;
    this.player.vy = 0;
    this.camX = 0;
    this.particles = [];
    this.floatingTexts = [];
    this.timeLeft = 300;
    this.updateHUDHeader();
  }

  resetCurrentLevel() {
    this.loadLevel(this.currentLevelIndex);
    this.state = 'PLAYING';
  }

  restartGame() {
    this.score = 0;
    this.coins = 0;
    this.lives = 3;
    this.player.setSuper(false);
    this.loadLevel(this.currentLevelIndex);
    this.state = 'PLAYING';
  }

  restartCampaign() {
    this.score = 0;
    this.coins = 0;
    this.lives = 3;
    this.player.setSuper(false);
    this.currentLevelIndex = 0;
    this.loadLevel(0);
    this.startGame();
  }

  handlePlayerDamage() {
    if (this.player.isSuper) {
      this.player.setSuper(false);
      this.player.invulnerableTimer = 120;
      this.sounds.bump();
      this.floatingTexts.push(new FloatingText('SHRINK!', this.player.x, this.player.y - 10, '#ffffff'));
    } else {
      this.lives--;
      if (this.lives <= 0) {
        this.sounds.gameover();
        this.state = 'GAMEOVER';
      } else {
        this.sounds.die();
        this.state = 'DYING';
        this.deathTimer = 0;
        this.player.vy = -9.5;
      }
    }
  }

  updatePhysics() {
    const p = this.player;
    p.update(this.keys, this.sounds, this.particles);

    // 1. Horizontal Movement & Solid Collisions
    p.x += p.vx;
    for (const solid of this.level.solids) {
      if (solid.active === false) continue;
      if (this.checkCollision(p, solid)) {
        if (p.vx > 0) {
          p.x = solid.x - p.width;
          p.vx = 0;
        } else if (p.vx < 0) {
          p.x = solid.x + solid.width;
          p.vx = 0;
        }
      }
    }

    if (p.x < 0) {
      p.x = 0;
      p.vx = 0;
    }

    // 2. Vertical Movement & Solid Collisions
    p.y += p.vy;
    p.isGrounded = false;

    for (const solid of this.level.solids) {
      if (solid.active === false) continue;
      if (this.checkCollision(p, solid)) {
        if (p.vy > 0) {
          p.y = solid.y - p.height;
          p.vy = 0;
          p.isGrounded = true;
        } else if (p.vy < 0) {
          p.y = solid.y + solid.height;
          p.vy = 0;
          if (solid instanceof Block) {
            solid.bump(this);
          } else {
            this.sounds.bump();
          }
        }
      }
    }

    // 3. Fall into void / Lava death
    if (p.y > this.level.deathY) {
      this.player.setSuper(false);
      this.lives--;
      if (this.lives <= 0) {
        this.sounds.gameover();
        this.state = 'GAMEOVER';
      } else {
        this.sounds.die();
        this.state = 'DYING';
        this.deathTimer = 0;
        this.player.vy = -9.5;
      }
      return;
    }

    // 4. Coin Pickups
    for (const coin of this.level.coins) {
      if (!coin.collected && this.checkCollision(p, coin)) {
        coin.collected = true;
        this.sounds.coin();
        this.addScore(100);
        this.addCoin();
        this.floatingTexts.push(new FloatingText('+100', coin.x, coin.y - 10));
        for (let i = 0; i < 4; i++) {
          this.particles.push(new Particle(coin.x + 8, coin.y + 10, (Math.random() - 0.5) * 3, -1.5 - Math.random() * 2, '#fcd116', 4, 18, 0.1));
        }
      }
    }

    // 5. Mushroom Pickups
    for (const m of this.level.mushrooms) {
      if (!m.collected && !m.isSprouting && this.checkCollision(p, m)) {
        m.collected = true;
        this.sounds.powerup();
        this.player.setSuper(true);
        this.addScore(1000);
        this.floatingTexts.push(new FloatingText('+1000 SUPER!', m.x - 10, m.y - 15, '#5cfc5c'));
        for (let i = 0; i < 12; i++) {
          this.particles.push(new Particle(m.x + 12, m.y + 12, (Math.random() - 0.5) * 4, -2 - Math.random() * 3, '#e52521', 4, 25, 0.1));
        }
      }
    }

    // 6. Enemy Interactions
    for (const enemy of this.level.enemies) {
      if (enemy.isDead && enemy.type === 'goomba') continue;

      if (this.checkCollision(p, enemy)) {
        const marioBottom = p.y + p.height;
        const enemyTop = enemy.y;

        if (p.vy > 0 && marioBottom - p.vy <= enemyTop + 14) {
          if (enemy.type === 'goomba') {
            enemy.isDead = true;
            this.sounds.stomp();
            this.addScore(200);
            this.floatingTexts.push(new FloatingText('+200', enemy.x, enemy.y - 10));
            p.vy = this.keys.jump ? -11.0 : -7.5;
            for (let i = 0; i < 6; i++) {
              this.particles.push(new Particle(enemy.x + 13, enemy.y + 10, (Math.random() - 0.5) * 4, -1 - Math.random() * 2, '#fff', 4, 15, 0.15));
            }
          } else if (enemy.type === 'koopa') {
            if (!enemy.isShell) {
              enemy.isShell = true;
              enemy.shellMoving = false;
              this.sounds.stomp();
              this.addScore(100);
              p.vy = this.keys.jump ? -11.0 : -7.5;
            } else if (!enemy.shellMoving) {
              enemy.shellMoving = p.x < enemy.x ? 1 : -1;
              this.sounds.kickShell();
              this.addScore(400);
              p.vy = -6;
            } else {
              enemy.shellMoving = false;
              this.sounds.stomp();
              p.vy = -7.5;
            }
          }
        } else if (enemy.type === 'koopa' && enemy.isShell && !enemy.shellMoving) {
          enemy.shellMoving = p.x < enemy.x ? 1 : -1;
          this.sounds.kickShell();
          this.addScore(400);
        } else if (p.invulnerableTimer === 0) {
          this.handlePlayerDamage();
          return;
        }
      }
    }

    // 7. Moving Shell Collisions with Enemies
    for (const shell of this.level.enemies) {
      if (shell.type === 'koopa' && shell.isShell && shell.shellMoving) {
        for (const other of this.level.enemies) {
          if (other !== shell && !other.isDead && this.checkCollision(shell, other)) {
            other.isDead = true;
            this.sounds.kickShell();
            this.addScore(500);
            this.floatingTexts.push(new FloatingText('+500', other.x, other.y - 12));
          }
        }
      }
    }

    // 8. Flagpole Check (Goal Reached)
    const fp = this.level.flagpole;
    if (fp && !fp.reached && p.x + p.width >= fp.x && p.x <= fp.x + fp.width + 10 && p.y <= this.level.floorY) {
      fp.reached = true;
      this.state = 'FLAG_SLIDE';
      this.sounds.flagSlide();
      const heightFrac = Math.max(0, Math.min(1, (this.level.floorY - p.y) / fp.height));
      const bonusPts = Math.round(heightFrac * 4000 + 400);
      this.addScore(bonusPts);
      this.floatingTexts.push(new FloatingText(`+${bonusPts}`, fp.x - 10, p.y));
    }
  }

  checkCollision(r1, r2) {
    return (
      r1.x < r2.x + r2.width &&
      r1.x + r1.width > r2.x &&
      r1.y < r2.y + r2.height &&
      r1.y + r1.height > r2.y
    );
  }

  updateCamera() {
    const targetCamX = this.player.x - 220;
    if (targetCamX > this.camX) {
      this.camX += (targetCamX - this.camX) * 0.1;
    }
    const maxCamX = this.level.width - this.canvas.width;
    if (this.camX < 0) this.camX = 0;
    if (this.camX > maxCamX) this.camX = maxCamX;
  }

  update() {
    this.globalTimer++;

    if (this.state === 'TRANSITION') {
      this.transitionTimer--;
      if (this.transitionTimer <= 0) {
        this.state = 'PLAYING';
      }
    } else if (this.state === 'PLAYING') {
      this.timeCounter++;
      if (this.timeCounter >= 60) {
        this.timeLeft--;
        this.timeCounter = 0;
        if (this.timeLeft <= 0) {
          this.handlePlayerDamage();
          return;
        }
      }

      this.updatePhysics();

      this.level.blocks.forEach(b => b.update());
      this.level.enemies.forEach(e => e.update(this.level));
      this.level.coins.forEach(c => c.update());
      this.level.mushrooms.forEach(m => m.update(this.level));

      this.updateCamera();
    } else if (this.state === 'DYING') {
      this.deathTimer++;
      if (this.deathTimer > 20) {
        this.player.y += this.player.vy;
        this.player.vy += GRAVITY;
      }
      if (this.deathTimer > 90) {
        this.player.reset();
        this.player.invulnerableTimer = 90;
        this.camX = Math.max(0, this.player.x - 200);
        this.state = 'PLAYING';
      }
    } else if (this.state === 'FLAG_SLIDE') {
      const fp = this.level.flagpole;
      if (fp.flagY < this.level.floorY - 40) {
        fp.flagY += 4.5;
      }
      if (this.player.y < this.level.floorY - this.player.height) {
        this.player.y += 3.5;
      } else {
        this.player.facing = 1;
        this.player.x += 1.8;
        this.player.animTimer += 0.2;
        if (this.player.animTimer > 1) {
          this.player.animFrame = (this.player.animFrame + 1) % 3;
          this.player.animTimer = 0;
        }
        if (this.player.x >= this.level.castle.x + this.level.castle.width / 2 - 10) {
          this.state = 'VICTORY';
          this.sounds.victory();
          this.victoryTimer = 0;
        }
      }
      this.updateCamera();
    } else if (this.state === 'VICTORY') {
      this.victoryTimer++;
      // Time bonus countdown
      if (this.timeLeft > 0 && this.victoryTimer % 2 === 0) {
        this.timeLeft--;
        this.addScore(50);
        this.sounds.coin();
      }

      // Fireworks
      this.fireworkTimer++;
      if (this.fireworkTimer > 28) {
        this.fireworkTimer = 0;
        const fx = this.level.castle.x + Math.random() * this.level.castle.width;
        const fy = this.level.castle.y - 40 - Math.random() * 60;
        const colors = ['#fcd116', '#e52521', '#5cfc5c', '#ffffff', '#5c94fc', '#ffd700'];
        const chosenCol = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = 1.5 + Math.random() * 3.5;
          this.particles.push(new Particle(fx, fy, Math.cos(angle) * spd, Math.sin(angle) * spd, chosenCol, 4, 30, 0.08));
        }
      }

      // Automatically advance to next level after fireworks (if not final world)
      if (this.currentLevelIndex < 5 && this.victoryTimer > 220) {
        this.loadLevel(this.currentLevelIndex + 1);
        this.startGame();
      }
    }

    this.particles = this.particles.filter(p => { p.update(); return p.life > 0; });
    this.floatingTexts = this.floatingTexts.filter(ft => { ft.update(); return ft.life > 0; });
  }

  // --- RENDERING ---
  drawHUD() {
    const ctx = this.ctx;
    ctx.save();
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillStyle = '#fff';

    ctx.fillText('MARIO', 30, 22);
    ctx.fillText(this.score.toString().padStart(6, '0'), 30, 36);

    ctx.fillStyle = '#fcd116';
    ctx.fillText('●', 210, 29);
    ctx.fillStyle = '#fff';
    ctx.fillText(`x${this.coins.toString().padStart(2, '0')}`, 226, 29);

    ctx.fillText('MUNDO', 360, 22);
    ctx.fillText(this.level.theme.code, 374, 36);

    ctx.fillText('TIEMPO', 510, 22);
    ctx.fillText(Math.max(0, this.timeLeft).toString().padStart(3, '0'), 526, 36);

    ctx.fillStyle = '#e52521';
    ctx.fillText('♥', 680, 29);
    ctx.fillStyle = '#fff';
    ctx.fillText(`x${this.lives}`, 698, 29);

    ctx.restore();
  }

  drawOverlay(title, subtitle, extra = '') {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.textAlign = 'center';
    ctx.font = '22px "Press Start 2P", monospace';
    ctx.fillStyle = '#fcd116';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 8;
    ctx.fillText(title, this.canvas.width / 2, this.canvas.height / 2 - 30);

    ctx.font = '11px "Press Start 2P", monospace';
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 4;
    ctx.fillText(subtitle, this.canvas.width / 2, this.canvas.height / 2 + 15);

    if (extra) {
      ctx.font = '9px "Press Start 2P", monospace';
      ctx.fillStyle = '#9aa5b8';
      ctx.fillText(extra, this.canvas.width / 2, this.canvas.height / 2 + 50);
    }
    ctx.restore();
  }

  drawTransitionScreen() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.textAlign = 'center';
    ctx.font = '16px "Press Start 2P", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`MUNDO ${this.level.theme.code}`, this.canvas.width / 2, this.canvas.height / 2 - 40);

    ctx.font = '11px "Press Start 2P", monospace';
    ctx.fillStyle = '#fcd116';
    ctx.fillText(this.level.theme.name.toUpperCase(), this.canvas.width / 2, this.canvas.height / 2 - 15);

    // Mario icon & lives
    ctx.fillStyle = '#e52521';
    ctx.fillText('♥', this.canvas.width / 2 - 25, this.canvas.height / 2 + 25);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`x  ${this.lives}`, this.canvas.width / 2 + 15, this.canvas.height / 2 + 25);

    ctx.restore();
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state === 'TRANSITION') {
      this.drawTransitionScreen();
      return;
    }

    // 1. Theme-Specific Background
    this.level.drawBackground(ctx, this.camX, this.globalTimer);

    // 2. Blocks & Pipes
    this.level.blocks.forEach(b => b.draw(ctx, this.camX, this.globalTimer, this.level.theme));
    this.level.pipes.forEach(p => p.draw(ctx, this.camX, this.level.theme));

    // 3. Items & Coins
    this.level.coins.forEach(c => c.draw(ctx, this.camX));
    this.level.mushrooms.forEach(m => m.draw(ctx, this.camX));

    // 4. Flagpole & Castle
    this.level.drawFlagpole(ctx, this.camX);
    this.level.drawCastle(ctx, this.camX);

    // 5. Enemies
    this.level.enemies.forEach(e => e.draw(ctx, this.camX));

    // 6. Player
    if (this.state !== 'VICTORY' || this.player.x < this.level.castle.x + this.level.castle.width / 2) {
      this.player.draw(ctx, this.camX);
    }

    // 7. Particles & Floating Texts
    this.particles.forEach(p => p.draw(ctx, this.camX));
    this.floatingTexts.forEach(ft => ft.draw(ctx, this.camX));

    // 8. HUD
    this.drawHUD();

    // 9. Overlays
    if (this.state === 'START') {
      const pulse = Math.floor(this.globalTimer / 30) % 2 === 0;
      this.drawOverlay(
        'SUPER MARIO BROS',
        pulse ? 'PRESIONA ENTER O ESPACIO' : '★ 6 MUNDOS COMPLETOS ★',
        `RÉCORD: ${this.highScore}  •  FLECHAS O A/D Y ESPACIO`
      );
    } else if (this.state === 'PAUSED') {
      this.drawOverlay('JUEGO EN PAUSA', 'PRESIONA P O ESCAPE PARA CONTINUAR');
    } else if (this.state === 'GAMEOVER') {
      this.drawOverlay(
        '¡GAME OVER!',
        'PRESIONA ENTER O CLIC PARA REINTENTAR ESTE MUNDO',
        `PUNTUACIÓN FINAL: ${this.score}  •  RÉCORD: ${this.highScore}`
      );
    } else if (this.state === 'VICTORY') {
      const isFinalWorld = this.currentLevelIndex === 5;
      if (isFinalWorld) {
        this.drawOverlay(
          '¡CAMPEÓN SUPREMO!',
          '¡HAS COMPLETADO LOS 6 MUNDOS!',
          `PUNTUACIÓN TOTAL: ${this.score}  •  ENTER PARA REJUGAR LA CAMPAÑA`
        );
      } else {
        this.drawOverlay(
          `¡${this.level.theme.code} COMPLETADO!`,
          `SIGUIENTE: MUNDO ${WORLD_THEMES[this.currentLevelIndex + 1].code}`,
          `PUNTUACIÓN: ${this.score}  •  AVANZANDO...`
        );
      }
    }
  }

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  new Game();
});
