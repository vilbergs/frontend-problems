import './style.css'
import { createGamesList } from './async'
import { createGamesTable } from './generics'

const appRoot = document.getElementById('app') as HTMLElement
const listWrapper = document.createElement('div')
const tableWrapper = document.createElement('div')

const list = await createGamesList()
const table = await createGamesTable()

listWrapper.appendChild(list)
tableWrapper.appendChild(table)

appRoot.appendChild(listWrapper)
appRoot.appendChild(tableWrapper)
