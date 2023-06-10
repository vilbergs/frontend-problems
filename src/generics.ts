import { Game, getGames } from './async'

interface Column<T> {
  header?: string
  field: keyof T
}
type Columns<T> = Column<T>[]

export async function createGamesTable() {
  const games = await getGames()

  return createTable<Game>(
    [
      { field: 'id' },
      { field: 'name' },
      { header: 'Release Date', field: 'released' },
    ],
    games
  )
}

function createTable<T extends Record<string, any>>(
  columns: Columns<T>,
  rows: T[]
) {
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')

  const theadTr = document.createElement('tr')
  thead.appendChild(theadTr)

  columns.forEach((column) => {
    const th = document.createElement('th')
    th.textContent = column.header ?? column.field.toString()
    theadTr.appendChild(th)
  })

  rows.map((row) => {
    const tr = document.createElement('tr')

    columns.map((column) => {
      const td = document.createElement('td')
      td.textContent = row[column.field].toString()
      tr.appendChild(td)
    })

    tbody.appendChild(tr)
  })

  table.appendChild(thead)
  table.appendChild(tbody)

  return table
}
