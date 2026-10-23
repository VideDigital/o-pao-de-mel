(() => {
  "use strict";
  const cfg = window.SITE_CONFIG || {};
  const paramsToPass = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];
  const menu = document.getElementById("menu");
  const menuToggle = document.getElementById("menu-toggle");
  const notice = document.getElementById("notice-dialog");
  const video = document.getElementById("video-dialog");

  function track(eventName, detail = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...detail });
    // Eventos locais preparados para futuro GTM/Meta; NÃO há pixels conectados.
  }
  function notify(title, message) {
    if (!notice || !notice.showModal) { window.alert(message); return; }
    document.getElementById("notice-title").textContent = title;
    document.getElementById("notice-text").textContent = message;
    notice.showModal();
  }
  function addCampaignParams(value) {
    const url = new URL(value);
    if (cfg.preserveCampaignParams === false) return url.toString();
    const inbound = new URLSearchParams(window.location.search);
    for (const name of paramsToPass) {
      if (inbound.has(name) && !url.searchParams.has(name)) {
        url.searchParams.set(name, inbound.get(name));
      }
    }
    return url.toString();
  }
  function validCheckoutUrl(value) {
    try {
      const u = new URL(value);
      return u.protocol === "https:" && (u.hostname === "kiwify.com.br" || u.hostname.endsWith(".kiwify.com.br") || u.hostname === "kiwify.app" || u.hostname.endsWith(".kiwify.app"));
    } catch { return false; }
  }
  function openCheckout() {
    if (!validCheckoutUrl(cfg.checkoutUrl)) {
      notify("Inscrição em preparação", "Precisamos adicionar e validar o checkout oficial do curso na Kiwify antes de ativar esta opção.");
      return;
    }
    track("course_checkout_click", { location: "landing_page", destination: "kiwify" });
    window.open(addCampaignParams(cfg.checkoutUrl), "_blank", "noopener,noreferrer");
  }
  function openWhatsApp() {
    const phone = String(cfg.whatsappNumber || "").replace(/\D/g, "");
    if (phone.length < 12 || phone.length > 15) {
      notify("Atendimento em preparação", "O WhatsApp oficial será conectado antes da publicação do site.");
      return;
    }
    track("course_whatsapp_click", { location: "landing_page", destination: "whatsapp" });
    const msg = cfg.whatsappMessage || "Olá! Gostaria de saber mais sobre o curso Ô Pão de Mel.";
    window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(msg), "_blank", "noopener,noreferrer");
  }
  function getVideoEmbed(value) {
    try {
      const url = new URL(value);
      if (url.protocol !== "https:") return null;
      let id = "";
      if (url.hostname === "youtu.be") id = url.pathname.slice(1);
      if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") id = url.searchParams.get("v") || "";
      if (/^[A-Za-z0-9_-]{11}$/.test(id)) {
        const iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1";
        iframe.title = "Apresentação do curso Ô Pão de Mel";
        iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        return iframe;
      }
      if (url.pathname.match(/\.(mp4|webm)$/i)) {
        const el = document.createElement("video");
        el.controls = true;
        el.autoplay = true;
        el.playsInline = true;
        el.src = url.toString();
        return el;
      }
    } catch {}
    return null;
  }
  menuToggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
  }));
  document.querySelectorAll("[data-action]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      if (el.dataset.action === "checkout") openCheckout();
      if (el.dataset.action === "whatsapp") openWhatsApp();
    });
  });
  document.getElementById("video-button")?.addEventListener("click", () => {
    const element = getVideoEmbed(cfg.videoUrl || "");
    if (!element) {
      notify("Apresentação em preparação", "O vídeo oficial ainda não foi fornecido. Assim que estiver disponível, poderá ser reproduzido aqui.");
      return;
    }
    document.getElementById("video-frame").replaceChildren(element);
    video.showModal();
    track("course_video_play", { location: "landing_page" });
  });
  document.querySelectorAll(".dialog-close").forEach(el => el.addEventListener("click", () => el.closest("dialog")?.close()));
  document.querySelector(".dialog-ok")?.addEventListener("click", () => notice.close());
  for (const dialog of [notice, video]) {
    dialog?.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  }
  video?.addEventListener("close", () => document.getElementById("video-frame").replaceChildren());
})();