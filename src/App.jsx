import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import PageTransition from './components/layout/PageTransition'
import CustomCursor from './components/animations/CustomCursor'
import BackToTop from './components/common/BackToTop'
import Home from './pages/Home/Home'
import { initAnalytics, trackPageView } from './lib/analytics'

// Home loads eagerly (the most common entry point); every other route is
// split into its own chunk so a visit only downloads the page it needs.
const About = lazy(() => import('./pages/About/About'))
const Services = lazy(() => import('./pages/Services/Services'))
const Projects = lazy(() => import('./pages/Projects/Projects'))
const CaseStudy = lazy(() => import('./pages/CaseStudy/CaseStudy'))
const Blog = lazy(() => import('./pages/Blog/Blog'))
const Article = lazy(() => import('./pages/Article/Article'))
const Contact = lazy(() => import('./pages/Contact/Contact'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

function App() {
  const location = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <CustomCursor />
      <Header />
      <PageTransition>
        <main id="main">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/work" element={<Projects />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="/insights" element={<Blog />} />
              <Route path="/insights/:slug" element={<Article />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </PageTransition>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
