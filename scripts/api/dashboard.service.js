const DashboardService = {
  listar_dashboard_projeto() {
    return request(makeApiURL("dashboard/projetos"), { method: "GET" });
  },
};
