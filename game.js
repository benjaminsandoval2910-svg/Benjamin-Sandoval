/**
 * ============================================================================
 * SUPER MARIO BROS - WORLD 1-1 ENGINE
 * Pure Vanilla JavaScript (ES6+), Canvas 2D, Web Audio API Synthesis
 * Complete 2D platformer with tuned high jumps, Super Mushroom power-ups,
 * Goombas, Koopa Troopas with kickable shells, breakable bricks, question blocks,
 * coins, warp pipes, flagpole slide, and finish castle with fireworks.
 * ============================================================================
 */

// --- 1. WEB AUDIO SYNTHESIZER (8-BIT RETRO SOUND FX) ---
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

  // Classic Mario Jump (Frequency sweep)
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

  // Coin Chime (B5 988Hz -> E6 1319Hz)
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

  // Stomp Goomba / Koopa
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

  // Kick Koopa Shell
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

  // Block Bump
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

  // Brick Shatter
  brickBreak() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
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

  // Mushroom Sprout sound
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

  // Super Mushroom Power-up Fanfare!
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

  // Flagpole Slide Whistle
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

  // Victory Stage Clear Fanfare
  victory() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const melody = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.12 }, // E5
        { f: 783.99, d: 0.12 }, // G5
        { f: 1046.5, d: 0.28 }, // C6
        { f: 880.00, d: 0.15 }, // A5
        { f: 1046.5, d: 0.40 }  // C6
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

  // Death Jingle
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

  // Game Over Jingle
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

// --- 3. GAME CONSTANTS & COLOR PALETTES ---
const TILE_SIZE = 32;
const GRAVITY = 0.49; // Tuned for higher, floatier, classic jump arc
const MAX_FALL_SPEED = 11;

const COLORS = {
  sky: '#5c94fc',
  groundTop: '#00a800',
  groundBody: '#b84418',
  groundBrick: '#8b2500',
  brickBody: '#b84418',
  brickHighlight: '#e07438',
  brickShadow: '#541200',
  questionGold: '#fcd116',
  questionDark: '#c79200',
  questionEmpty: '#8b7355',
  pipeGreen: '#00a800',
  pipeHighlight: '#5cfc5c',
  pipeShadow: '#005800',
  marioRed: '#e52521',
  marioBlue: '#0038a8',
  marioSkin: '#fcbc98',
  marioHair: '#543000',
  goombaBrown: '#a04000',
  goombaTan: '#fcbc98',
  koopaGreen: '#00a800',
  koopaYellow: '#fcbc00',
  shroomRed: '#e52521',
  shroomWhite: '#ffffff',
  cloudWhite: '#ffffff',
  hillGreen: '#00a800',
  hillDark: '#007000'
};

// --- 4. PLAYER (MARIO / SUPER MARIO) ---
class Player {
  constructor(x, y) {
    this.startX = x;
    this.startY = y;
    this.isSuper = false; // Normal vs Super Mario
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
    this.facing = 1; // 1: right, -1: left
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
    this.y -= (this.height - oldH); // Keep feet planted on ground
  }

  update(keys, sounds, particles) {
    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer--;
    }

    // Horizontal Movement
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

    // Skid detection
    this.isSkidding = (this.isGrounded && ((this.vx > 0.8 && moveLeft) || (this.vx < -0.8 && moveRight)));
    if (this.isSkidding && Math.random() < 0.3) {
      particles.push(new Particle(this.x + this.width / 2, this.y + this.height - 2, (Math.random() - 0.5) * 2, -1 - Math.random(), '#d8d8d8', 4, 15, 0.1));
    }

    // Coyote time & Jump buffer
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

    // Jump Execution (Tuned for satisfying higher jump)
    if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
      this.vy = -12.2;
      this.isGrounded = false;
      this.coyoteTimer = 0;
      this.jumpBufferTimer = 0;
      sounds.jump(this.isSuper);

