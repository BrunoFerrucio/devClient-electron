import { app, ipcMain } from 'electron'
import PouchDB from 'pouchdb'
import path from 'node:path'
import fs from 'node:fs'
import { Costumer, NewCostumer } from '../shared/types/ipcs'
import { randomUUID } from 'node:crypto'

// Determinar o caminho base para o banco de dados com base no sistema operacional
let dbPath;
if(process.platform === 'darwin'){
  // Caminho para o macos
  dbPath = path.join(app.getPath('appData'), 'devclientes', 'my_db')
}else {
  // Caminho para windows
  dbPath = path.join(app.getPath('userData'), 'my_db')
}

//Verificar e criar o diretório se não existir
const dbDir = path.dirname(dbPath)
if(!fs.existsSync(dbDir)){
  fs.mkdirSync(dbDir, { recursive: true })
}

// Inicializar o db
const db = new PouchDB<Costumer>(dbPath)

// Função para adicionar no banco
async function addCostumer(doc: NewCostumer): Promise<PouchDB.Core.Response | void>{
  const id = randomUUID();
  
  const data: Costumer = {
    ...doc,
    _id: id
  }


  return db.put(data)
        .then(response => response)
        .catch(err => console.error('ERRO AO CADASTRAR ', err))
}

ipcMain.handle('add-costumer', async (event, doc: Costumer) => {
  const result = await addCostumer(doc);
  return result;
})


// Função para buscar todos os clientes
async function fetchAllCustoemers(): Promise<Costumer[]>{
  try{
    const result = await db.allDocs({ include_docs: true })
    return result.rows.map(row => row.doc as Costumer)
  }catch(err){
    console.log('ERRO AO BUSCAR ', err)
    return []
  }
}

ipcMain.handle('fetch-all-costumers', async () => {
  return await fetchAllCustoemers();
})


// Buscar cliente pelo ID
async function fetchCostumerById(docId: string){
  return db.get(docId)
          .then(doc => doc)
          .catch(err => {
            console.log('ERRO AO BUSCAR PELO ID ', err)
            return null;
          })
}

ipcMain.handle('fetch-costumer-id', async (event, docId) => {
  const result = await fetchCostumerById(docId)
  return result;
})

// Deletar um cliente
async function deleteCostumer(docId: string): Promise<PouchDB.Core.Response | null>{
  try{
    const doc = await db.get(docId);
    const result = await db.remove(doc._id, doc._rev)
    return result;
  }catch(err){
    console.log('ERRO AO DELETAR ', err)
    return null
  }
}

ipcMain.handle('delete-costumer', async (event, docId: string): Promise<PouchDB.Core.Response | null> => {
  return await deleteCostumer(docId)
})