(() => {
  try {
    const btnDeleteVideogameList = document.querySelectorAll('.btnDeleteVideogame')

    btnDeleteVideogameList.forEach((item) => {
      item.addEventListener('click', (e) => {
        // eslint-disable-next-line no-undef
        const currentUserEmail = localStorage.getItem('gamesAppUserEmail')

        const data = {
          email: currentUserEmail,
          videogameName: e.target.parentElement.querySelector('.videogameCard__title').textContent,
          videogamePlatform: e.target.parentElement.querySelector('.videogameCard__platform').textContent
        }

        // eslint-disable-next-line no-undef
        fetch('http://localhost:3000/users/deleteGame', {
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
            throw new Error('fetch(POST)/response error // response.status != 200 or/and response.ok === false on first .then() at account add listeners function in account.js')
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
