// Site da Bica: botão de tema e formulário de contato. Sem biblioteca.
(function () {
  var raiz = document.documentElement;

  function rotuloTema() {
    var b = document.querySelector("[data-botao-tema]");
    if (!b) return;
    var escuro = raiz.getAttribute("data-tema") === "escuro";
    b.textContent = escuro ? "Tema claro" : "Tema escuro";
    b.setAttribute("aria-pressed", escuro ? "true" : "false");
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-botao-tema]");
    if (!b) return;
    var novo = raiz.getAttribute("data-tema") === "escuro" ? "claro" : "escuro";
    if (novo === "escuro") raiz.setAttribute("data-tema", "escuro"); else raiz.removeAttribute("data-tema");
    try { localStorage.setItem("bica-site-tema", novo); } catch (erro) { /* sem armazenamento: vale só nesta página */ }
    rotuloTema();
  });
  rotuloTema();

  // Contato: monta a mensagem e abre o WhatsApp comercial. Nada é guardado no site.
  var form = document.querySelector("[data-form-contato]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var linhas = ["Olá! Quero uma demonstração da Bica.",
        "Nome: " + (d.get("nome") || ""),
        "Loja: " + (d.get("loja") || ""),
        "Cidade: " + (d.get("cidade") || ""),
        "Quantas lojas: " + (d.get("lojas") || "")];
      if (d.get("interesse")) linhas.push("Interesse: " + d.get("interesse"));
      if (d.get("mensagem")) linhas.push(String(d.get("mensagem")));
      var numero = form.getAttribute("data-whatsapp");
      var aviso = form.querySelector("[data-aviso]");
      if (!numero) {
        aviso.hidden = false;
        aviso.textContent = "Protótipo: falta cadastrar o número do WhatsApp comercial. A mensagem ficaria assim: " + linhas.join(" | ");
        return;
      }
      window.open("https://wa.me/" + numero + "?text=" + encodeURIComponent(linhas.join("\n")), "_blank", "noopener");
    });
  }
})();
