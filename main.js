function removeClasse() {
    let remover = document.getElementById('novoCliente');
    remover.classList.remove('invisible');
}

let clearFields = () => {
    let fields = document.querySelectorAll('.campo')
    fields.forEach(field => field.value = "")
}

function fecharNovoCliente() {
    clearFields()

    let fechar = document.getElementById('novoCliente');
    fechar.classList.add('invisible');
}

//CRUD - create, read, update, delete

//CRUD - CREATE
const tempClient = {
    nome: "Fabiana",
    email: "emailteste6@gmail.com",
    telefone: "21912345678",
    cidade: "Rio de Janeiro"
}

let getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [] /*usei ?? para retornar pelo menos um array vazio e não dar erro no push*/
let setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

let createClient = (client) => {
    let dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

//CRUD - READ
let readClient = () => getLocalStorage()

//CRUD - UPDATE 
let updateClient = (index, client) => {
    let dbClient = readClient() //recebe o array lido
    dbClient[index] = client /*na posição index, passa a receber o novo client*/
    setLocalStorage(dbClient)
    //INDEX É A POSIÇÃO DENTRO DO ARRAY!
}

//CRUD - DELETE
let deleteClient = (index) => {
    let dbClient = readClient() //recebe a leitura do array
    dbClient.splice(index, 1) //(exclui o elemento, 1=apenas ele)
    setLocalStorage(dbClient)// atualiza o banco de dados
    //INDEX É A POSIÇÃO DENTRO DO ARRAY!
}

//SALVAR CLIENTE NO LOCALSTORAGE
window.onload = function() {

    let isValidFields = () => {
        return document.getElementById('form').reportValidity()
    }

    let saveClient = () => {
        
        if(isValidFields()) {
            let client = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                cidade: document.getElementById('cidade').value
            }
            createClient(client)
            fecharNovoCliente()
        }
    }
    
    document.getElementById('cadastrar').addEventListener('click', saveClient)
}
