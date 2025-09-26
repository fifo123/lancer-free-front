const TemplateService = {
  listar() {
    return request(makeApiURL("templates"), { method: "GET" });
  },

  criar(template) {
    return request(makeApiURL("templates"), {
      method: "POST",
      body: JSON.stringify(template),
    });
  },

  atualizar(templateId, template) {
    return request(makeApiURL(`templates/${templateId}`), {
      method: "PUT",
      body: JSON.stringify(template),
    });
  },
};
