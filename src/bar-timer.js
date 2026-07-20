/* ════════════════════════════════════════
   БАР-ТАЙМЕР — обратный отсчёт до закрытия свечи (5m)
   ════════════════════════════════════════
   Автономный компонент. Рисует себя сам,
   вешается поверх всего fixed-слоем.
   ════════════════════════════════════════ */

(function () {
  const TIMEFRAME_MS = 300_000; // 5 минут

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function createTimer() {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-bar-timer', '');
    wrapper.className =
      'fixed top-[51px] right-[31px] z-50 pointer-events-none flex items-center gap-2 px-3 py-1.5 ' +
      'rounded-lg bg-black/70 backdrop-blur-md border border-white/10 ' +
      'text-xs font-mono select-none shadow-xl shadow-black/40';

    wrapper.innerHTML =
      '<span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>' +
      '<span class="text-white font-semibold tabular-nums" data-bar-countdown>--</span>';

    document.body.appendChild(wrapper);
    return wrapper;
  }

  function update() {
    const elapsed = Date.now() % TIMEFRAME_MS;
    const remaining = Math.max(0, TIMEFRAME_MS - elapsed);
    const totalSec = Math.ceil(remaining / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    const text = min + ':' + pad(sec);

    const el = document.querySelector('[data-bar-countdown]');
    if (el) el.textContent = text;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function init() {
      createTimer();
      update();
      setInterval(update, 1000);
    });
  } else {
    createTimer();
    update();
    setInterval(update, 1000);
  }
})();
