const HTML = `<!doctype html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>For My Love Girl</title>
  <meta name="description" content="Romantic Cloudflare Worker landing." />
  <style>
    * { box-sizing: border-box; }
    :root {
      --bg: #08070d;
      --card: rgba(255,255,255,.075);
      --card-strong: rgba(255,255,255,.13);
      --line: rgba(255,255,255,.13);
      --text: #fff;
      --muted: rgba(255,255,255,.68);
      --pink: #ff7ab6;
      --violet: #a78bfa;
    }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      min-width: 320px;
      min-height: 100vh;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at 18% 8%, rgba(255,122,182,.26), transparent 28rem),
        radial-gradient(circle at 85% 10%, rgba(167,139,250,.22), transparent 26rem),
        radial-gradient(circle at 50% 100%, rgba(251,113,133,.13), transparent 30rem),
        var(--bg);
    }
    a { color: inherit; text-decoration: none; }
    button { font: inherit; cursor: pointer; }
    .page { min-height: 100vh; overflow-x: hidden; }
    .nav {
      position: sticky;
      top: 0;
      z-index: 20;
      height: 76px;
      padding: 0 max(18px, calc((100vw - 1160px) / 2));
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      border-bottom: 1px solid var(--line);
      background: rgba(8,7,13,.72);
      backdrop-filter: blur(18px);
    }
    .brand { display: inline-flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -.04em; }
    .brand-mark {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 16px;
      background: linear-gradient(135deg, var(--pink), var(--violet));
      box-shadow: 0 18px 50px rgba(255,122,182,.24);
    }
    .nav-links { display: flex; gap: 18px; color: var(--muted); font-size: 14px; }
    .hero {
      width: min(1160px, calc(100% - 32px));
      margin: 0 auto;
      padding: 92px 0 68px;
      display: grid;
      grid-template-columns: 1.05fr .95fr;
      align-items: center;
      gap: 48px;
    }
    .pill, .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #ffd6e9;
      font-size: 13px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .18em;
    }
    .pill {
      margin-bottom: 22px;
      padding: 10px 14px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(255,255,255,.07);
      text-transform: none;
      letter-spacing: 0;
      font-size: 14px;
      color: rgba(255,255,255,.78);
    }
    h1 { margin: 0; max-width: 780px; font-size: clamp(44px, 7vw, 84px); line-height: .92; letter-spacing: -.075em; }
    h2 { letter-spacing: -.055em; }
    .hero-copy p, .section-text, .gift-card p, .card p, .phone-card p, .muted { color: var(--muted); line-height: 1.72; }
    .hero-copy p { max-width: 650px; font-size: 18px; margin: 24px 0 0; }
    .hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 32px; }
    .btn {
      min-height: 52px;
      border: 0;
      border-radius: 18px;
      padding: 14px 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 950;
      transition: transform .18s ease, opacity .18s ease, background .18s ease;
    }
    .btn:hover { transform: translateY(-1px); }
    .btn:disabled { opacity: .68; cursor: wait; transform: none; }
    .primary { color: #120912; background: #fff; box-shadow: 0 20px 70px rgba(255,255,255,.12); }
    .ghost { color: #fff; background: var(--card); border: 1px solid var(--line); }
    .full { width: 100%; margin-top: 18px; }
    .phone-card, .card, .gift-card, .payment-preview, .modal-box {
      border: 1px solid var(--line);
      background: var(--card);
      box-shadow: 0 28px 90px rgba(0,0,0,.32);
      backdrop-filter: blur(16px);
    }
    .phone-card { border-radius: 38px; padding: 28px; min-height: 420px; display: flex; flex-direction: column; justify-content: center; }
    .phone-top { display: flex; justify-content: space-between; color: var(--muted); font-size: 14px; margin-bottom: 28px; }
    .status { color: #bbf7d0; background: rgba(34,197,94,.14); padding: 6px 10px; border-radius: 999px; font-weight: 950; }
    .heart { font-size: 92px; filter: drop-shadow(0 18px 44px rgba(255,122,182,.28)); animation: pulse 1.75s infinite ease-in-out; }
    .phone-card h2 { margin: 8px 0 0; font-size: 38px; }
    .section { width: min(1160px, calc(100% - 32px)); margin: 0 auto; padding: 68px 0; }
    .section-head { text-align: center; margin-bottom: 34px; }
    .section-head h2, .gift-card h2 { margin: 10px 0 0; font-size: clamp(32px, 4vw, 54px); line-height: 1; }
    .section-text { max-width: 720px; margin: 16px auto 0; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
    .card { border-radius: 28px; padding: 26px; }
    .card h3 { margin: 0; font-size: 22px; }
    .gift-card { border-radius: 36px; padding: clamp(26px, 5vw, 54px); text-align: center; }
    .gift-card p { max-width: 760px; margin: 18px auto 28px; }
    .payment-preview { max-width: 650px; margin: 0 auto; padding: 18px; border-radius: 28px; display: grid; gap: 12px; }
    .pay-method { width: 100%; border: 1px solid var(--line); border-radius: 18px; padding: 16px; color: #fff; background: rgba(255,255,255,.055); text-align: left; font-weight: 850; }
    .pay-method.active { border-color: rgba(255,255,255,.35); background: var(--card-strong); }
    .footer { padding: 34px 18px; text-align: center; color: rgba(255,255,255,.45); border-top: 1px solid var(--line); }
    .modal { position: fixed; inset: 0; z-index: 50; display: grid; place-items: center; padding: 16px; background: rgba(0,0,0,.72); backdrop-filter: blur(10px); }
    .modal[hidden] { display: none; }
    .modal-box { width: min(540px, 100%); border-radius: 34px; padding: 24px; position: relative; background: #0b0810; }
    .close { position: absolute; top: 16px; right: 16px; width: 42px; height: 42px; border: 0; border-radius: 999px; color: #fff; background: rgba(255,255,255,.1); font-size: 26px; }
    .modal-methods { display: grid; gap: 10px; margin-top: 18px; }
    .notice { margin-top: 16px; padding: 14px; border-radius: 18px; border: 1px solid rgba(250,204,21,.18); background: rgba(250,204,21,.1); color: #fef3c7; line-height: 1.55; }
    .success { text-align: center; padding: 28px 8px 8px; }
    .success-mark { margin: 0 auto 16px; width: 72px; height: 72px; display: grid; place-items: center; border-radius: 999px; background: rgba(34,197,94,.14); color: #bbf7d0; font-size: 34px; }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
    @media (max-width: 860px) {
      .hero, .grid { grid-template-columns: 1fr; }
      .hero { padding-top: 58px; }
      .nav { height: 68px; }
      .nav-links { display: none; }
      .brand { font-size: 15px; }
    }
  </style>
</head>
<body>
  <main class="page">
    <nav class="nav">
      <a class="brand" href="#top"><span class="brand-mark">❤</span><span>For My Love Girl</span></a>
      <div class="nav-links"><a href="#story">Історія</a><a href="#gift">Подарунок</a><a href="#checkout">Mock checkout</a></div>
    </nav>
    <section id="top" class="hero">
      <div class="hero-copy">
        <div class="pill">Cloudflare Worker · GitHub ready</div>
        <h1>Маленький лендінг для великого почуття</h1>
        <p>Готовий сайт, який можна залити на GitHub і задеплоїти через Wrangler на <strong>for-my-love-girl.black-sci-official.workers.dev</strong>.</p>
        <div class="hero-actions"><a class="btn primary" href="#gift">Подивитись</a><button class="btn ghost" id="openCheckoutTop">Тестова дія</button></div>
      </div>
      <div class="phone-card"><div class="phone-top"><span>Love preview</span><span class="status">online</span></div><div class="heart">❤</div><h2>Для тебе</h2><p>Ніжна сторінка з анімацією, блоками та безпечним mock-flow для тестування.</p></div>
    </section>
    <section id="story" class="section">
      <div class="section-head"><span class="eyebrow">Story</span><h2>Три блоки, які легко змінити під себе</h2></div>
      <div class="grid"><article class="card"><h3>01 · Перше враження</h3><p>Заміни цей текст на свою історію, жарт або персональне повідомлення.</p></article><article class="card"><h3>02 · Теплий момент</h3><p>Додай фото, спогад або будь-який блок, який має бути на лендінгу.</p></article><article class="card"><h3>03 · Фінальна дія</h3><p>Кнопка може вести на подарунок, форму, Telegram або mock checkout.</p></article></div>
    </section>
    <section id="gift" class="section"><div class="gift-card"><span class="eyebrow">Gift</span><h2>Тут може бути твій основний офер</h2><p>Цей блок зроблений як універсальний landing-блок. Його можна переробити під будь-який дизайн.</p><button class="btn primary" id="openCheckoutGift">Відкрити mock checkout</button></div></section>
    <section id="checkout" class="section"><div class="section-head"><span class="eyebrow">Safe mock</span><h2>Умовні платіжки для тестування</h2><p class="section-text">Це тільки імітація. Сайт не збирає номер картки, CVV, OTP, паролі банку або інші чутливі дані.</p></div><div class="payment-preview"><button class="pay-method active" data-method="Card Test Pay">Card Test Pay</button><button class="pay-method" data-method="App Redirect Mock">App Redirect Mock</button><button class="pay-method" data-method="Wallet Sandbox">Wallet Sandbox</button></div></section>
    <footer class="footer"><span>for-my-love-girl · Worker single-file landing · mock only</span></footer>
  </main>
  <div class="modal" id="checkoutModal" hidden><div class="modal-box"><button class="close" id="closeCheckout">×</button><div id="checkoutContent"><span class="eyebrow">Mock checkout</span><h2>Тестова дія</h2><p class="muted" id="selectedMethodText">Обрано: Card Test Pay</p><div class="modal-methods"><button class="pay-method active" data-method="Card Test Pay">Card Test Pay</button><button class="pay-method" data-method="App Redirect Mock">App Redirect Mock</button><button class="pay-method" data-method="Wallet Sandbox">Wallet Sandbox</button></div><div class="notice">У цьому mock-flow не можна вводити реальні карткові або банківські дані.</div><button class="btn primary full" id="continueButton">Продовжити тест</button></div></div></div>
  <script>
    const modal = document.querySelector("#checkoutModal");
    const closeButton = document.querySelector("#closeCheckout");
    const checkoutContent = document.querySelector("#checkoutContent");
    let selectedMethod = "Card Test Pay";
    function openCheckout() { modal.hidden = false; document.body.style.overflow = "hidden"; }
    function closeCheckout() { modal.hidden = true; document.body.style.overflow = ""; resetCheckout(); }
    function resetCheckout() { checkoutContent.innerHTML = `<span class="eyebrow">Mock checkout</span><h2>Тестова дія</h2><p class="muted" id="selectedMethodText">Обрано: ${selectedMethod}</p><div class="modal-methods"><button class="pay-method ${selectedMethod === "Card Test Pay" ? "active" : ""}" data-method="Card Test Pay">Card Test Pay</button><button class="pay-method ${selectedMethod === "App Redirect Mock" ? "active" : ""}" data-method="App Redirect Mock">App Redirect Mock</button><button class="pay-method ${selectedMethod === "Wallet Sandbox" ? "active" : ""}" data-method="Wallet Sandbox">Wallet Sandbox</button></div><div class="notice">У цьому mock-flow не можна вводити реальні карткові або банківські дані.</div><button class="btn primary full" id="continueButton">Продовжити тест</button>`; }
    function setMethod(method) { selectedMethod = method; document.querySelectorAll(".pay-method").forEach((button) => { button.classList.toggle("active", button.dataset.method === selectedMethod); }); document.querySelectorAll("#selectedMethodText").forEach((el) => { el.textContent = `Обрано: ${selectedMethod}`; }); }
    document.addEventListener("click", (event) => { if (event.target.closest("#openCheckoutTop, #openCheckoutGift")) openCheckout(); const methodButton = event.target.closest(".pay-method[data-method]"); if (methodButton) setMethod(methodButton.dataset.method); if (event.target.closest("#continueButton")) { const button = event.target.closest("#continueButton"); button.disabled = true; button.textContent = "Імітуємо дію..."; window.setTimeout(() => { checkoutContent.innerHTML = `<div class="success"><div class="success-mark">✓</div><span class="eyebrow">Success</span><h2>Тест успішний</h2><p class="muted">Реальна оплата або транзакція не проводилась. Це лише sandbox-подія.</p><button class="btn primary full" id="successClose">Закрити</button></div>`; }, 850); } if (event.target.closest("#successClose")) closeCheckout(); });
    closeButton.addEventListener("click", closeCheckout);
    modal.addEventListener("click", (event) => { if (event.target === modal) closeCheckout(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) closeCheckout(); });
  </script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, name: "for-my-love-girl", url: "for-my-love-girl.black-sci-official.workers.dev" });
    }
    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "public, max-age=60"
      }
    });
  }
};
