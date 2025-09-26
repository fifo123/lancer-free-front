function adicionarTarefasDoTemplate(id, local) {
  const templateSelecionado = templates.find((t) => t.id === id);
  if (!templateSelecionado) return;

  adicionarTarefas(templateSelecionado.tarefas, local);
}

function adicionarTarefas(tarefas, local) {
  const tarefasAtuaisSet = new Set();
  tarefasProjeto.forEach((t) => {
    const textoTarefa = document.getElementById(`tarefa-${t}-text`).value;
    tarefasAtuaisSet.add(textoTarefa);
  });

  tarefas.forEach((tarefa) => {
    if (tarefasAtuaisSet.has(tarefa.nome)) return;

    const tarefaAdicionada = adicionarNovaTarefa(local);
    const inputTarefa = document.getElementById(
      `tarefa-${tarefaAdicionada}-text`,
    );
    inputTarefa.value = tarefa.nome;
    const checkBoxTarefa = document.getElementById(
      `tarefa-${tarefaAdicionada}-done`,
    );
    checkBoxTarefa.checked = !!tarefa.feito;
    marcarTafefaComoDone(tarefaAdicionada, {
      target: {
        checked: tarefa.feito,
      },
    });
  });
}

function extrairObjetoTarefas(value, key, mapper) {
  if (!key.startsWith("tarefa-")) return;

  const spliter = key.split("tarefa-")[1];
  const [id, tipo] = spliter.split("-");
  const tarefaNoMap = mapper.get(id) || {
    feito: false,
  };
  if (tipo === "text") {
    tarefaNoMap["nome"] = value.trim();
  }
  if (tipo === "done") {
    tarefaNoMap["feito"] = !!value;
  }
  mapper.set(id, tarefaNoMap);

  return true;
}
