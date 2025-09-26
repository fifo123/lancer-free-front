const ProjetoService = {
  listar() {
    return request(makeApiURL("projetos"), { method: "GET" });
  },

  criar(projeto) {
    return request(makeApiURL("projetos"), {
      method: "POST",
      body: JSON.stringify(projeto),
    });
  },

  atualizar(projetoId, projeto) {
    return request(makeApiURL(`projetos/${projetoId}`), {
      method: "PUT",
      body: JSON.stringify(projeto),
    });
  },

  deletar(projetoId) {
    return request(makeApiURL(`projetos/${projetoId}`), {
      method: "DELETE",
    });
  },
};
