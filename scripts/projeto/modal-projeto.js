const addProjectForm = document.getElementById("modal-form-projeto");
const addBtn = document.getElementById("addProject");
const botaoDeletarProjeto = document.getElementById("deletar-projeto");
const addProjectModal = document.getElementById("modal-criar-projeto");
const confirmarDeletarModal = document.getElementById(
  "modal-confirmar-deletar-projeto",
);

let idProjetoEditando = null;

let tarefasProjeto = [];

addBtn.addEventListener("click", () => {
  addProjectModal.style.display = "block";
  abrirOverlay();
});

addProjectForm.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();

    const dados = {};
    const tarefasFormMap = new Map();
    new FormData(addProjectForm).forEach((value, key) => {
      const isTarefa = extrairObjetoTarefas(value, key, tarefasFormMap);
      if (isTarefa) return;
      const input = addProjectForm.elements[key];
      if (input.type === "checkbox") {
        dados[key] = input.checked;
        return;
      }
      if (input.type === "number") {
        dados[key] = Number(value);
        return;
      }
      dados[key] = value.trim();
    });
    const emojiSelecionado = document.getElementById("emojiBtn").textContent;
    dados["emoji"] = emojiSelecionado;
    dados["tarefas"] = Array.from(tarefasFormMap.values());

    let mensagemToast = "";
    if (idProjetoEditando) {
      mensagemToast = "Projeto editado com sucesso";
      const projetoAtual = projetos.find((p) => p.id === idProjetoEditando);
      await ProjetoService.atualizar(idProjetoEditando, {
        ...projetoAtual,
        ...dados,
      });
    } else {
      dados["status"] = "pending";
      await ProjetoService.criar(dados);
      mensagemToast = "Projeto criado com sucesso";
    }

    buscarTodosProjetos();
    buscarDashboardDeProjeto();

    Toastify({
      text: mensagemToast,
      style: {
        background:
          "linear-gradient(to right, var(--success), var(--success-dark))",
      },
      close: true,
    }).showToast();
    addProjectForm.reset();

    emojiBtn.textContent = getRandomEmoji();
    tarefasProjeto = [];

    const listagemTarefas = document.getElementById("listagem-tarefas-projeto");
    listagemTarefas.innerHTML = "";
    idProjetoEditando = null;
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

function adicionarNovaTarefa(local) {
  const ultimaTarefa = tarefasProjeto.at(-1) || 0;
  const proximaTarefa = ultimaTarefa + 1;
  tarefasProjeto.push(proximaTarefa);
  const listagemTarefas = document.getElementById(`listagem-tarefas-${local}`);

  const tarefa = document.createElement("div");
  tarefa.style = "display: flex; gap: 5px; margin-top: 5px;";
  tarefa.id = "tarefa-" + proximaTarefa;
  const placeholderAleatorio =
    placeholderPossiveis[
      Math.floor(Math.random() * placeholderPossiveis.length)
    ];
  tarefa.innerHTML = `
      <div class="input-com-span" style="flex: 1">
          <span>
              <input
                  type="checkbox"
                  name="tarefa-${proximaTarefa}-done"
                  id="tarefa-${proximaTarefa}-done"
                  onclick="marcarTafefaComoDone(${proximaTarefa}, event)"
              />
          </span>
          <input
              type="text"
              name="tarefa-${proximaTarefa}-text"
              id="tarefa-${proximaTarefa}-text"
              style="margin-top: 0"
              required
              placeholder="${placeholderAleatorio}"
          />
      </div>
      <button
          type="button"
          class="botao-vermelho"
          onclick="removerTarefa(${proximaTarefa}, event)"
      >
          -
      </button>
    `;

  listagemTarefas.appendChild(tarefa);

  const elementoFormulario = document.getElementById(
    `formulario-adicionar-${local}`,
  );
  if (elementoFormulario) {
    elementoFormulario.scrollTo({
      top: elementoFormulario.scrollHeight,
      behavior: "smooth",
    });
  }

  return proximaTarefa;
}

function removerTarefa(id, event) {
  event.stopPropagation();
  event.preventDefault();
  tarefasProjeto = tarefasProjeto.filter((t) => t !== Number(id));

  const tarefaRetirada = document.getElementById(`tarefa-${id}`);
  tarefaRetirada.parentElement.removeChild(tarefaRetirada);
}

function marcarTafefaComoDone(id, event) {
  const inputTarefa = document.getElementById(`tarefa-${id}-text`);
  if (event.target.checked) {
    inputTarefa.style.textDecoration = "line-through";
  } else {
    inputTarefa.style.textDecoration = "none";
  }
}

const selectTemplate = document.getElementById(
  "select-template-create-project",
);
selectTemplate.addEventListener("change", (e) => {
  const id = e.target.value;
  if (!id) return;
  adicionarTarefasDoTemplate(Number(id), "projeto");
});

function abrirModalEditandoProjeto(idProjeto) {
  const projetoSelecionado = projetos.find((p) => p.id === idProjeto);
  if (!projetoSelecionado) return;
  botaoDeletarProjeto.style.display = "block";
  idProjetoEditando = idProjeto;
  addProjectModal.style.display = "block";
  abrirOverlay();

  addProjectForm.elements["nome"].value = projetoSelecionado.nome;
  addProjectForm.elements["descricao"].value = projetoSelecionado.descricao;
  addProjectForm.elements["valor"].value = projetoSelecionado.valor;
  addProjectForm.elements["template"].value = projetoSelecionado.template;
  adicionarTarefas(projetoSelecionado.tarefas, "projeto");
  emojiBtn.textContent = projetoSelecionado.emoji;
}

function abrirModalConfirmarRemocao() {
  confirmarDeletarModal.style.display = "block";
  overlayComponent.style.zIndex = 101;
}

function fecharModalConfirmacaoRemocao() {
  confirmarDeletarModal.style.display = "none";
  overlayComponent.style.zIndex = 99;
}

async function deletarProjeto() {
  try {
    await ProjetoService.deletar(idProjetoEditando);
    fecharModalConfirmacaoRemocao();
    fecharModais();
    Toastify({
      text: "Projeto excluído com sucesso",
      style: {
        background:
          "linear-gradient(to right, var(--success), var(--success-dark))",
      },
      close: true,
    }).showToast();
    buscarTodosProjetos();
    buscarDashboardDeProjeto();
  } catch (error) {
    Toastify({
      text: error.message,
      style: {
        background:
          "linear-gradient(to right, var(--error), var(--error-dark))",
      },
      close: true,
    }).showToast();
  }
}
