const main = () => {
  return (
    <section className="relative flex flex-1 flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-14 lg:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
        <div className="mb-4 sm:mb-6">
          <img
            src="/Preview.webp"
            alt="Создание сайтов"
            className="marble-hero-glow mx-auto h-[18rem] w-auto max-w-full object-contain sm:h-[22rem] md:h-[26rem]"
          />
        </div>

        <p className="text-xs font-medium tracking-[0.2em] text-marble-500 uppercase sm:text-sm">
          Создание сайтов
        </p>

        <p className="marble-surface mt-4 rounded-full px-5 py-2 font-display text-base font-semibold tracking-wide text-marble-800 sm:text-lg">
          Ваш сайт — на первой строке интернета
        </p>


        <div className="marble-surface-solid mt-8 max-w-xl rounded-2xl p-6 text-center text-sm leading-relaxed text-marble-500 sm:p-8 sm:text-base">
          <p>
            Я специализируюсь на создании сайтов для <strong className="font-medium text-marble-800">
            отелей, кафе, строительства, медицины, турагентств и локального бизнеса.</strong>
          </p>
        </div>

      </div>
    </section>
  )
}

export default main
