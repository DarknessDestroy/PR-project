import { TelegramIcon, CopyIcon, MaxIcon } from './Icons'

const ContactsSection = ({ ref, copyToClipboard }) => {
  return (
    <section ref={ref} id="contacts" className="min-h-screen bg-marble-100 px-4 py-16 sm:px-6">
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
  )
}

export default ContactsSection
