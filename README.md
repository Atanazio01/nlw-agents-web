# NLW Agents

Projeto desenvolvido durante o evento NLW da Rocketseat para criação de uma aplicação web com React e TypeScript.

## 🚀 Tecnologias

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento client-side
- **TanStack Query** - Gerenciamento de estado servidor
- **Tailwind CSS 4** - Framework CSS utility-first
- **Radix UI** - Componentes primitivos acessíveis
- **Lucide React** - Ícones SVG

## 🎨 Padrões e Arquitetura

- **Componentes funcionais** com React Hooks
- **Design System** baseado em Shadcn/ui
- **Utility-first CSS** com Tailwind
- **Type-safe** routing com React Router
- **Server state** management com TanStack Query
- **Class Variance Authority** para variantes de componentes

## 📦 Estrutura do Projeto

```
src/
├── app.tsx              # Configuração de rotas e providers
├── main.tsx             # Entry point da aplicação
├── index.css            # Estilos globais e tema
├── components/
│   └── ui/              # Componentes reutilizáveis
├── lib/
│   └── utils.ts         # Utilitários e helpers
└── pages/               # Páginas da aplicação
```

## ⚙️ Setup

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd nlw-agents-web
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:5173](http://localhost:5173) no navegador

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção

## 🛠️ Configurações

### Tailwind CSS 4

O projeto utiliza Tailwind CSS 4 com configuração inline e tema customizado. As variáveis CSS são definidas em [`src/index.css`](src/index.css) com suporte a modo escuro.

### TypeScript

Configuração estrita do TypeScript com path mapping (`@/*`) para importações absolutas.

### Biome

Linter e formatter configurado com regras do Ultracite para garantir qualidade de código.

## 🎯 Funcionalidades

- ✅ Roteamento SPA
- ✅ Consumo de API REST
- ✅ Tema escuro/claro
- ✅ Componentes acessíveis
- ✅ Design responsivo
- ✅ Type safety completo

---

Desenvolvido com ❤️ durante o NLW da Rocketseat
