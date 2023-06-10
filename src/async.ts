// @ts-nocheck

const BASE_URL = 'https://api.rawg.io/api'

export interface Game {
  id: number
  name: string
  image: string
  released: string
}

export function createGamesList() {
  const games = getGames()

  const fragment = document.createDocumentFragment()

  games.forEach((game) => {
    const div = document.createElement('div')
    div.classList.add('game')

    const h2 = document.createElement('h2')
    const img = document.createElement('img')

    h2.textContent = game.name
    img.src = game.image

    div.appendChild(img)
    div.appendChild(h2)

    fragment.appendChild(div)
  })

  return fragment
}

export function getGames() {
  return get('/games')
}

async function get(url: string): Promise<Game[]> {
  const key = import.meta.env.VITE_RAWG

  return fetch(`${BASE_URL}${url}?key=${key}`)
    .then((res) => res.json())
    .then((data) =>
      data.results.map((game: any) => {
        return {
          id: game.id,
          name: game.name,
          image: game.background_image,
          released: game.released,
        }
      })
    )
}
