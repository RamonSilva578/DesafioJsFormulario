let arrayTarefas = [];

function removeOneTask(evento) {
  let confirmado = confirm("Deseja remover?");
  if (!confirmado) {
    return;
  }
  const id = evento.target.id;
  arrayTarefas = arrayTarefas.filter(function filtrar(item) {
    return item.id !== id.split("-")[1];
  });
  localStorage.setItem(
    "",
    JSON.stringify({ info: { senha: "" }, tarefas: arrayTarefas })
  );
  atualizarDom(arrayTarefas);
}


function adicionar() {
  const inputAdd = document.getElementById("input-add");
  const tarefa = inputAdd.value;
  if (!tarefa) {
    return;
  }

  const objTarefa = {
    id: Date.now().toString(),
    name: tarefa,
    status: "pendente",
  };

  const credenciais = sessionStorage.getItem("credentials");
  const userLogado = credenciais.split("-")[0];

  
  const tarefasUsuario = JSON.parse(localStorage.getItem(userLogado));
  tarefasUsuario.tarefas.push(objTarefa);

  atualizarLocalStorage(userLogado, tarefasUsuario);

  carregarTarefasDoLocalStorage(userLogado);
  inputAdd.value = ""; 
}
function handleClick(e) {
  if (e.target.nodeName === "BUTTON") {
    if (e.target.classList.contains("remover")) {
      removerTarefa(e);
    } else if (e.target.classList.contains("finalizar")) {
      finalizarTarefa(e);
    }
  }
}
window.addEventListener("load", function () {
  const credenciais = sessionStorage.getItem("credentials");
  const userLogado = credenciais.split("-")[0];

  if (!localStorage.getItem(userLogado)) {
    window.location.href = "index.html";
  }

  carregarTarefasDoLocalStorage(userLogado);

  const divTarefa = document.getElementById("tarefas");
  divTarefa.addEventListener("click", handleClick);
});

let filtroSelecionado = "all";
const select = document.getElementById("select-filtro");
select.addEventListener("change", function atualizar() {
  filtroSelecionado = select.value;
  atualizarDom(arrayTarefas);
})
function atualizarDom(arrayTarefas) {
  const todoList = document.getElementById("tarefas");
  todoList.innerHTML = "";

  for (let i = 0; i < arrayTarefas.length; i++) {
    const tarefa = arrayTarefas[i];
    if (filtroSelecionado === "all" || (filtroSelecionado === "completed" && tarefa.status === "done") || (filtroSelecionado === "uncompleted" && tarefa.status === "pendente")) {
      let divTarefa = document.createElement("div");
      divTarefa.className = tarefa.status + " todo";

      if (tarefa.status === "done") {
        divTarefa.classList.add("completed");
      }

      divTarefa.innerHTML = `<li class="todo-item">${tarefa.name}</li>
        <button id="finalizar-${tarefa.id}" class="finalizar check-btn"><i class="fas fa-check" aria-hidden="true"></i></button>
        <button id="remover-${tarefa.id}" class="remover trash-btn"><i class="fas fa-trash" aria-hidden="true"></i></button>`;

      todoList.appendChild(divTarefa);
    }
  }
}

function removerTarefa(e) {
  const id = e.target.id;
  const credenciais = sessionStorage.getItem("credentials");
  const userLogado = credenciais.split("-")[0];
  const tarefasUsuario = JSON.parse(localStorage.getItem(userLogado));

  
  tarefasUsuario.tarefas = tarefasUsuario.tarefas.filter(function filtrar(item) {
    return item.id !== id.split("-")[1];
  });

  atualizarLocalStorage(userLogado, tarefasUsuario);

  carregarTarefasDoLocalStorage(userLogado);
}
function finalizarTarefa(e) {
  const id = e.target.id;
  const credenciais = sessionStorage.getItem("credentials");
  const userLogado = credenciais.split("-")[0];
  const tarefasUsuario = JSON.parse(localStorage.getItem(userLogado));

  
  const posicaoDaTarefaNoArray = tarefasUsuario.tarefas.findIndex(function encontrar(
    item
  ) {
    return item.id === id.split("-")[1];
  });
  tarefasUsuario.tarefas[posicaoDaTarefaNoArray].status = "done";

  atualizarLocalStorage(userLogado, tarefasUsuario);

  carregarTarefasDoLocalStorage(userLogado);
}
function carregarTarefasDoLocalStorage(userLogado) {
  const tarefasUsuario = JSON.parse(localStorage.getItem(userLogado));
  if (tarefasUsuario) {
    arrayTarefas = tarefasUsuario.tarefas;
    atualizarDom(arrayTarefas);
  }
}

o
function atualizarLocalStorage(userLogado, tarefasUsuario) {
  localStorage.setItem(userLogado, JSON.stringify(tarefasUsuario));
}


function criarConta(nomeUsuario) {
  const tarefasUsuario = { info: { senha: "" }, tarefas: [] };
  localStorage.setItem(nomeUsuario, JSON.stringify(tarefasUsuario));
}


window.addEventListener("load", function () {
  const credenciais = sessionStorage.getItem("credentials");
  const userLogado = credenciais.split("-")[0];

  
  if (!localStorage.getItem(userLogado)) {
    criarConta(userLogado);
  }

  carregarTarefasDoLocalStorage(userLogado);

  const divTarefa = document.getElementById("tarefas");
  divTarefa.addEventListener("click", handleClick);
});