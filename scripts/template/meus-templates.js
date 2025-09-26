const gridTemplates = document.getElementById("template-grid");
const templateEmptyMessage = document.getElementById("template-empty-message");

let templates = [];

function createTemplateCard(template) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
        <div class="card-header">
          <h2>${template.nome}</h2>
        </div>
        <div class="card-body">
          <div class="desc" style="text-overflow: ellipisis; overflow: auto; max-height: 60px" title="${template.descricao}">${template.descricao}</div>
        </div>
        <div class="card-footer">
          <button class="botao-branco" onclick="abrirModalEditando(${template.id})">Detalhes</button>
        </div>
      `;

  return card;
}

const selectTemplates = document.getElementsByName("template");

function adicionarTemplatesSelect() {
  gridTemplates.innerHTML = "";
  const options = templates.map((template) => {
    const card = createTemplateCard(template);
    gridTemplates.append(card);
    const option = document.createElement("option");
    option.setAttribute("value", template.id);
    option.innerHTML = template.nome;
    return option;
  });

  selectTemplates.forEach((select) => {
    select.innerHTML = '<option value="none">Nenhum</option>';
    select.append(...options);
  });
}

adicionarTemplatesSelect();

async function buscarTodosTemplates() {
  try {
    const { templates: templatesBuscados } = await TemplateService.listar();
    if (!templatesBuscados.length) return;
    templates = templatesBuscados;

    if (templates.length) {
      templateEmptyMessage.style.display = "none";
    }
    adicionarTemplatesSelect();
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
buscarTodosTemplates();
