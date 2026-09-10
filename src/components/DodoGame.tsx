import { useEffect, useRef, useState, useCallback } from 'react'
import './DodoGame.scss'

import right0 from '../assets/dodo-frame/walk_right_0.png'
import right1 from '../assets/dodo-frame/walk_right_1.png'
import right2 from '../assets/dodo-frame/walk_right_2.png'
import { useTranslation } from 'react-i18next'

interface Props {
  onClose: () => void
}


// /!\ DISCLAIMER /!\

// I just want to say github copilot help me for the game, because it's not a real feature of the portfolio,
// it's more a fun easter egg, so I didn't want to spend too much time on it, and copilot help me a lot to make it in a reasonable time.
// I just want to be clear about it, because I don't want to give the wrong impression about my skills,
// and I want to be honest about the fact that I used an AI tool to help me with this part of the code.

// ── Palette (alignée sur les tokens du site) ─────────────────────────────────
const C_SKY_TOP   = '#070a10'
const C_SKY_BOT   = '#0d1622'
const C_STAR      = '#2b3a45'
const C_DUNE_FAR  = '#0e1620'
const C_DUNE_MID  = '#131f2b'
const C_DUNE_NEAR = '#182836'
const C_MOON      = '#cfe9f5'
const C_MESA      = '#0c141d'
const C_GROUND    = '#69e3ff'
const C_GRIT      = '#1d2531'
const C_CACTUS    = '#6FC3A9'
const C_CACTUS_HI = '#a6e3ce'
const C_HUD_DIM   = '#6b7688'
const C_HUD_LIVE  = '#69e3ff'

// ── Canvas dimensions ────────────────────────────────────────────────────────
const CW         = 800
const CH         = 230
const GROUND_Y   = 180

// ── Dodo ─────────────────────────────────────────────────────────────────────
const DODO_X     = 70
const DODO_W     = 70
const DODO_H     = 70
const GRAVITY    = 0.70
const JUMP_V     = -15
const DODO_ANIM  = 7

// ── Obstacle shapes ───────────────────────────────────────────────────────────
interface ArmRect { dx: number; dy: number; w: number; h: number }
interface ObstacleShape { w: number; h: number; arms: ArmRect[] }

const SHAPES: ObstacleShape[] = [
  // tall cactus
  { w: 16, h: 52, arms: [{ dx: -11, dy: 18, w: 11, h: 9 }, { dx: 16, dy: 22, w: 11, h: 9 }] },
  // short wide cactus
  { w: 20, h: 38, arms: [{ dx: -13, dy: 12, w: 13, h: 9 }, { dx: 20, dy: 16, w: 13, h: 9 }] },
  // double cactus (two trunks)
  { w: 42, h: 54, arms: [{ dx: -9, dy: 22, w: 9, h: 9 }, { dx: 42, dy: 28, w: 9, h: 9 }] },
  // small spike
  { w: 12, h: 30, arms: [] },
]

interface Obstacle {
  x:     number
  shape: ObstacleShape
  /** Tiré au hasard à l'apparition : ne sert qu'à varier le dessin. */
  seed:  number
}

/** Pastille de fond, défilant plus lentement que le sol (parallaxe). */
interface Star { x: number; y: number; r: number; depth: number }

const makeStars = (): Star[] =>
  Array.from({ length: 60 }, () => ({
    x: Math.random() * CW,
    y: Math.random() * (GROUND_Y - 30),
    r: Math.random() < 0.8 ? 1 : 2,
    // trois plans : plus l'étoile est petite, plus elle défile lentement
    depth: 0.12 + Math.random() * 0.3,
  }))

/**
 * Décor. Le dodo court sur place : toute la sensation de vitesse vient de ces
 * plans qui défilent à des vitesses différentes. Du plus lent au plus rapide :
 * lune (fixe) → mesas → dunes lointaines → dunes proches → sol.
 */

