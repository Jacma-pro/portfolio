import { useState, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../data/projects'
import Reveal from './motion/Reveal'
import SplitText from './motion/SplitText'
import Parallax from './motion/Parallax'
import { ArrowUpRight, Close, ArrowLeft, ArrowRight } from './icons'
import { EASE } from '../motion/variants'
import { lockScroll, unlockScroll } from '../motion/lenis'
import './ProjectPresentation.scss'

interface Props {
  project: Project
}

const GALLERY_LIMIT = 3

const ProjectPresentation = ({ project }: Props) => {
  const { t, i18n } = useTranslation()
  const id = project.id

  const hasKey = (key: string) => i18n.exists(`projects.items.${id}.${key}`)
  const title = t(`projects.items.${id}.title`)

  const features: string[] = hasKey('features')
    ? (t(`projects.items.${id}.features`, { returnObjects: true }) as string[])
    : []

  const images = useMemo(() => project.images ?? [], [project.images])

  const [galleryExpanded, setGalleryExpanded] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const total = images.length
  const closeLightbox = () => setLightboxIndex(null)
  const step = (delta: number) =>
    setLightboxIndex(i => (i === null ? null : (i + delta + total) % total))

  // Clavier + gel du scroll pendant que la visionneuse est ouverte
  const lightboxOpen = lightboxIndex !== null
  useEffect(() => {
    if (!lightboxOpen) return

    lockScroll()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i === null ? null : (i - 1 + total) % total))
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i === null ? null : (i + 1) % total))
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [lightboxOpen, total])

  const links = [
    project.github && { href: project.github, label: 'GitHub', kind: 'github' },
    project.demo && { href: project.demo, label: t('projects.detail.demo'), kind: 'demo' },
    project.pdf && { href: project.pdf, label: t('projects.detail.pdf'), kind: 'pdf' },
    project.figma && { href: project.figma, label: t('projects.detail.figma'), kind: 'figma' },
  ].filter(Boolean) as { href: string; label: string; kind: string }[]

  const sections = [
    hasKey('context') && { key: 'context', titleKey: 'context_title' },
    hasKey('objective') && { key: 'objective', titleKey: 'objective_title' },
    hasKey('approach') && { key: 'approach', titleKey: 'approach_title' },
  ].filter(Boolean) as { key: string; titleKey: string }[]

  const shownImages = galleryExpanded ? images : images.slice(0, GALLERY_LIMIT)

  return (
    <article className="case" data-category={project.category}>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <header className="case__hero">
        {project.cover && (
          <div className="case__cover">
            <Parallax distance={-26} className="case__cover-inner">
              <img src={project.cover} alt="" />
            </Parallax>
            <span className="case__cover-scrim" aria-hidden="true" />
          </div>
        )}

        <div className="case__intro">
          <span className="eyebrow">{t('projects.detail.eyebrow')}</span>
          <h1 className="case__title">
            <SplitText text={title} delay={0.12} />
          </h1>
          <p className="case__desc">{t(`projects.items.${id}.desc`)}</p>

          {links.length > 0 && (
            <div className="case__links">
              {links.map(link => (
                <a
                  key={link.kind}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case__link"
                  data-kind={link.kind}
                >
                  {link.label}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          )}

          {project.figma && (
            <p className="case__hint">{t('projects.detail.figma_hint')}</p>
          )}
        </div>
      </header>

      <div className="case__body">

        {/* ── Colonne latérale ─────────────────────────────────────────── */}
        <aside className="case__meta">
          <div className="case__meta-card">
            <h2 className="case__meta-title">{t('projects.detail.summary')}</h2>

            <dl className="case__meta-list">
              <dt>{t('projects.detail.category')}</dt>
              <dd>{t(`projects.categories.${project.category}`)}</dd>
            </dl>

            <h3 className="case__meta-subtitle">{t('projects.detail.techs')}</h3>
            <ul className="case__techs">
              {project.techs.map(tech => (
                <li key={tech} className="chip">{tech}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── Contenu ──────────────────────────────────────────────────── */}
        <div className="case__content">
          {sections.map((section, i) => (
            <Reveal key={section.key} className="case__section" amount={0.15}>
              <span className="case__section-index">{String(i + 1).padStart(2, '0')}</span>
              <h2>{t(`projects.detail.${section.titleKey}`)}</h2>
              <p>{t(`projects.items.${id}.${section.key}`)}</p>
            </Reveal>
          ))}

          {features.length > 0 && (
            <Reveal className="case__section" amount={0.15}>
              <h2>{t('projects.detail.features_title')}</h2>
              <ul className="case__features">
                {features.map((feat, i) => (
                  <li key={i}>
                    <span className="case__feature-bullet" aria-hidden="true" />
                    {feat}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* ── Galerie ────────────────────────────────────────────────── */}
          <Reveal className="case__section" amount={0.1}>
            <h2>{t('projects.detail.gallery_title')}</h2>

            {images.length > 0 ? (
              <>
                <div className="case__gallery">
                  {shownImages.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      className="case__shot"
                      onClick={() => setLightboxIndex(i)}
                      aria-label={`${title} — ${i + 1}`}
                    >
                      <img src={src} alt={`${title} — ${i + 1}`} loading="lazy" />
                      <span className="case__shot-zoom" aria-hidden="true">+</span>
                    </button>
                  ))}
                </div>

                {images.length > GALLERY_LIMIT && (
                  <button
                    type="button"
                    className="btn btn--outline case__gallery-toggle"
                    onClick={() => setGalleryExpanded(v => !v)}
                  >
                    {galleryExpanded
                      ? t('projects.detail.gallery_less')
                      : t('projects.detail.gallery_more', { count: images.length - GALLERY_LIMIT })}
                  </button>
                )}
              </>
            ) : (
              <p className="case__empty">{t('projects.detail.gallery_placeholder')}</p>
            )}
          </Reveal>

          {hasKey('learnings') && (
            <Reveal className="case__section case__section--learnings" amount={0.15}>
              <h2>{t('projects.detail.learnings_title')}</h2>
              <p>{t(`projects.items.${id}.learnings`)}</p>
            </Reveal>
          )}
        </div>
      </div>

      {/* ── Visionneuse ────────────────────────────────────────────────── */}
      {createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              className="lightbox"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button className="lightbox__close" onClick={closeLightbox} aria-label={t('navbar.close_menu')}>
                <Close size={18} />
              </button>

              {images.length > 1 && (
                <button
                  className="lightbox__nav lightbox__nav--prev"
                  onClick={e => { e.stopPropagation(); step(-1) }}
                  aria-label="←"
                >
                  <ArrowLeft size={20} />
                </button>
              )}

              <motion.img
                key={lightboxIndex}
                src={images[lightboxIndex]}
                alt={`${title} — ${lightboxIndex + 1}`}
                className="lightbox__img"
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: EASE.outExpo }}
              />

              {images.length > 1 && (
                <button
                  className="lightbox__nav lightbox__nav--next"
                  onClick={e => { e.stopPropagation(); step(1) }}
                  aria-label="→"
                >
                  <ArrowRight size={20} />
                </button>
              )}

              <span className="lightbox__counter">
                {lightboxIndex + 1} / {images.length}
              </span>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </article>
  )
}

export default ProjectPresentation