      // Dust puffs
      for (let i = 0; i < 4; i++) {
        particles.push(new Particle(this.x + this.width / 2, this.y + this.height, (Math.random() - 0.5) * 2.5, -0.5 - Math.random(), '#ccc', 3, 14, 0.05));
      }
    }

    // Variable jump height
    if (!jumpPressed && this.vy < -4.0) {
      this.vy *= 0.52;
    }

    // Apply Gravity
    this.vy += GRAVITY;
    if (this.vy > MAX_FALL_SPEED) {
      this.vy = MAX_FALL_SPEED;
    }

    // Animation cycle
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
      return; // Flicker
    }

    const px = Math.round(this.x - camX);
    const py = Math.round(this.y);
    const w = this.width;
    const h = this.height;

    ctx.save();
    ctx.translate(px + w / 2, py + h);
    ctx.scale(this.facing, 1);

    // Procedural 8-bit Mario Sprite
    const isSuper = this.isSuper;
    const yOffset = isSuper ? -8 : 0;

    // Feet / Shoes
    ctx.fillStyle = COLORS.marioHair;
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

    // Blue Overalls / Pants
    ctx.fillStyle = COLORS.marioBlue;
    const pantsH = isSuper ? 14 : 10;
    ctx.fillRect(-7, -15 + yOffset / 2, 14, pantsH);

    // Yellow Buttons
    ctx.fillStyle = COLORS.questionGold;
    ctx.fillRect(-4, -13 + yOffset / 2, 2, 2);
    ctx.fillRect(2, -13 + yOffset / 2, 2, 2);

    // Red Shirt / Torso
    ctx.fillStyle = COLORS.marioRed;
    const torsoH = isSuper ? 9 : 6;
    ctx.fillRect(-8, -20 + yOffset, 16, torsoH);

    // Hands / Arms
    if (!this.isGrounded) {
      ctx.fillRect(-12, -26 + yOffset, 5, 8);
      ctx.fillRect(7, -18 + yOffset, 5, 6);
    } else {
      ctx.fillRect(-11, -18 + yOffset, 4, 7);
      ctx.fillRect(7, -18 + yOffset, 4, 7);
    }

    // Head / Face (Flesh)
    ctx.fillStyle = COLORS.marioSkin;
    ctx.fillRect(-6, -26 + yOffset, 12, 7);
    // Nose
    ctx.fillRect(3, -25 + yOffset, 4, 3);

    // Hair / Mustache (Dark Brown)
    ctx.fillStyle = COLORS.marioHair;
    ctx.fillRect(-7, -26 + yOffset, 4, 6);
    ctx.fillRect(0, -22 + yOffset, 7, 3); // Mustache
    // Eye
    ctx.fillRect(2, -26 + yOffset, 2, 2);

    // Red Cap with Visor
    ctx.fillStyle = COLORS.marioRed;
    ctx.fillRect(-7, -30 + yOffset, 14, 5);
    ctx.fillRect(1, -28 + yOffset, 8, 3);

    ctx.restore();
  }
}

// --- 5. SUPER MUSHROOM POWER-UP ---
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
    // Mushroom Cap
    ctx.fillStyle = COLORS.shroomRed;
    ctx.beginPath();
    ctx.arc(px + 12, py + 10, 11, Math.PI, 0, false);
    ctx.fill();
    ctx.fillRect(px + 1, py + 9, 22, 5);

    // White Dots on Cap
    ctx.fillStyle = '#fff';
    ctx.fillRect(px + 10, py + 3, 4, 4);
    ctx.fillRect(px + 3, py + 8, 4, 4);
    ctx.fillRect(px + 17, py + 8, 4, 4);

    // Stem (Flesh)
    ctx.fillStyle = COLORS.marioSkin;
    ctx.fillRect(px + 6, py + 14, 12, 10);
    // Eyes on stem
    ctx.fillStyle = '#000';
    ctx.fillRect(px + 8, py + 16, 2, 4);
    ctx.fillRect(px + 14, py + 16, 2, 4);

    ctx.restore();
  }
}

