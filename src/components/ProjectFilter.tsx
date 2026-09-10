import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { PROJECTS, type Category } from '../data/projects'
import { Search, Close, ChevronDown, Code } from './icons'
import TechLogo from './TechLogo'
import { iconForTech } from '../data/tech-icons'
import { EASE } from '../motion/variants'
import './ProjectFilter.scss'

const ALL_CATEGORIES: Category[] = ['front', 'back', 'mockup']

/**
 * Logo d'une techno de projet. Toutes n'ont pas de marque derrière elles
 * (LSB, LocalStorage, MCD/MLD/MPD…) : celles-là reçoivent des chevrons.
 */
const TechMark = ({ tech }: { tech: string }) => {
  const icon = iconForTech(tech)
  return icon
    ? <TechLogo tech={icon} size={15} className="filters__option-icon" />
    : <Code size={15} className="filters__option-icon filters__option-icon--generic" />
}
const ALL_TECHS = Array.from(new Set(PROJECTS.flatMap(p => p.techs)))
  .sort((a, b) => a.localeCompare(b))

interface Props {
  activeCats: Category[]
  onChangeCats: (cats: Category[]) => void
  activeTechs: string[]
  onChangeTechs: (techs: string[]) => void
  query: string
  onQueryChange: (query: string) => void
  resultCount: number
  isFiltered: boolean
  onClear: () => void
}

const ProjectFilter = ({
  activeCats,
  onChangeCats,
  activeTechs,
  onChangeTechs,
  query,
  onQueryChange,
  resultCount,
  isFiltered,
  onClear,
}: Props) => {
  const { t } = useTranslation()
  const [techOpen, setTechOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const showsEverything = activeCats.length === 0 || activeCats.length === ALL_CATEGORIES.length

  const toggleCategory = (cat: Category) => {
    const next = activeCats.includes(cat)
      ? activeCats.filter(c => c !== cat)
      : [...activeCats, cat]
    // Tout sélectionner revient à ne rien filtrer.
    onChangeCats(next.length === ALL_CATEGORIES.length ? [] : next)
  }

  const toggleTech = (tech: string) => {
    onChangeTechs(
      activeTechs.includes(tech)
        ? activeTechs.filter(x => x !== tech)
        : [...activeTechs, tech],
    )
  }

  // Fermeture du menu technos au clic extérieur et à Échap
  useEffect(() => {
    if (!techOpen) return

    const onPointerDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTechOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setTechOpen(false) }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [techOpen])

  return (
    <div className="filters">
      <div className="filters__bar">

        {/* ── Recherche ────────────────────────────────────────────── */}
        <div className="filters__search">
          <Search size={16} className="filters__search-icon" />
          <input
            type="search"
            className="filters__search-input"
            placeholder={t('projects.filter.search')}
            aria-label={t('projects.filter.search_label')}
            value={query}
            onChange={e => onQueryChange(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="filters__search-clear"
              onClick={() => onQueryChange('')}
              aria-label={t('projects.filter.clear')}
            >
              <Close size={14} />
            </button>
          )}
        </div>

        {/* ── Catégories ───────────────────────────────────────────── */}
        <div className="filters__cats" role="group" aria-label={t('projects.filter.label')}>
          <button
            type="button"
            className={`filters__chip${showsEverything ? ' filters__chip--on' : ''}`}
            onClick={() => onChangeCats([])}
            aria-pressed={showsEverything}
          >
            {t('projects.filter.all')}
          </button>

          {ALL_CATEGORIES.map(cat => {
            const on = activeCats.includes(cat) && !showsEverything
            return (
              <button
                key={cat}
                type="button"
                data-category={cat}
                className={`filters__chip${on ? ' filters__chip--on' : ''}`}
                onClick={() => toggleCategory(cat)}
                aria-pressed={on}
              >
                {t(`projects.categories.${cat}`)}
              </button>
            )
          })}
        </div>

        {/* ── Technologies ─────────────────────────────────────────── */}
        <div className="filters__tech" ref={dropdownRef}>
          <button
            type="button"
            className={`filters__chip filters__tech-toggle${activeTechs.length ? ' filters__chip--on' : ''}`}
            onClick={() => setTechOpen(v => !v)}
            aria-expanded={techOpen}
          >
            {t('projects.filter.techs')}
            {activeTechs.length > 0 && (
              <span className="filters__tech-count">{activeTechs.length}</span>
            )}
            <ChevronDown size={14} className={`filters__tech-arrow${techOpen ? ' filters__tech-arrow--up' : ''}`} />
          </button>

          <AnimatePresence>
            {techOpen && (
              <motion.div
                className="filters__dropdown"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: EASE.outQuart }}
              >
                {ALL_TECHS.map(tech => (
                  <label key={tech} className="filters__option">
                    <input
                      type="checkbox"
                      checked={activeTechs.includes(tech)}
                      onChange={() => toggleTech(tech)}
                    />
                    <span className="filters__option-box" aria-hidden="true" />
                    <TechMark tech={tech} />
                    <span className="filters__option-label">{tech}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bilan ────────────────────────────────────────────────────── */}
      <div className="filters__summary">
        <span className="filters__count">{t('projects.results', { count: resultCount })}</span>
        {isFiltered && (
          <button type="button" className="filters__reset" onClick={onClear}>
            <Close size={12} />
            {t('projects.filter.clear')}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProjectFilter
