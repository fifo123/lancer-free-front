function calcularPorcentagem(parcial, total) {
  if (total === 0) return 0;
  return (parcial / total) * 100;
}

async function buscarDashboardDeProjeto() {
  try {
    const data = await DashboardService.listar_dashboard_projeto();
    const statusPossiveis = ["done", "progress", "pending"];
    const valorTotal = data.total || 0;
    statusPossiveis.forEach((status) => {
      const valor = data?.status?.[status] || 0;
      const porcentagem = calcularPorcentagem(valor, valorTotal);
      const elementoPorcentagem = document.getElementById(
        `porcentagem-${status}-dashboard`,
      );
      const elementoValor = document.getElementById(
        `valor-${status}-dashboard`,
      );
      elementoPorcentagem.innerHTML = `(${porcentagem.toFixed(2)}%)`;
      const valorFormatado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor);

      elementoValor.innerHTML = valorFormatado;
    });

    const elementoValor = document.getElementById(`valor-total-dashboard`);
    const totalFormatado = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorTotal);
    elementoValor.innerHTML = totalFormatado;
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
buscarDashboardDeProjeto();