// --- 6. ENEMIES: GOOMBA & KOOPA TROOPA ---
class Enemy {
  constructor(x, y, type = 'goomba') {
    this.x = x;
    this.y = y;
    this.type = type; // 'goomba' or 'koopa'
    this.width = type === 'goomba' ? 26 : 26;
    this.height = type === 'goomba' ? 26 : 32;
    this.vx = -1.1;
    this.vy = 0;
    this.isDead = false;
    this.isShell = false; // For Koopa Troopa shell state
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

    // Shell moving at high speed
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

    // Animation
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
        // Squashed Goomba
        ctx.fillStyle = COLORS.goombaBrown;
        ctx.fillRect(px, py + 16, this.width, 10);
        ctx.fillStyle = COLORS.goombaTan;
        ctx.fillRect(px + 4, py + 18, 4, 3);
        ctx.fillRect(px + 18, py + 18, 4, 3);
        ctx.fillStyle = '#000';
        ctx.fillRect(px + 6, py + 18, 2, 2);
        ctx.fillRect(px + 18, py + 18, 2, 2);
        return;
      }

      ctx.save();
      // Feet
      ctx.fillStyle = '#000';
      if (this.animFrame === 0) {
        ctx.fillRect(px - 1, py + 20, 8, 6);
        ctx.fillRect(px + 19, py + 22, 8, 4);
      } else {
        ctx.fillRect(px - 1, py + 22, 8, 4);
        ctx.fillRect(px + 19, py + 20, 8, 6);
      }

      // Stem (Tan)
      ctx.fillStyle = COLORS.goombaTan;
      ctx.fillRect(px + 5, py + 14, 16, 8);

      // Mushroom Dome (Brown)
      ctx.fillStyle = COLORS.goombaBrown;
      ctx.beginPath();
      ctx.arc(px + 13, py + 11, 12, Math.PI, 0, false);
      ctx.fill();
      ctx.fillRect(px + 1, py + 10, 24, 6);

      // Angry Eyes
      ctx.fillStyle = '#fff';
      ctx.fillRect(px + 5, py + 8, 4, 6);
      ctx.fillRect(px + 17, py + 8, 4, 6);
      ctx.fillStyle = '#000';
      ctx.fillRect(px + 7, py + 9, 2, 4);
      ctx.fillRect(px + 17, py + 9, 2, 4);

