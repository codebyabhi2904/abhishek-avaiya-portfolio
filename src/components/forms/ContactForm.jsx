import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import { useTheme } from '../../lib/ThemeContext'
import './ContactForm.css'

const initialForm = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
}

const projectTypes = [
  'Shopify Store Development',
  'Shopify Plus Development',
  'Theme Customization',
  'Performance Optimization',
  'Store Migration',
  'Other',
]

const budgets = ['Under $2,000', '$2,000 – $5,000', '$5,000 – $15,000', '$15,000+', 'Not sure yet']

// Set VITE_CONTACT_FORM_ENDPOINT (e.g. the Web3Forms submit endpoint, or any
// other JSON-accepting POST endpoint such as Formspree) to connect this form
// to a real submission service. Without it, the form stays honest about not
// being wired up yet rather than faking a success state.
const ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
// Required by Web3Forms specifically — ignored by other endpoints.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
// Web3Forms' own shared hCaptcha sitekey (the same fallback its client
// script injects when a form doesn't declare its own data-sitekey). This
// access key's submissions require a captcha token, so it's rendered
// directly here instead of relying on that script's one-shot DOM scan,
// which races against React mounting the form.
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'
const HCAPTCHA_SCRIPT_SRC = 'https://js.hcaptcha.com/1/api.js?render=explicit'

let hcaptchaLoadPromise = null
function loadHcaptcha() {
  if (window.hcaptcha) return Promise.resolve()
  if (!hcaptchaLoadPromise) {
    hcaptchaLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = HCAPTCHA_SCRIPT_SRC
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load hCaptcha'))
      document.body.appendChild(script)
    })
  }
  return hcaptchaLoadPromise
}

function ContactForm() {
  const { theme } = useTheme()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error | unconfigured
  const captchaRef = useRef(null)
  const captchaWidgetId = useRef(null)

  useEffect(() => {
    if (!WEB3FORMS_ACCESS_KEY || !captchaRef.current) return
    let cancelled = false

    loadHcaptcha()
      .then(() => {
        if (cancelled || !captchaRef.current || captchaWidgetId.current !== null) return
        captchaWidgetId.current = window.hcaptcha.render(captchaRef.current, {
          sitekey: HCAPTCHA_SITEKEY,
          theme,
        })
      })
      .catch(() => {
        // Captcha failed to load (e.g. offline) — submission will fail
        // validation below and the form explains why.
      })

    return () => {
      cancelled = true
    }
  }, [theme])

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.'
    }
    if (!form.projectType) next.projectType = 'Please select a project type.'
    if (!form.message.trim()) next.message = 'Please tell me a bit about the project.'
    return next
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()

    const captchaToken =
      WEB3FORMS_ACCESS_KEY && window.hcaptcha && captchaWidgetId.current !== null
        ? window.hcaptcha.getResponse(captchaWidgetId.current)
        : null
    if (WEB3FORMS_ACCESS_KEY && !captchaToken) {
      validationErrors.captcha = 'Please complete the captcha.'
    }

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error')
      return
    }

    if (!ENDPOINT) {
      setStatus('unconfigured')
      return
    }

    setStatus('submitting')

    try {
      const payload = WEB3FORMS_ACCESS_KEY
        ? {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New project inquiry from ${form.name}`,
            from_name: form.name,
            'h-captcha-response': captchaToken,
            ...form,
          }
        : form

      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setStatus('success')
        setForm(initialForm)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      if (captchaWidgetId.current !== null) window.hcaptcha?.reset(captchaWidgetId.current)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span className="field__error" id="name-error">
              {errors.name}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="field__error" id="email-error">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="company">Company or Website (optional)</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Acme Inc. or yourstore.com"
          value={form.company}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="projectType">Project Type</label>
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? 'projectType-error' : undefined}
          >
            <option value="">Select a project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <span className="field__error" id="projectType-error">
              {errors.projectType}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="budget">Estimated Budget (optional)</label>
          <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
            <option value="">Select a range</option>
            {budgets.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Project Details</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell me about your store, the problem you're trying to solve, and your timeline…"
          value={form.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span className="field__error" id="message-error">
            {errors.message}
          </span>
        )}
      </div>

      {WEB3FORMS_ACCESS_KEY && (
        <div className="field">
          <div ref={captchaRef} />
          {errors.captcha && <span className="field__error">{errors.captcha}</span>}
        </div>
      )}

      <button type="submit" className="btn btn--primary contact-form__submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Submit Project Inquiry'}
      </button>

      {status === 'success' && (
        <p className="form-status form-status--success" role="status">
          Thanks — your project inquiry was sent. I’ll get back to you shortly.
        </p>
      )}

      {status === 'error' && Object.keys(errors).length > 0 && (
        <p className="form-status form-status--error" role="alert">
          Please fix the highlighted fields and try again.
        </p>
      )}

      {status === 'error' && Object.keys(errors).length === 0 && (
        <p className="form-status form-status--error" role="alert">
          Something went wrong sending your message. Please email me directly at{' '}
          <a href={`mailto:${profile.email}`}>{profile.email}</a> instead.
        </p>
      )}

      {status === 'unconfigured' && (
        <p className="form-status form-status--info" role="status">
          This form isn’t connected to a submission service yet — please reach out directly at{' '}
          <a href={`mailto:${profile.email}`}>{profile.email}</a> or via{' '}
          <a href={profile.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          .
        </p>
      )}
    </form>
  )
}

export default ContactForm
