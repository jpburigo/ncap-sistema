# NCAP - Sistema de Gestão de Não Conformidades e Plano de Ação

Aplicativo web responsivo para gestão de não conformidades e planos de ação conforme as normas ISO 9001, ISO 14001 e ISO 45001.

## 🎯 Features

- ✅ Dashboard com métricas em tempo real
- ✅ Registro de não conformidades (ISO 9001, 14001, 45001)
- ✅ Plano de ação com rastreamento de progresso
- ✅ Relatórios e análises por norma
- ✅ Interface responsiva (desktop, tablet, mobile)
- ✅ Autenticação JWT
- ✅ Busca e filtros avançados

## 🚀 Quick Start

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone https://github.com/jpburigo/ncap-sistema.git
cd ncap-sistema

# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Build para Produção

```bash
npm run build
npm run preview
```

## 📦 Stack Técnico

### Frontend
- **React 18** - Framework UI
- **Vite** - Build tool rápido
- **Tailwind CSS** - Styling responsivo
- **React Router** - Navegação
- **Zustand** - State management
- **Axios** - HTTP client
- **React Icons** - Ícones

### Backend (em desenvolvimento)
- **Node.js + Express**
- **PostgreSQL**
- **Prisma ORM**
- **JWT Authentication**

## 📱 Responsividade

O aplicativo é totalmente responsivo:
- **Desktop**: Layout completo com sidebar
- **Tablet**: Navegação adaptada
- **Mobile**: Menu hambúrguer, stack vertical

## 🗂️ Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
├── pages/           # Páginas principais
├── services/        # Serviços API
├── store/           # Zustand stores
├── App.jsx          # Componente raiz
└── index.css        # Estilos globais
```

## 🔐 Autenticação

**Credenciais Demo:**
- Email: `admin@ncap.com.br`
- Senha: `123456`

## 📖 Documentação das Normas

### ISO 9001 - Gestão da Qualidade
Registre não conformidades relacionadas aos processos de qualidade

### ISO 14001 - Gestão Ambiental
Rastreie questões ambientais e ações corretivas

### ISO 45001 - Saúde e Segurança no Trabalho
Gerencie conformidades de segurança ocupacional

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Próximas Funcionalidades

- [ ] Export PDF/Excel
- [ ] Gráficos avançados
- [ ] Notificações
- [ ] Multi-empresa
- [ ] Integrações externas
- [ ] App mobile nativo
- [ ] Auditoria completa
- [ ] Análise de tendências

## 📄 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

**JPBurigo**

---

**Desenvolvido com ❤️ para conformidade e qualidade**