/** Lune posée en haut à gauche, avec son halo. */
const drawMoon = (ctx: CanvasRenderingContext2D) => {
  const mx = 96
  const my = 44
  const grd = ctx.createRadialGradient(mx, my, 4, mx, my, 42)
  grd.addColorStop(0, 'rgba(207, 233, 245, 0.30)')
  grd.addColorStop(1, 'rgba(207, 233, 245, 0)')
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.arc(mx, my, 42, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = C_MOON
  ctx.beginPath()
  ctx.arc(mx, my, 13, 0, Math.PI * 2)
  ctx.fill()

  // cratères : quelques disques à peine plus sombres
  ctx.fillStyle = 'rgba(120, 150, 168, 0.55)'
  for (const [dx, dy, r] of [[-4, -3, 3], [4, 2, 2], [-1, 5, 1.6]] as const) {
    ctx.beginPath()
    ctx.arc(mx + dx, my + dy, r, 0, Math.PI * 2)
    ctx.fill()
  }
}

/** Mesas anguleuses, le plan le plus lointain. */
const drawMesas = (ctx: CanvasRenderingContext2D, offset: number) => {
  ctx.fillStyle = C_MESA
  ctx.beginPath()
  ctx.moveTo(0, GROUND_Y)
  for (let x = 0; x <= CW; x += 8) {
    const t = (x + offset) / 260
    // paliers marqués : des plateaux plutôt que des collines
    const step = Math.floor((Math.sin(t) + Math.sin(t * 1.7)) * 2.2)
    ctx.lineTo(x, GROUND_Y - 46 - step * 7)
  }
  ctx.lineTo(CW, GROUND_Y)
  ctx.closePath()
  ctx.fill()
}

/** Une couche de dunes arrondies. */
const drawDunes = (
  ctx: CanvasRenderingContext2D,
  offset: number,
  color: string,
  height: number,
  wavelength: number,
) => {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(0, GROUND_Y)
  for (let x = 0; x <= CW; x += 12) {
    const y =
      GROUND_Y -
      height -
      Math.sin((x + offset) / wavelength) * (height * 0.45) -
      Math.sin((x + offset) / (wavelength * 0.38)) * (height * 0.18)
    ctx.lineTo(x, y)
  }
  ctx.lineTo(CW, GROUND_Y)
  ctx.closePath()
  ctx.fill()
}

/** Touffes d'herbe sèche au premier plan, défilant plus vite que le sol. */
const drawScrub = (ctx: CanvasRenderingContext2D, offset: number) => {
  ctx.strokeStyle = 'rgba(111, 195, 169, 0.14)'
  ctx.lineWidth = 1
  for (let i = 0; i < 9; i++) {
    // pas irrégulier : un espacement constant dessinait une frise de « V »
    const spacing = 97 + ((i * 43) % 61)
    const bx = ((i * spacing + offset * 1.3) % (CW + 60) + CW + 60) % (CW + 60) - 30
    const h = 3 + ((i * 5) % 4)
    const y = GROUND_Y + 12
    ctx.beginPath()
    ctx.moveTo(bx, y)
    ctx.lineTo(bx - 2, y - h)
    ctx.moveTo(bx, y)
    ctx.lineTo(bx + 1.5, y - h + 1)
    ctx.stroke()
  }
}

type Phase = 'idle' | 'playing' | 'dead'

// ── Helper: draw ONE obstacle ─────────────────────────────────────────────────
// Les géométries ne bougent pas : les collisions se calculent sur ces mêmes
// rectangles. Tout le dessin reste donc strictement à l'intérieur — un cactus
// qui déborderait de sa boîte serait injuste pour le joueur.
function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle) {
  const rects = [
    { x: obs.x, y: GROUND_Y - obs.shape.h, w: obs.shape.w, h: obs.shape.h },
    ...obs.shape.arms.map(a => ({
      x: obs.x + a.dx, y: GROUND_Y - obs.shape.h + a.dy, w: a.w, h: a.h,
    })),
  ]

  // teinte légèrement variable d'un cactus à l'autre
  const tint = 0.86 + obs.seed * 0.28
  const body = `rgb(${Math.round(0x6f * tint)}, ${Math.round(0xc3 * tint)}, ${Math.round(0xa9 * tint)})`

  ctx.save()
  ctx.shadowColor = C_CACTUS
  ctx.shadowBlur = 10

  // Arrondi volontairement faible et plafonné : proportionnel, le tronc large
  // du cactus double devenait un galet.
  const radiusOf = (r: { w: number; h: number }) => Math.min(r.w / 2, r.h / 2, 5)

  for (const r of rects) {
    ctx.fillStyle = body
    ctx.beginPath()
    ctx.roundRect(r.x, r.y, r.w, r.h, radiusOf(r))
    ctx.fill()
  }
  ctx.restore()

  for (const r of rects) {
    const radius = radiusOf(r)

    // flanc droit dans l'ombre : donne du volume au cylindre
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(r.x, r.y, r.w, r.h, radius)
    ctx.clip()
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)'
    ctx.fillRect(r.x + r.w * 0.62, r.y, r.w * 0.38, r.h)

    // nervures verticales
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.16)'
    ctx.lineWidth = 1
    for (let i = 1; i < 3; i++) {
      const gx = Math.round(r.x + (r.w * i) / 3) + 0.5
      ctx.beginPath()
      ctx.moveTo(gx, r.y + 2)
      ctx.lineTo(gx, r.y + r.h - 2)
      ctx.stroke()
    }
    ctx.restore()

    // arête éclairée à gauche
    ctx.fillStyle = C_CACTUS_HI
    ctx.beginPath()
    ctx.roundRect(r.x + 1, r.y + 2, Math.max(1.5, r.w * 0.16), Math.max(2, r.h - 5), 1)
    ctx.fill()

    // épines : de simples traits, seulement sur les segments assez hauts
    // Épines tracées vers l'intérieur : elles ne doivent jamais dépasser de la
    // boîte, sinon le joueur verrait une collision là où il n'y en a pas.
    if (r.h > 20) {
      ctx.strokeStyle = 'rgba(214, 245, 233, 0.45)'
      ctx.lineWidth = 1
      for (let y = r.y + 7; y < r.y + r.h - 5; y += 9) {
        const yy = Math.round(y) + 0.5
        ctx.beginPath()
        ctx.moveTo(r.x + 0.5, yy)
        ctx.lineTo(r.x + 3, yy - 2)
        ctx.moveTo(r.x + r.w - 0.5, yy + 4)
        ctx.lineTo(r.x + r.w - 3, yy + 2)
        ctx.stroke()
      }
    }
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
const DodoGame = ({ onClose }: Props) => {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // ── mutable game state in refs (avoids stale closures in RAF) ──────────────
  const phaseRef        = useRef<Phase>('idle')
  const dodoYRef        = useRef(0)          // upward offset from ground
  const dodoVYRef       = useRef(0)
  const obstaclesRef    = useRef<Obstacle[]>([])
  const scoreRef        = useRef(0)
  const speedRef        = useRef(5)
  const frameCountRef   = useRef(0)
  const spriteIdxRef    = useRef(0)
  const nextObsInRef    = useRef(90)
  const groundOffsetRef = useRef(0)
  const deadFlashRef    = useRef(0)          // frames since death, for flash
  const highScoreRef    = useRef(
    parseInt(localStorage.getItem('dodo-hiscore') ?? '0'),
  )

  // ── React state only for UI re-renders ────────────────────────────────────
  const [phase,        setPhase]        = useState<Phase>('idle')
  const [displayScore, setDisplayScore] = useState(0)
  const [displayHi,    setDisplayHi]    = useState(() => parseInt(localStorage.getItem('dodo-hiscore') ?? '0'))
  const [finalScore,   setFinalScore]   = useState(0)

  // ── Décor de fond ─────────────────────────────────────────────────────────
  const starsRef = useRef<Star[]>([])
  useEffect(() => {
    // généré dans un effet : Math.random() pendant le rendu ne serait pas pur
    starsRef.current = makeStars()
  }, [])

  // ── Preload sprite images ──────────────────────────────────────────────────
  const imgsRef = useRef<HTMLImageElement[]>([])
  useEffect(() => {
    imgsRef.current = [right0, right1, right2].map(src => {
      const img = new Image()
      img.src = src
      return img
    })
  }, [])

  // ── Start / restart ───────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    phaseRef.current     = 'playing'
    dodoYRef.current     = 0
    dodoVYRef.current    = 0
    obstaclesRef.current = []
    scoreRef.current     = 0
    speedRef.current     = 5
    frameCountRef.current = 0
    spriteIdxRef.current  = 0
    nextObsInRef.current  = 90
    deadFlashRef.current  = 0
    setPhase('playing')
    setDisplayScore(0)
  }, [])

  // ── Jump / interact ───────────────────────────────────────────────────────
  const interact = useCallback(() => {
    if (phaseRef.current === 'idle' || phaseRef.current === 'dead') {
      startGame()
      return
    }
    if (phaseRef.current === 'playing' && dodoYRef.current <= 1) {
      dodoVYRef.current = JUMP_V
    }
  }, [startGame])

  // ── Draw ──────────────────────────────────────────────────────────────────
  const draw = useCallback((translate: (k: string) => string) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ciel en dégradé
    const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y)
    sky.addColorStop(0, C_SKY_TOP)
    sky.addColorStop(1, C_SKY_BOT)
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, CW, CH)

    const off = groundOffsetRef.current

    // étoiles, chacune sur son propre plan
    ctx.fillStyle = C_STAR
    for (const st of starsRef.current) {
      const sx = ((st.x + off * st.depth) % CW + CW) % CW
      ctx.fillRect(sx, st.y, st.r, st.r)
    }

    drawMoon(ctx)

    // lueur d'horizon, juste au-dessus du sol
    const haze = ctx.createLinearGradient(0, GROUND_Y - 70, 0, GROUND_Y)
    haze.addColorStop(0, 'rgba(105, 227, 255, 0)')
    haze.addColorStop(1, 'rgba(105, 227, 255, 0.09)')
    ctx.fillStyle = haze
    ctx.fillRect(0, GROUND_Y - 70, CW, 70)

    // reliefs, du plus lointain au plus proche
    drawMesas(ctx, -off * 0.18)
    drawDunes(ctx, -off * 0.34, C_DUNE_FAR, 34, 130)
    drawDunes(ctx, -off * 0.55, C_DUNE_MID, 24, 95)
    drawDunes(ctx, -off * 0.78, C_DUNE_NEAR, 14, 70)

    // gravier défilant
    ctx.fillStyle = C_GRIT
    for (let i = 0; i < 25; i++) {
      const bx = ((i * 37 + off) % CW + CW) % CW
      ctx.fillRect(bx, GROUND_Y + 6, 4, 2)
    }

    // sol : bande sombre puis ligne lumineuse
    ctx.fillStyle = C_SKY_TOP
    ctx.fillRect(0, GROUND_Y + 2, CW, CH - GROUND_Y - 2)
    ctx.save()
    ctx.shadowColor = C_GROUND
    ctx.shadowBlur = 14
    ctx.fillStyle = C_GROUND
    ctx.fillRect(0, GROUND_Y, CW, 2)
    ctx.restore()

    drawScrub(ctx, off)

    // obstacles
    for (const obs of obstaclesRef.current) drawObstacle(ctx, obs)

    // À l'arrêt, un léger balancement vertical : le dodo respire au lieu
    // d'être posé comme une image.
    const idleBob = phaseRef.current === 'idle'
      ? Math.sin(frameCountRef.current / 13) * 2.5
      : 0

    // ombre au sol : elle rétrécit à mesure que le dodo s'élève
    const lift = dodoYRef.current
    const shadowScale = Math.max(0.35, 1 - lift / 110)
    ctx.save()
    ctx.globalAlpha = 0.32 * shadowScale
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.ellipse(DODO_X + DODO_W / 2, GROUND_Y + 1, 24 * shadowScale, 4 * shadowScale, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // dodo sprite (flash when dead)
    const dead  = phaseRef.current === 'dead'
    const flash = dead && Math.floor(deadFlashRef.current / 6) % 2 === 1
    if (!flash) {
      const sprite = imgsRef.current[spriteIdxRef.current]
      const drawY  = GROUND_Y - DODO_H - dodoYRef.current + idleBob
      if (sprite?.complete) ctx.drawImage(sprite, DODO_X, drawY, DODO_W, DODO_H)
    }

    // HUD : le record reste en retrait, le score courant ressort
    ctx.font      = '500 14px "JetBrains Mono", monospace'
    ctx.textAlign = 'right'
    const hiStr = String(highScoreRef.current).padStart(5, '0')
    const scStr = String(Math.floor(scoreRef.current)).padStart(5, '0')
    ctx.fillStyle = C_HUD_DIM
    ctx.fillText(`HI ${hiStr}`, CW - 92, 28)
    ctx.fillStyle = C_HUD_LIVE
    ctx.font      = '700 15px "JetBrains Mono", monospace'
    ctx.fillText(scStr, CW - 20, 28)

    // surcouches — un voile assombri garde le texte lisible sur le décor
    ctx.textAlign = 'center'
    const veil = () => {
      // assez sombre pour le texte, assez clair pour qu'on voie encore la scène
      ctx.fillStyle = 'rgba(7, 10, 16, 0.55)'
      ctx.fillRect(0, 0, CW, CH)
    }

    if (phaseRef.current === 'idle') {
      // Le titre « DODO RUN » est déjà au-dessus du canvas : on ne l'y répète pas.
      veil()
      ctx.fillStyle = '#edf2f7'
      ctx.font      = '500 16px "JetBrains Mono", monospace'
      ctx.fillText(translate('game.idle'), CW / 2, CH / 2 + 4)
    }

    if (phaseRef.current === 'dead') {
      veil()
      ctx.save()
      ctx.shadowColor = C_HUD_LIVE
      ctx.shadowBlur = 18
      ctx.fillStyle = C_HUD_LIVE
      ctx.font      = '700 28px "JetBrains Mono", monospace'
      ctx.fillText(translate('game.gameover'), CW / 2, CH / 2 - 22)
      ctx.restore()
      ctx.fillStyle = '#a8b3c4'
      ctx.font      = '14px "JetBrains Mono", monospace'
      ctx.fillText(translate('game.dead'), CW / 2, CH / 2 + 14)
    }
  }, [])

  // ── Main game loop ────────────────────────────────────────────────────────
  useEffect(() => {
    let rafId: number

    const loop = () => {
      // Écran d'accueil : rien n'est en jeu, mais la scène doit vivre — le
      // décor dérive doucement et le dodo piétine sur place.
      if (phaseRef.current === 'idle') {
        frameCountRef.current++
        groundOffsetRef.current -= 1.1
        if (frameCountRef.current % 16 === 0) {
          spriteIdxRef.current = (spriteIdxRef.current + 1) % 3
        }
      }

      if (phaseRef.current === 'playing') {
        frameCountRef.current++
        speedRef.current     += 0.002
        scoreRef.current     += speedRef.current * 0.012
        groundOffsetRef.current -= speedRef.current

        // sprite animation
        if (frameCountRef.current % DODO_ANIM === 0) {
          spriteIdxRef.current = (spriteIdxRef.current + 1) % 3
        }

        // score UI (every 10 frames)
        if (frameCountRef.current % 10 === 0) {
          setDisplayScore(Math.floor(scoreRef.current))
        }

        // physics
        dodoVYRef.current   += GRAVITY
        dodoYRef.current    -= dodoVYRef.current
        if (dodoYRef.current <= 0) {
          dodoYRef.current  = 0
          dodoVYRef.current = 0
        }

        // spawn obstacles
        nextObsInRef.current--
        if (nextObsInRef.current <= 0) {
          obstaclesRef.current.push({
            x:     CW + 10,
            shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
            seed:  Math.random(),
          })
          nextObsInRef.current = Math.floor(
            Math.max(45, 90 - scoreRef.current * 0.08) + Math.random() * 50,
          )
        }

        // move & prune obstacles
        obstaclesRef.current = obstaclesRef.current
          .map(o => ({ ...o, x: o.x - speedRef.current }))
          .filter(o => o.x > -80)

        // ── collision ─────────────────────────────────────────────────────
        const dL = DODO_X + 6
        const dR = DODO_X + DODO_W - 6
        const dT = GROUND_Y - DODO_H - dodoYRef.current + 6
        const dB = GROUND_Y - dodoYRef.current - 4

        outer: for (const obs of obstaclesRef.current) {
          // compose all rects: trunk + arms
          const rects = [
            { x: obs.x, y: GROUND_Y - obs.shape.h, w: obs.shape.w, h: obs.shape.h },
            ...obs.shape.arms.map(a => ({
              x: obs.x + a.dx, y: GROUND_Y - obs.shape.h + a.dy, w: a.w, h: a.h,
            })),
          ]
          for (const r of rects) {
            if (dR > r.x && dL < r.x + r.w && dB > r.y && dT < r.y + r.h) {
              phaseRef.current = 'dead'
              setPhase('dead')
              const s = Math.floor(scoreRef.current)
              setFinalScore(s)
              if (s > highScoreRef.current) {
                highScoreRef.current = s
                localStorage.setItem('dodo-hiscore', String(s))
                setDisplayHi(s)
              }
              spriteIdxRef.current = 1   // freeze on standing frame
              break outer
            }
          }
        }
      }

      if (phaseRef.current === 'dead') {
        deadFlashRef.current++
      }

      draw(t)
      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [draw, t])

  // ── Keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); interact() }
      if (e.code === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [interact, onClose])

  return (
    <div className="dodo-game" onClick={interact}>
      <button
        className="dodo-game__close"
        onClick={e => { e.stopPropagation(); onClose() }}
        aria-label="Fermer le jeu"
      >
        ✕
      </button>

      <div className="dodo-game__wrapper">
        <h2 className="dodo-game__title">DODO RUN</h2>

        {phase === 'dead' && (
          <div className="dodo-game__hud">
            <span>SCORE&nbsp;<strong>{finalScore}</strong></span>
            <span>RECORD&nbsp;<strong>{displayHi}</strong></span>
          </div>
        )}
        {phase === 'playing' && (
          <div className="dodo-game__hud">
            <span>SCORE&nbsp;<strong>{displayScore}</strong></span>
          </div>
        )}

        {/* Le conteneur porte les scanlines : un <canvas> ne peut pas avoir
            de pseudo-élément. */}
        <div className="dodo-game__screen">
          <canvas
            ref={canvasRef}
            width={CW}
            height={CH}
            className="dodo-game__canvas"
          />
        </div>

        {/* Les états idle et dead affichent déjà leur consigne dans le canvas :
            la répéter ici la ferait apparaître deux fois à l'écran. */}
        <p className="dodo-game__hint">
          {phase === 'playing' ? t('game.playing') : '\u00A0'}
        </p>
      </div>
    </div>
  )
}

export default DodoGame
