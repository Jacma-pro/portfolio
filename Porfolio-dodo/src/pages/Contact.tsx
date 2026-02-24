const Contact = () => {
  return (
    <main className="page page--contact">
      <h1>Contact</h1>
      <p className="text-muted">Tu veux me contacter ? Retrouve-moi ici :</p>

      <ul className="contact__links">
        <li>
          <span className="contact__label">Email</span>
          <a href="mailto:dorianjacolin@gmail.com" className="contact__value">
            dorianjacolin@gmail.com
          </a>
        </li>
        <li>
          <span className="contact__label">GitHub</span>
          <a
            href="https://github.com/Jacma-pro"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__value"
          >
            github.com/Jacma-pro
          </a>
        </li>
        <li>
          <span className="contact__label">LinkedIn</span>
          <a
            href="https://www.linkedin.com/in/dorian-jacolin/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__value"
          >
            linkedin.com/in/dorian-jacolin
          </a>
        </li>
      </ul>
    </main>
  )
}

export default Contact
