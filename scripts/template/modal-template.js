const addTemplate = document.getElementById("add-template");

const addTemplateModal = document.getElementById("modal-criar-template");
const addTemplateForm = document.getElementById("adicionar-template");

addTemplate.addEventListener("click", () => {
  addTemplateModal.style.display = "block";
  abrirOverlay();
});

addTemplateForm.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();

    const dados = {};
    const tarefasFormMap = new Map();
    new FormData(addTemplateForm).forEach((value, key) => {
      const isTarefa = extrairObjetoTarefas(value, key, tarefasFormMap);
      if (isTarefa) return;
      dados[key] = value.trim();
    });
    dados["tarefas"] = Array.from(tarefasFormMap.values());

    let mensagemToast = "";
    if (idTemplateEditando) {
      const templateAtual = templates.find((t) => t.id === idTemplateEditando);
      await TemplateService.atualizar(idTemplateEditando, {
        ...templateAtual,
        ...dados,
      });
      mensagemToast = "Template editado com sucesso";
    } else {
      await TemplateService.criar(dados);
      mensagemToast = "Template criado com sucesso";
    }

    buscarTodosTemplates();

    Toastify({
      text: mensagemToast,
      style: {
        background:
          "linear-gradient(to right, var(--success), var(--success-dark))",
      },
      close: true,
    }).showToast();
    addTemplateForm.reset();

    const listagemTarefas = document.getElementById("listagem-tarefas-projeto");
    listagemTarefas.innerHTML = "";
    idTemplateEditando = null;
    fecharModais();
  } catch (err) {
    Toastify({
      text: err.message,
      style: {
        background:
          "linear-gradient(to right, var(--error), var(--error-dark))",
      },
      close: true,
    }).showToast();
  }
});

let idTemplateEditando = null;

function abrirModalEditando(idTemplate) {
  const templateSelecionado = templates.find((t) => t.id === idTemplate);
  if (!templateSelecionado) return;
  idTemplateEditando = idTemplate;
  addTemplateModal.style.display = "block";
  abrirOverlay();

  addTemplateForm.elements["nome"].value = templateSelecionado.nome;
  addTemplateForm.elements["descricao"].value = templateSelecionado.descricao;
  adicionarTarefasDoTemplate(idTemplate, "template");
}
