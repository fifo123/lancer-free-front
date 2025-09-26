function makeApiURL(url) {
  const API_URL = "http://localhost:8000/";
  return API_URL + url;
}

const defaultHeaders = {
  "Content-Type": "application/json",
};

async function request(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: defaultHeaders,
      ...options,
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Ocorreu um erro inesperado.");
      }
      let message = `Erro ${response.status}`;
      try {
        const errorData = await response.json();
        message = errorData?.message || errorData?.error || message;
      } catch (err) {
        console.error("Erro ao tratar erro da api:", err);
      }
      throw new Error(message);
    }

    try {
      return await response.json();
    } catch (_) {
      return null;
    }
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("API está offline ou inacessível");
    }
    throw err;
  }
}
