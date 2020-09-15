(() => {
  try {
    const btnAddVideogameList = document.querySelectorAll('.btnAddVideogame')

    btnAddVideogameList.forEach((item) => {
      item.addEventListener('click', (e) => {
        const currentUserEmail = localStorage.getItem('gamesAppUserEmail')

        const data = {
          email: currentUserEmail,
          videogame: {
            title: e.target.parentElement.querySelector('.videogameCard__title').textContent,
            img: e.target.parentElement.querySelector('.videogameCard__image').src,
            platform: e.target.parentElement.querySelector('.videogameCard__platform').textContent,
            date: e.target.parentElement.querySelector('.videogameCard__date').textContent,
            description: e.target.parentElement.querySelector('.videogameCard__description').textContent
          }
        }

        fetch('http://localhost:3000/users/saveGame', {
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
            throw new Error('fetch(POST)/response error // response.status != 200 or/and response.ok === false on first .then() at comming-soon add listeners function in coming-soon.js')
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
