import { Link } from 'react-router-dom'

export function Home(){

  async function handleAdd(){
    const response = await window.api.fetchAllCustomers();
    console.log(response);
  }

  async function handleDeleteCustomer(){
    const docId = "e15a8b7d-188c-4a1d-af47-e484f3de074a"

    const response = await window.api.deleteCustomer(docId)
    console.log(response);
  }

  async function handleCustomerById(){
    const docId = "e15a8b7d-188c-4a1d-af47-e484f3de074a"

    const response = await window.api.fetchCustomerById(docId)
    console.log(response);
  }

  return (
    <div>
      <h1>Página HOME!!!</h1>
      <h3>TESTEEEEEEE</h3>
      <Link to="/create">Ir para pagina create</Link>
      <br/><br/>

      <button onClick={handleAdd}>
        BUSCAR USUARIOS
      </button>
      <br/> <br/>

      <button onClick={handleCustomerById}>
        BUSCAR USUARIO PELO ID
      </button>

      <br/> <br/>

      <button onClick={handleDeleteCustomer}>
        DELETAR CLIENTE
      </button>
    </div>
  )
}