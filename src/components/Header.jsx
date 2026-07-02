import { useEffect, useRef, useState } from 'react'

const Header = ({ scrollToSection, homeRef, examplesRef, contactsRef }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && isHeaderVisible && currentScrollY > 50) {
        setIsHeaderVisible(false)
      } else if (currentScrollY < lastScrollY.current && !isHeaderVisible) {
        setIsHeaderVisible(true)
      } else if (currentScrollY < 10 && !isHeaderVisible) {
        setIsHeaderVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHeaderVisible])

  return (
    <header
      className={`marble-surface border-b border-white/60 fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-display truncate text-base font-semibold tracking-tight text-marble-900 sm:text-lg">
            WebCreater
          </span>
          <span className="hidden h-5 w-px bg-marble-300 sm:block" aria-hidden />
          <button
            onClick={() => scrollToSection(homeRef)}
            className="font-display truncate text-base font-semibold tracking-tight text-marble-900 sm:text-lg hover:text-marble-500 transition-colors"
          >
            Главная
          </button>
          <span className="hidden h-5 w-px bg-marble-300 sm:block" aria-hidden />
          <button
            onClick={() => scrollToSection(examplesRef)}
            className="font-display truncate text-base font-semibold tracking-tight text-marble-900 sm:text-lg hover:text-marble-500 transition-colors"
          >
            Примеры работ
          </button>
          <span className="hidden h-5 w-px bg-marble-300 sm:block" aria-hidden />
          <button
            onClick={() => scrollToSection(contactsRef)}
            className="font-display truncate text-base font-semibold tracking-tight text-marble-900 sm:text-lg hover:text-marble-500 transition-colors"
          >
            Контакты
          </button>
          <span className="hidden h-5 w-px bg-marble-300 sm:block" aria-hidden />
        </div>
      </div>
    </header>
  )
}

export default Header