      // Eyebrows
      ctx.fillRect(px + 4, py + 6, 6, 2);
      ctx.fillRect(px + 16, py + 6, 6, 2);
      ctx.restore();
    } else {
      // Koopa Troopa
      ctx.save();
      if (this.isShell) {
        // Green Shell Form
        ctx.fillStyle = COLORS.koopaGreen;
        ctx.beginPath();
        ctx.arc(px + 13, py + 16, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillRect(px + 8, py + 12, 10, 8);
      } else {
        // Walking Koopa
        ctx.fillStyle = COLORS.koopaYellow;
        ctx.fillRect(px + 4, py + 20, 6, 8);
        ctx.fillRect(px + 16, py + 20, 6, 8);

        // Green Shell
        ctx.fillStyle = COLORS.koopaGreen;
        ctx.beginPath();
        ctx.arc(px + 13, py + 16, 11, 0, Math.PI * 2);
        ctx.fill();

        // Yellow Head & Beak
        ctx.fillStyle = COLORS.koopaYellow;
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

// --- 7. BLOCKS & PIPES ---
class Block {
  constructor(x, y, type = 'brick', item = null) {
    this.x = x;
    this.y = y;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.type = type; // 'brick', 'question', 'empty', 'ground'
    this.item = item; // 'coin', 'mushroom'
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
          game.particles.push(new Particle(this.x + 16, this.y - 8, (Math.random() - 0.5) * 3, -3 - Math.random() * 2, COLORS.questionGold, 5, 20, 0.2));
        }
      }
    } else if (this.type === 'brick') {
      if (game.player.isSuper) {
        // Super Mario Shatters Brick!
        game.sounds.brickBreak();
        game.addScore(50);
        game.particles.push(new Particle(this.x + 8, this.y + 8, -2.5, -5.5, COLORS.brickBody, 8, 35, 0.3));
        game.particles.push(new Particle(this.x + 24, this.y + 8, 2.5, -5.5, COLORS.brickBody, 8, 35, 0.3));
        game.particles.push(new Particle(this.x + 8, this.y + 24, -1.8, -3.5, COLORS.brickBody, 8, 35, 0.3));
        game.particles.push(new Particle(this.x + 24, this.y + 24, 1.8, -3.5, COLORS.brickBody, 8, 35, 0.3));
        this.active = false;
      } else {
        // Small Mario bumps brick
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

  draw(ctx, camX, timer) {
    if (!this.active) return;
    const px = Math.round(this.x - camX);
    const py = Math.round(this.y + this.bumpOffset);

    if (this.type === 'ground') {
      ctx.fillStyle = COLORS.groundBody;
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = COLORS.groundBrick;
      ctx.fillRect(px + 2, py + 8, 12, 10);
      ctx.fillRect(px + 16, py + 8, 14, 10);
      ctx.fillRect(px + 8, py + 20, 16, 10);
      // Green Grass Border
      ctx.fillStyle = COLORS.groundTop;
      ctx.fillRect(px, py, TILE_SIZE, 6);
      ctx.fillStyle = '#5cfc5c';
      ctx.fillRect(px + 4, py, 6, 2);
      ctx.fillRect(px + 18, py, 6, 2);
    } else if (this.type === 'brick') {
      ctx.fillStyle = COLORS.brickBody;
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = COLORS.brickShadow;
      ctx.fillRect(px, py + 15, TILE_SIZE, 2);
      ctx.fillRect(px + 15, py, 2, 15);
      ctx.fillRect(px + 7, py + 16, 2, 16);
      ctx.fillRect(px + 23, py + 16, 2, 16);
      ctx.fillStyle = COLORS.brickHighlight;
      ctx.fillRect(px, py, TILE_SIZE, 2);
      ctx.fillRect(px, py, 2, TILE_SIZE);
    } else if (this.type === 'question') {
      ctx.fillStyle = COLORS.questionGold;
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = COLORS.questionDark;
      ctx.strokeRect(px + 1.5, py + 1.5, TILE_SIZE - 3, TILE_SIZE - 3);
      ctx.fillRect(px + 2, py + 2, 2, 2);
      ctx.fillRect(px + TILE_SIZE - 4, py + 2, 2, 2);
      ctx.fillRect(px + 2, py + TILE_SIZE - 4, 2, 2);
      ctx.fillRect(px + TILE_SIZE - 4, py + TILE_SIZE - 4, 2, 2);

      // Question Mark "?"
      ctx.fillStyle = '#000';
      const pulse = Math.sin(timer * 0.1) * 1;
      ctx.fillRect(px + 12, py + 7 + pulse, 8, 4);
      ctx.fillRect(px + 18, py + 11 + pulse, 4, 4);
      ctx.fillRect(px + 14, py + 15 + pulse, 4, 4);
      ctx.fillRect(px + 14, py + 22 + pulse, 4, 4);
    } else if (this.type === 'empty') {
      ctx.fillStyle = COLORS.questionEmpty;
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = '#5c4832';
      ctx.lineWidth = 2;
      ctx.strokeRect(px + 1, py + 1, TILE_SIZE - 2, TILE_SIZE - 2);
      ctx.fillStyle = '#3a2d1f';
      ctx.fillRect(px + 3, py + 3, 2, 2);
      ctx.fillRect(px + TILE_SIZE - 5, py + 3, 2, 2);
      ctx.fillRect(px + 3, py + TILE_SIZE - 5, 2, 2);
      ctx.fillRect(px + TILE_SIZE - 5, py + TILE_SIZE - 5, 2, 2);
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

  draw(ctx, camX) {
    const px = Math.round(this.x - camX);
    const py = Math.round(this.y);

    // Pipe Lip (top section)
    ctx.fillStyle = COLORS.pipeGreen;
    ctx.fillRect(px - 4, py, this.width + 8, 20);
    ctx.fillStyle = COLORS.pipeHighlight;
    ctx.fillRect(px - 2, py + 2, 6, 16);
    ctx.fillStyle = COLORS.pipeShadow;
    ctx.fillRect(px + this.width, py + 2, 3, 16);

    // Pipe Body (stem)
    ctx.fillStyle = COLORS.pipeGreen;
    ctx.fillRect(px, py + 20, this.width, this.height - 20);
    ctx.fillStyle = COLORS.pipeHighlight;
    ctx.fillRect(px + 2, py + 20, 6, this.height - 20);
    ctx.fillStyle = COLORS.pipeShadow;
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
    ctx.fillStyle = COLORS.questionGold;
    ctx.fillRect(-currentW / 2, -10, currentW, 20);
    ctx.fillStyle = '#fff';
    ctx.fillRect(-currentW / 4, -8, Math.max(1, currentW / 3), 16);
    ctx.restore();
  }
}

// --- 8. LEVEL GENERATOR ---
class Level {
  constructor() {
    this.width = 3900;
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
    this.flagpole = null;
    this.castle = null;

    this.init();
  }

  init() {
    this.blocks = [];
    this.solids = [];
    this.coins = [];
    this.enemies = [];
    this.mushrooms = [];
    this.pipes = [];
    this.clouds = [];
    this.hills = [];

    // Background Scenery
    for (let x = 60; x < this.width - 200; x += 220 + Math.random() * 150) {
      this.clouds.push({ x, y: 40 + Math.random() * 80, size: 28 + Math.random() * 20 });
    }
    for (let x = 40; x < this.width; x += 400 + Math.random() * 200) {
      this.hills.push({ x, y: this.floorY, radius: 70 + Math.random() * 40 });
    }

    // 1. Continuous Ground with Gaps
    const groundSegments = [
      { start: 0, end: 1100 },
      { start: 1220, end: 2000 },
      { start: 2120, end: 3100 },
      { start: 3180, end: 3900 }
    ];

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
    const pipeDefs = [
      { x: 380, h: 64 },
      { x: 680, h: 96 },
      { x: 920, h: 128 },
      { x: 1600, h: 72 },
      { x: 2350, h: 96 }
    ];
    pipeDefs.forEach(p => {
      const pipe = new Pipe(p.x, this.floorY - p.h, p.h);
      this.pipes.push(pipe);
      this.solids.push({ x: pipe.x, y: pipe.y, width: pipe.width, height: pipe.height });
    });

    // 3. Question Blocks & Bricks
    const addBlock = (x, y, type, item = null) => {
      const b = new Block(x, y, type, item);
      this.blocks.push(b);
      this.solids.push(b);
      return b;
    };

    // Zone 1: First Question block has coin, row of bricks with Super Mushroom!
    addBlock(240, this.floorY - 110, 'question', 'coin');
    addBlock(320, this.floorY - 110, 'brick');
    addBlock(352, this.floorY - 110, 'question', 'mushroom'); // Super Mushroom!
    addBlock(384, this.floorY - 110, 'brick');

    // High platform row
    for (let i = 0; i < 5; i++) {
      addBlock(500 + i * 32, this.floorY - 110, i === 2 ? 'question' : 'brick', 'coin');
    }
    addBlock(564, this.floorY - 200, 'question', 'coin');

    // Chasm floating bridge
    addBlock(1130, this.floorY - 70, 'brick');
    addBlock(1162, this.floorY - 70, 'brick');

    // Zone 2 Blocks
    addBlock(1340, this.floorY - 100, 'question', 'coin');
    addBlock(1372, this.floorY - 100, 'brick');
    addBlock(1404, this.floorY - 100, 'question', 'mushroom'); // Another Mushroom!
    for (let i = 0; i < 6; i++) {
      addBlock(1720 + i * 32, this.floorY - 120, 'brick');
    }
    addBlock(1784, this.floorY - 210, 'question', 'coin');

    // Pyramid Stairs leading to flagpole
    const stairX = 2700;
    for (let step = 0; step < 7; step++) {
      for (let h = 0; h <= step; h++) {
        addBlock(stairX + step * 32, this.floorY - (h + 1) * 32, 'brick');
      }
    }

    // 4. Floating Coins
    const coinLocs = [
      { x: 248, y: this.floorY - 45 },
      { x: 508, y: this.floorY - 145 },
      { x: 540, y: this.floorY - 145 },
      { x: 572, y: this.floorY - 145 },
      { x: 604, y: this.floorY - 145 },
      { x: 1140, y: this.floorY - 110 },
      { x: 1730, y: this.floorY - 150 },
      { x: 1762, y: this.floorY - 150 },
      { x: 1794, y: this.floorY - 150 },
      { x: 1826, y: this.floorY - 150 },
      { x: 1858, y: this.floorY - 150 },
      { x: 2200, y: this.floorY - 60 },
      { x: 2240, y: this.floorY - 80 },
      { x: 2280, y: this.floorY - 60 }
    ];
    coinLocs.forEach(c => this.coins.push(new Coin(c.x, c.y)));

    // 5. Enemies (Goombas and Koopa Troopa!)
    this.enemies.push(new Enemy(480, this.floorY - 26, 'goomba'));
    this.enemies.push(new Enemy(750, this.floorY - 26, 'goomba'));
    this.enemies.push(new Enemy(1020, this.floorY - 32, 'koopa')); // Koopa Troopa!
    this.enemies.push(new Enemy(1450, this.floorY - 26, 'goomba'));
    this.enemies.push(new Enemy(1500, this.floorY - 26, 'goomba'));
    this.enemies.push(new Enemy(1850, this.floorY - 32, 'koopa'));
    this.enemies.push(new Enemy(2260, this.floorY - 26, 'goomba'));
    this.enemies.push(new Enemy(2450, this.floorY - 26, 'goomba'));

    // 6. Flagpole & Castle
    const flagX = 3280;
    this.flagpole = {
      x: flagX,
      y: this.floorY - 280,
      width: 14,
      height: 280,
      flagY: this.floorY - 270,
      ballColor: '#00a800',
      poleColor: '#5cfc5c',
      flagColor: '#e52521',
      reached: false
    };

    const castleX = 3480;
    this.castle = {
      x: castleX,
      y: this.floorY - 140,
      width: 150,
      height: 140
    };
  }

  drawBackground(ctx, camX) {
    ctx.fillStyle = COLORS.sky;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Parallax Clouds
    this.clouds.forEach(c => {
      const cx = c.x - camX * 0.4;
      if (cx > -120 && cx < ctx.canvas.width + 120) {
        ctx.fillStyle = COLORS.cloudWhite;
        ctx.beginPath();
        ctx.arc(cx, c.y, c.size, 0, Math.PI * 2);
        ctx.arc(cx + c.size * 0.7, c.y - c.size * 0.25, c.size * 0.8, 0, Math.PI * 2);
        ctx.arc(cx - c.size * 0.7, c.y - c.size * 0.1, c.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Parallax Hills
    this.hills.forEach(h => {
      const hx = h.x - camX * 0.6;
      if (hx > -150 && hx < ctx.canvas.width + 150) {
        ctx.fillStyle = COLORS.hillGreen;
        ctx.beginPath();
        ctx.arc(hx, h.y + 10, h.radius, Math.PI, 0, false);
        ctx.fill();
        ctx.fillStyle = COLORS.hillDark;
        ctx.beginPath();
        ctx.arc(hx, h.y + 10, h.radius - 12, Math.PI, 0, false);
        ctx.fill();
      }
    });

    // Flagpole Base Block
    if (this.flagpole) {
      const bx = Math.round(this.flagpole.x - 9 - camX);
      const by = this.floorY - 16;
      ctx.fillStyle = COLORS.questionEmpty;
      ctx.fillRect(bx, by, 32, 16);
      ctx.strokeStyle = '#3a2d1f';
      ctx.strokeRect(bx, by, 32, 16);
    }
  }

  drawCastle(ctx, camX) {
    if (!this.castle) return;
    const cx = Math.round(this.castle.x - camX);
    const cy = Math.round(this.castle.y);

    ctx.fillStyle = COLORS.brickBody;
    ctx.fillRect(cx, cy + 40, this.castle.width, this.castle.height - 40);
    ctx.fillRect(cx + 20, cy, this.castle.width - 40, 40);
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(cx + 20 + i * 30, cy - 14, 18, 14);
    }

    // Doorway
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx + this.castle.width / 2, cy + this.castle.height - 35, 20, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(cx + this.castle.width / 2 - 20, cy + this.castle.height - 35, 40, 35);

    // Castle Flag
    ctx.fillStyle = '#fff';
    ctx.fillRect(cx + this.castle.width / 2 - 2, cy - 35, 4, 25);
    ctx.fillStyle = COLORS.marioRed;
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

    ctx.fillStyle = COLORS.questionGold;
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

    this.state = 'START'; // 'START', 'PLAYING', 'PAUSED', 'DYING', 'FLAG_SLIDE', 'VICTORY', 'GAMEOVER'
    this.score = 0;
    this.coins = 0;
    this.lives = 3;
    this.timeLeft = 300;
    this.timeCounter = 0;
    this.highScore = parseInt(localStorage.getItem('mario_highscore') || '0', 10);

    this.camX = 0;
    this.level = new Level();
    this.player = new Player(80, this.level.floorY - 40);
    this.particles = [];
    this.floatingTexts = [];
    this.globalTimer = 0;

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

    requestAnimationFrame(this.loop.bind(this));
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
        else if (this.state === 'GAMEOVER' || this.state === 'VICTORY') this.restartGame();
      }

      if (e.code === 'KeyP' || e.code === 'Escape') {
        if (this.state === 'PLAYING') this.state = 'PAUSED';
        else if (this.state === 'PAUSED') this.state = 'PLAYING';
      }

      if (e.code === 'KeyM') this.toggleSound();
      if (e.code === 'KeyR') this.resetLevel();
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
      else if (this.state === 'GAMEOVER' || this.state === 'VICTORY') this.restartGame();
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

    if (resetBtn) resetBtn.addEventListener('click', () => this.resetLevel());

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

    // Touch controls
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
      if (this.state === 'START' || this.state === 'GAMEOVER' || this.state === 'VICTORY') this.startGame();
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
    this.state = 'PLAYING';
    this.timeLeft = 300;
  }

  resetLevel() {
    this.level = new Level();
    this.player.reset();
    this.camX = 0;
    this.particles = [];
    this.floatingTexts = [];
    this.timeLeft = 300;
    this.state = 'PLAYING';
  }

  restartGame() {
    this.score = 0;
    this.coins = 0;
    this.lives = 3;
    this.player.setSuper(false);
    this.resetLevel();
  }

  handlePlayerDamage() {
    if (this.player.isSuper) {
      // Revert from Super Mario to Small Mario with invulnerability
      this.player.setSuper(false);
      this.player.invulnerableTimer = 120;
      this.sounds.bump();
      this.floatingTexts.push(new FloatingText('SHRINK!', this.player.x, this.player.y - 10, '#ffffff'));
    } else {
      // Lose Life
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
          // Landing
          p.y = solid.y - p.height;
          p.vy = 0;
          p.isGrounded = true;
        } else if (p.vy < 0) {
          // Head bump
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

    // 3. Void Fall
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
          this.particles.push(new Particle(coin.x + 8, coin.y + 10, (Math.random() - 0.5) * 3, -1.5 - Math.random() * 2, COLORS.questionGold, 4, 18, 0.1));
        }
      }
    }

    // 5. Super Mushroom Pickups
    for (const m of this.level.mushrooms) {
      if (!m.collected && !m.isSprouting && this.checkCollision(p, m)) {
        m.collected = true;
        this.sounds.powerup();
        this.player.setSuper(true);
        this.addScore(1000);
        this.floatingTexts.push(new FloatingText('+1000 SUPER!', m.x - 10, m.y - 15, '#5cfc5c'));
        for (let i = 0; i < 12; i++) {
          this.particles.push(new Particle(m.x + 12, m.y + 12, (Math.random() - 0.5) * 4, -2 - Math.random() * 3, COLORS.shroomRed, 4, 25, 0.1));
        }
      }
    }

    // 6. Enemy Interactions (Goombas & Koopas)
    for (const enemy of this.level.enemies) {
      if (enemy.isDead && enemy.type === 'goomba') continue;

      if (this.checkCollision(p, enemy)) {
        const marioBottom = p.y + p.height;
        const enemyTop = enemy.y;

        // Did Mario land on top of enemy?
        if (p.vy > 0 && marioBottom - p.vy <= enemyTop + 14) {
          if (enemy.type === 'goomba') {
            // Stomp Goomba
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
              // Stomp Koopa -> Turn into shell
              enemy.isShell = true;
              enemy.shellMoving = false;
              this.sounds.stomp();
              this.addScore(100);
              p.vy = this.keys.jump ? -11.0 : -7.5;
            } else if (!enemy.shellMoving) {
              // Kick motionless shell
              enemy.shellMoving = p.x < enemy.x ? 1 : -1;
              this.sounds.kickShell();
              this.addScore(400);
              p.vy = -6;
            } else {
              // Stop moving shell
              enemy.shellMoving = false;
              this.sounds.stomp();
              p.vy = -7.5;
            }
          }
        } else if (enemy.type === 'koopa' && enemy.isShell && !enemy.shellMoving) {
          // Walk into motionless shell -> Kick it!
          enemy.shellMoving = p.x < enemy.x ? 1 : -1;
          this.sounds.kickShell();
          this.addScore(400);
        } else if (p.invulnerableTimer === 0) {
          // Mario takes hit
          this.handlePlayerDamage();
          return;
        }
      }
    }

    // 7. Moving Shell destroying other enemies
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

    if (this.state === 'PLAYING') {
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
      if (this.timeLeft > 0 && this.victoryTimer % 2 === 0) {
        this.timeLeft--;
        this.addScore(50);
        this.sounds.coin();
      }
      this.fireworkTimer++;
      if (this.fireworkTimer > 30) {
        this.fireworkTimer = 0;
        const fx = this.level.castle.x + Math.random() * this.level.castle.width;
        const fy = this.level.castle.y - 40 - Math.random() * 60;
        const colors = ['#fcd116', '#e52521', '#5cfc5c', '#ffffff', '#5c94fc'];
        const chosenCol = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = 1.5 + Math.random() * 3.5;
          this.particles.push(new Particle(fx, fy, Math.cos(angle) * spd, Math.sin(angle) * spd, chosenCol, 4, 30, 0.08));
        }
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

    ctx.fillStyle = COLORS.questionGold;
    ctx.fillText('●', 210, 29);
    ctx.fillStyle = '#fff';
    ctx.fillText(`x${this.coins.toString().padStart(2, '0')}`, 226, 29);

    ctx.fillText('MUNDO', 360, 22);
    ctx.fillText('1-1', 374, 36);

    ctx.fillText('TIEMPO', 510, 22);
    ctx.fillText(Math.max(0, this.timeLeft).toString().padStart(3, '0'), 526, 36);

    ctx.fillStyle = COLORS.marioRed;
    ctx.fillText('♥', 680, 29);
    ctx.fillStyle = '#fff';
    ctx.fillText(`x${this.lives}`, 698, 29);

    ctx.restore();
  }

  drawOverlay(title, subtitle, extra = '') {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.textAlign = 'center';
    ctx.font = '22px "Press Start 2P", monospace';
    ctx.fillStyle = COLORS.questionGold;
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

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Background
    this.level.drawBackground(ctx, this.camX);

    // 2. Blocks & Pipes
    this.level.blocks.forEach(b => b.draw(ctx, this.camX, this.globalTimer));
    this.level.pipes.forEach(p => p.draw(ctx, this.camX));

    // 3. Items & Coins
    this.level.coins.forEach(c => c.draw(ctx, this.camX));
    this.level.mushrooms.forEach(m => m.draw(ctx, this.camX));

    // 4. Flagpole & Castle
    this.level.drawFlagpole(ctx, this.camX);
    this.level.drawCastle(ctx, this.camX);

    // 5. Enemies (Goombas & Koopas)
    this.level.enemies.forEach(e => e.draw(ctx, this.camX));

    // 6. Player (Mario)
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
        pulse ? 'PRESIONA ENTER O ESPACIO' : '★ HAZ CLIC PARA JUGAR ★',
        `RÉCORD: ${this.highScore}  •  FLECHAS O A/D Y ESPACIO`
      );
    } else if (this.state === 'PAUSED') {
      this.drawOverlay('JUEGO EN PAUSA', 'PRESIONA P O ESCAPE PARA CONTINUAR');
    } else if (this.state === 'GAMEOVER') {
      this.drawOverlay(
        '¡GAME OVER!',
        'PRESIONA ENTER O CLIC PARA REINTENTAR',
        `PUNTUACIÓN FINAL: ${this.score}  •  RÉCORD: ${this.highScore}`
      );
    } else if (this.state === 'VICTORY') {
      this.drawOverlay(
        '¡NIVEL COMPLETADO!',
        '¡FELICIDADES, HAS SALVADO EL REINO!',
        `PUNTUACIÓN TOTAL: ${this.score}  •  CLIC / ENTER PARA REJUGAR`
      );
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
