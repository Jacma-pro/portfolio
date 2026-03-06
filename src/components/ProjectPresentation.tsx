import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../data/projects'
import './ProjectPresentation.scss'

interface Props {
  project: Project
}

const ProjectPresentation = ({ project }: Props) => {
  const { t, i18n } = useTranslation()
  const id = project.id

  const hasKey = (key: string) => i18n.exists(`projects.items.${id}.${key}`)

  const features: string[] = hasKey('features')
    ? (t(`projects.items.${id}.features`, { returnObjects: true }) as string[])
    : []

  const images = project.images ?? []

  // ── Lightbox state ────────────────────────────────────────────────────────
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox  = (i: number) => setLightboxIndex(i)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const showPrev = useCallback(() =>
    setLightboxIndex(i => (i !== null ? (i - 1 + images.length) % images.length : null))
  , [images.length])

  const showNext = useCallback(() =>
    setLightboxIndex(i => (i !== null ? (i + 1) % images.length : null))
  , [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowLeft')  showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, closeLightbox, showPrev, showNext])

  return (
    <div className="project-pres">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="project-pres__hero">
        {project.cover && (
          <div className="project-pres__cover-wrap">
            <img
              src={project.cover}
              alt={t(`projects.items.${id}.title`)}
              className="project-pres__cover"
            />
          </div>
        )}

        <div className="project-pres__hero-info">
          <span className="project-pres__category">
            {t(`projects.categories.${project.category}`)}
          </span>
          <h1 className="project-pres__title">
            {t(`projects.items.${id}.title`)}
          </h1>
          <p className="project-pres__desc">
            {t(`projects.items.${id}.desc`)}
          </p>

          {/* Links */}
          {(project.github || project.demo || project.figma || project.pdf) && (
            <div className="project-pres__hero-links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-pres__link project-pres__link--github"
                >
                  GitHub ↗
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-pres__link project-pres__link--demo"
                >
                  {t('projects.detail.demo')} ↗
                </a>
              )}
              {project.figma && (
                <a
                  href={project.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-pres__link project-pres__link--figma"
                >
                  {t('projects.detail.figma')} ↗
                </a>
              )}
              {project.pdf && (
                <a
                  href={project.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-pres__link project-pres__link--pdf"
                >
                  {t('projects.detail.pdf')} ↗
                </a>
              )}
            </div>
          )}

          {/* Figma hint */}
          {project.figma && (
            <p className="project-pres__figma-hint">
              {t('projects.detail.figma_hint')}
            </p>
          )}
        </div>
      </header>

      {/* ── Context & Motivation ─────────────────────────────────────────── */}
      {hasKey('context') && (
        <section className="project-pres__section">
          <h2>{t('projects.detail.context_title')}</h2>
          <p>{t(`projects.items.${id}.context`)}</p>
        </section>
      )}

      {/* ── Expected Result ──────────────────────────────────────────────── */}
      {hasKey('objective') && (
        <section className="project-pres__section">
          <h2>{t('projects.detail.objective_title')}</h2>
          <p>{t(`projects.items.${id}.objective`)}</p>
        </section>
      )}

      {/* ── Technical Approach ───────────────────────────────────────────── */}
      {hasKey('approach') && (
        <section className="project-pres__section">
          <h2>{t('projects.detail.approach_title')}</h2>
          <p>{t(`projects.items.${id}.approach`)}</p>
        </section>
      )}

      {/* ── Key Features ─────────────────────────────────────────────────── */}
      {features.length > 0 && (
        <section className="project-pres__section">
          <h2>{t('projects.detail.features_title')}</h2>
          <ul className="project-pres__features">
            {features.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Technologies ─────────────────────────────────────────────────── */}
      <section className="project-pres__section">
        <h2>{t('projects.detail.techs')}</h2>
        <ul className="project-pres__techs">
          {project.techs.map(tech => (
            <li key={tech} className="project-pres__tech">{tech}</li>
          ))}
        </ul>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <section className="project-pres__section">
        <h2>{t('projects.detail.gallery_title')}</h2>
        {images.length > 0 ? (
          <div className="project-pres__gallery">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${t(`projects.items.${id}.title`)} - ${i + 1}`}
                className="project-pres__gallery-img"
                onClick={() => openLightbox(i)}
              />
            ))}
          </div>
        ) : (
          <p className="project-pres__gallery-placeholder">
            {t('projects.detail.gallery_placeholder')}
          </p>
        )}
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="project-pres__lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t(`projects.items.${id}.title`)}
        >
          <button
            className="project-pres__lightbox-close"
            onClick={closeLightbox}
            aria-label="Fermer"
          >
            ✕
          </button>

          {images.length > 1 && (
            <button
              className="project-pres__lightbox-nav project-pres__lightbox-nav--prev"
              onClick={e => { e.stopPropagation(); showPrev() }}
              aria-label="Image précédente"
            >
              ‹
            </button>
          )}

          <img
            src={images[lightboxIndex]}
            alt={`${t(`projects.items.${id}.title`)} - ${lightboxIndex + 1}`}
            className="project-pres__lightbox-img"
            onClick={e => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              className="project-pres__lightbox-nav project-pres__lightbox-nav--next"
              onClick={e => { e.stopPropagation(); showNext() }}
              aria-label="Image suivante"
            >
              ›
            </button>
          )}

          <span className="project-pres__lightbox-counter">
            {lightboxIndex + 1} / {images.length}
          </span>
        </div>
      )}

      {/* ── What I Learned ───────────────────────────────────────────────── */}
      {hasKey('learnings') && (
        <section className="project-pres__section">
          <h2>{t('projects.detail.learnings_title')}</h2>
          <p>{t(`projects.items.${id}.learnings`)}</p>
        </section>
      )}
    </div>
  )
}

export default ProjectPresentation
