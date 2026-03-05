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
}

type Phase = 'idle' | 'playing' | 'dead'

// ── Helper: draw ONE obstacle ─────────────────────────────────────────────────
function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle) {
  ctx.fillStyle = '#6FC3A9'
  // trunk
  ctx.fillRect(obs.x, GROUND_Y - obs.shape.h, obs.shape.w, obs.shape.h)
  // arms
  for (const arm of obs.shape.arms) {
    ctx.fillRect(
      obs.x + arm.dx,
      GROUND_Y - obs.shape.h + arm.dy,
      arm.w,
      arm.h,
    )
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

    // sky
    ctx.fillStyle = '#0f0f1a'
    ctx.fillRect(0, 0, CW, CH)

    // scrolling ground pebbles
    ctx.fillStyle = '#2a2a3a'
    for (let i = 0; i < 25; i++) {
      const bx = ((i * 37 + groundOffsetRef.current) % CW + CW) % CW
      ctx.fillRect(bx, GROUND_Y + 6, 4, 2)
    }

    // ground line
    ctx.fillStyle = '#6FC3A9'
    ctx.fillRect(0, GROUND_Y, CW, 2)

    // obstacles
    for (const obs of obstaclesRef.current) drawObstacle(ctx, obs)

    // dodo sprite (flash when dead)
    const dead  = phaseRef.current === 'dead'
    const flash = dead && Math.floor(deadFlashRef.current / 6) % 2 === 1
    if (!flash) {
      const sprite = imgsRef.current[spriteIdxRef.current]
      const drawY  = GROUND_Y - DODO_H - dodoYRef.current
      if (sprite?.complete) ctx.drawImage(sprite, DODO_X, drawY, DODO_W, DODO_H)
    }

    // score HUD
    ctx.fillStyle = '#888888'
    ctx.font      = '700 16px monospace'
    ctx.textAlign = 'right'
    const hiStr  = String(highScoreRef.current).padStart(5, '0')
    const scStr  = String(Math.floor(scoreRef.current)).padStart(5, '0')
    ctx.fillText(`HI ${hiStr}  ${scStr}`, CW - 20, 28)

    // overlays
    ctx.textAlign = 'center'
    if (phaseRef.current === 'idle') {
      ctx.fillStyle = '#E0E0E0'
      ctx.font      = '700 18px monospace'
      ctx.fillText(translate('game.idle'), CW / 2, CH / 2 - 10)
    }
    if (phaseRef.current === 'dead') {
      ctx.fillStyle = '#E0E0E0'
      ctx.font      = '700 26px monospace'
      ctx.fillText(translate('game.gameover'), CW / 2, CH / 2 - 26)
      ctx.font      = '16px monospace'
      ctx.fillText(translate('game.dead'), CW / 2, CH / 2 + 8)
    }
  }, [])

  // ── Main game loop ────────────────────────────────────────────────────────
  useEffect(() => {
    let rafId: number

    const loop = () => {
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

        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          className="dodo-game__canvas"
        />

        <p className="dodo-game__hint">
          {phase === 'idle'    && t('game.idle')}
          {phase === 'playing' && t('game.playing')}
          {phase === 'dead'    && t('game.dead')}
        </p>
      </div>
    </div>
  )
}

export default DodoGame
