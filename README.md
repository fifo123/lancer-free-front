# 🗡️ - Lancer Free Frontend

Interface web para o Lancer Free, um sistema de gerenciamento de projetos para freelancers. Esta aplicação consome a [Lancer Free API](<https://github.com/fifo123/lancer-free-api>) para fornecer uma experiência de usuário rica e interativa.

## ✨ Funcionalidades

- **Projetos**: Crie, liste, atualize e delete projetos através de uma interface intuitiva.
- **Tarefas**: Gerencie as tarefas associadas a cada projeto.
- **Templates**: Crie e gerencie templates para agilizar a criação de novos projetos.
- **Dashboard**: Visualize dados e estatísticas sobre os projetos, como o somatório de valores por status.

## 🛠️ Tecnologias

- **HTML5**: Linguagem de marcação para a estrutura das páginas.
- **CSS3**: Estilização para criar um design moderno e responsivo.
- **JavaScript (Vanilla)**: Lógica de interação e manipulação do DOM.
- **Consumo de API REST**: Comunicação com o backend para obter e manipular dados.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Um navegador web moderno (Chrome, Firefox, Safari, etc.).
- A **[Lancer Free API](<https://github.com/fifo123/lancer-free-api>)** deve estar rodando localmente (geralmente em `http://localhost:8000`).

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/fifo123/lancer-free-front.git lancer-free-front
    cd lancer-free-front
    ```

2.  **Abra o projeto no navegador:**

    A maneira mais simples é abrir o arquivo `index.html` diretamente no seu navegador.

## 📂 Estrutura do Projeto

```
/
├── index.html              # Ponto de entrada da aplicação
├── README.md
├── img/                    # Imagens e favicons
├── scripts/
│   ├── api/                # Lógica para comunicação com a API
│   ├── collapse/           # Componente de collapse/acordeão
│   ├── dashboard/          # Scripts da página de dashboard
│   ├── emoji-select/       # Componente de seleção de emoji
│   ├── modal/              # Componente de modal
│   ├── projeto/            # Scripts relacionados a projetos
│   ├── tarefa/             # Scripts relacionados a tarefas
│   └── template/           # Scripts relacionados a templates
└── styles/
    ├── common/             # Estilos globais e de componentes
    ├── dashboard/          # Estilos específicos do dashboard
    └── projeto/            # Estilos específicos de projetos
```
