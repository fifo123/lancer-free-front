const overlayComponent = document.getElementById("overlay");

function abrirOverlay() {
  overlayComponent.style.display = "block";
  document.body.classList.add("modal-open");
}

function fecharModais() {
  if (confirmarDeletarModal.style.display !== "none") {
    return;
  }
  idProjetoEditando = null;
  idTemplateEditando = null;
  addProjectModal.style.display = "none";
  overlayComponent.style.display = "none";
  document.body.classList.remove("modal-open");
  addTemplateModal.style.display = "none";
  botaoDeletarProjeto.style.display = "none";

  const listagemTarefas = document.getElementById("listagem-tarefas-projeto");
  listagemTarefas.innerHTML = "";
  const listagemTarefasTemplate = document.getElementById(
    "listagem-tarefas-template",
  );
  listagemTarefasTemplate.innerHTML = "";

  tarefasProjeto = [];
  addProjectForm.reset();
  addTemplateForm.reset();
  emojiBtn.textContent = getRandomEmoji();
}

overlayComponent.addEventListener("click", () => {
  fecharModais();
});
