import { motion, useScroll, useSpring } from 'framer-motion'
import './ScrollProgress.scss'

/** Filet de progression de lecture, calé sous la navbar. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

export default ScrollProgress
