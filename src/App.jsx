import { useRef, useState, useEffect } from 'react'
import Hero_Section from './components/Information.jsx'

const TelegramIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

const MaxIcon = () => (
  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
    ✓
  </span>
)

const PhoneIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
)

const CopyIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
)

const Toast = ({ message, visible }) => {
  if (!visible) return null
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-marble-900 px-6 py-3 text-white shadow-lg transition-all duration-300">
      {message}
    </div>
  )
}

const App = () => {
  const [authModal, setAuthModal] = useState(null)
  const [user, setUser] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)

  const openAuth = (mode) => setAuthModal(mode)
  const closeAuth = () => setAuthModal(null)
  const handleLogout = () => {
    setUser(null)
    setAuthModal(null)
  }

  // Рефы для секций
  const homeRef = useRef(null)
  const examplesRef = useRef(null)
  const contactsRef = useRef(null)

  // Функция плавной прокрутки
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Функция показа тоста
  const showToast = (message) => {
    setToastMessage(message)
    setToastVisible(true)
    setTimeout(() => {
      setToastVisible(false)
    }, 2500)
  }

  // Функция копирования текста в буфер обмена
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Номер скопирован!')
    }).catch(err => {
      console.error('Ошибка копирования:', err)
      showToast('Не удалось скопировать номер')
    })
  }

  // Обработчик скролла для появления/скрытия хедера
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Если скроллим вниз и панель видна, скрываем
      if (currentScrollY > lastScrollY.current && isHeaderVisible && currentScrollY > 50) {
        setIsHeaderVisible(false)
      }
      // Если скроллим вверх и панель скрыта, показываем
      else if (currentScrollY < lastScrollY.current && !isHeaderVisible) {
        setIsHeaderVisible(true)
      }
      // Если достигли верха, всегда показываем
      else if (currentScrollY < 10 && !isHeaderVisible) {
        setIsHeaderVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHeaderVisible])

  return (
    <div className="flex min-h-screen flex-col text-marble-900">
      <header
        className={`marble-surface border-b border-white/60 fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="font-display truncate text-base font-semibold tracking-tight text-marble-900 sm:text-lg">
              Создание сайтов
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

      {/* Отступ сверху, чтобы контент не перекрывался хедером */}
      <div className="h-14" />

      <main className="flex flex-1 flex-col">
        {/* Секция «Главная» */}
        <div ref={homeRef}>
          <Hero_Section />
        </div>

        {/* Секция «Примеры работ» */}
        <section ref={examplesRef} id="examples" className="min-h-screen bg-marble-50 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-semibold text-marble-900 sm:text-4xl">
              Примеры работ
            </h2>
            <p className="mt-4 text-marble-500">
              Здесь будут представлены наши проекты. Скоро добавим портфолио.
            </p>
          </div>
        </section>

        {/* Секция «Контакты» */}
        <section ref={contactsRef} id="contacts" className="min-h-screen bg-marble-100 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-semibold text-marble-900 sm:text-4xl">
              Контакты
            </h2>
            <p className="mt-4 text-marble-500">
              Свяжитесь с нами любым удобным способом.
            </p>
            <div className="mt-8 flex w-full max-w-sm flex-col gap-3 mx-auto">
              <button
                onClick={() => copyToClipboard('+7 978 959 83 25')}
                className="marble-btn-primary flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium sm:text-base"
              >
                <CopyIcon />
                +7 (978) 959-83-25 (Иван)
              </button>
              <a
                href="https://t.me/DesrtroyDark"
                target="_blank"
                rel="noopener noreferrer"
                className="marble-btn-primary flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium sm:text-base"
              >
                <TelegramIcon />
                Написать в Telegram
              </a>

              <button
                type="button"
                disabled
                title="Скоро будет доступно"
                aria-disabled="true"
                className="marble-btn-ghost flex cursor-not-allowed items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium sm:text-base"
              >
                <MaxIcon />
                Написать в MAX
                <span className="text-xs font-normal">(скоро)</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  )
}

export default App
