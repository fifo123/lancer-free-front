function collapsarConteudo(conteudo, event) {
  const collapsibleContent = document.getElementById(
    `collapsible-content-${conteudo}`,
  );
  collapsibleContent.classList.toggle("collapsed");
  const spanElement = event.target;
  if (collapsibleContent.classList.contains("collapsed")) {
    spanElement.innerHTML = "+";
  } else {
    spanElement.innerHTML = "-";
  }
}
