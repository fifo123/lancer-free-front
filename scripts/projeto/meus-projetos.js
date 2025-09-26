const gridProjects = document.getElementById("projeto-grid");
const projetoEmptyMessage = document.getElementById("projeto-empty-message");

let projetos = [];

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "card";

  const valorFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(project.valor);

  let quantidadeDeTarefasFeitas = 0;
  (project.tarefas || []).forEach((t) => {
    if (t.feito) quantidadeDeTarefasFeitas++;
  });

  card.innerHTML = `
        <div class="card-header">
          <span class="emoji">${project.emoji}</span>
          <h2>${project.nome}</h2>
          <select class="status-select ${project.status}">
            <option value="done" ${project.status === "done" ? "selected" : ""}>Concluído</option>
            <option value="progress" ${project.status === "progress" ? "selected" : ""}>Em andamento</option>
            <option value="pending" ${project.status === "pending" ? "selected" : ""}>Pendente</option>
          </select>
        </div>
        <div class="card-body">
          <div class="value">${valorFormatado}</div>
          <div class="desc" style="text-overflow: ellipisis; overflow: hidden;" title="${project.descricao}">${project.descricao}</div>
        </div>
        <div class="card-footer">
          <div class="desc" title="${project.descricao}">Tarefas feitas: ${quantidadeDeTarefasFeitas}/${project.tarefas?.length || 0}</div>
          <button class="botao-branco" onclick="abrirModalEditandoProjeto(${project.id})">Detalhes</button>
        </div>
      `;

  const statusSelect = card.querySelector(".status-select");
  statusSelect.addEventListener("change", async (e) => {
    statusSelect.className = "status-select " + e.target.value;
    try {
      await ProjetoService.atualizar(project.id, {
        ...project,
        status: e.target.value,
      });
      Toastify({
        text: "Status do projeto atualizado com sucesso",
        style: {
          background:
            "linear-gradient(to right, var(--success), var(--success-dark))",
        },
        close: true,
      }).showToast();
      buscarDashboardDeProjeto();
      buscarTodosProjetos();
    } catch (e) {
      console.error(error);
      Toastify({
        text: error.message,
        style: {
          background:
            "linear-gradient(to right, var(--error), var(--error-dark))",
        },
        close: true,
      }).showToast();
    }
  });

  return card;
}

async function buscarTodosProjetos() {
  try {
    const { projetos: projetosBuscados } = await ProjetoService.listar();
    projetos = projetosBuscados;
    if (projetosBuscados.length) {
      projetoEmptyMessage.style.display = "none";
    } else {
      projetoEmptyMessage.style.display = "block";
    }

    adicionarProjetosListagem();
  } catch (error) {
    console.error(error);
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
buscarTodosProjetos();

function adicionarProjetosListagem() {
  gridProjects.innerHTML = "";
  projetos.forEach((projeto) => {
    const card = createProjectCard(projeto);
    gridProjects.append(card);
  });
}

adicionarProjetosListagem();
