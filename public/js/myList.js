(() => {
  try {
    const btnDeleteVideogameList = document.querySelectorAll('.btnDeleteVideogame')

    btnDeleteVideogameList.forEach((item) => {
      item.addEventListener('click', (e) => {
        const currentUserEmail = localStorage.getItem('gamesAppUserEmail')

        const data = {
          email: currentUserEmail,
          videogameName: e.target.parentElement.parentElement.parentElement.querySelector('.videogameCard__title').textContent,
          videogamePlatform: e.target.parentElement.parentElement.parentElement.querySelector('.videogameCard__platform').textContent
        }

        const url = `${window.location.protocol}//${window.location.host}/users/deleteGame`

        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            if (response.status === 200 && response.ok) {
              return
            }
            throw new Error('fetch(POST)/response error // response.status != 200 or/and response.ok === false on first .then() at myList add listeners function in myList.js')
          })
          .then(() => {
            window.location.reload()
          })
          .catch((err) => {
            console.error(err)
          })
      })
    })
  } catch (error) {
    console.error(error)
  }
})()
