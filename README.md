#  Autoflex System - Planejamento e Controle de Produção (PCP)

Este é um sistema de controle industrial Full-Stack desenvolvido para gerenciar matérias-primas, produtos finais, fichas técnicas (Engenharia) e simulação de produção com base em estoque e prioridade de valor financeiro. 

Projeto desenvolvido como parte de um desafio técnico, focado em boas práticas, separação de responsabilidades (API REST) e arquitetura baseada em repositórios.

##  Tecnologias Utilizadas

**Front-end:**
* [React](https://reactjs.org/) (via Vite)
* [Redux Toolkit](https://redux-toolkit.js.org/) (Gerenciamento de Estado)
* CSS Nativo / Responsivo

**Back-end:**
* [Java](https://www.java.com/)
* [Quarkus](https://quarkus.io/)
* Hibernate ORM com Panache
* Padrão DTO (Data Transfer Object)

**Banco de Dados:**
* [Oracle DB](https://www.oracle.com/database/) (Docker Container)

## ⚙️ Funcionalidades Implementadas

* **Matérias-Primas:** CRUD completo com controle de quantidade em estoque e SKU.
* **Produtos:** CRUD completo com controle de preço e código do item.
* **Engenharia (Ficha Técnica):** Associação (N:N) entre Produtos e Matérias-Primas, definindo a receita de fabricação.
* **Fábrica (Produção Real):** Execução de ordens de produção com baixa automática no estoque de matérias-primas.
* **Motor de Sugestão:** Algoritmo que analisa o estoque atual e sugere a produção máxima possível, priorizando os produtos de maior valor agregado.

##  Como executar o projeto localmente

### Pré-requisitos
* Node.js (v18+)
* Java JDK (v17 ou 21+)
* Maven
* Docker Desktop

### 1. Subindo o Banco de Dados
```bash
docker run -d -p 1521:1521 --name oracle-db -e ORACLE_PASSWORD=quarkus gvenzl/oracle-xe:slim
