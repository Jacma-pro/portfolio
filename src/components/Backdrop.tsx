/** Décor de fond fixe : aurores, grille, grain, vignette. Purement visuel. */
const Backdrop = () => (
  <div className="backdrop" aria-hidden="true">
    <div className="backdrop__aurora backdrop__aurora--a" />
    <div className="backdrop__aurora backdrop__aurora--b" />
    <div className="backdrop__aurora backdrop__aurora--c" />
    <div className="backdrop__grid" />
    <div className="backdrop__grain" />
    <div className="backdrop__vignette" />
  </div>
)

export default Backdrop
