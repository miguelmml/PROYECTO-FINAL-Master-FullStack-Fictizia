(() => {
  try {
    const btnDeleteVideogameList = document.querySelectorAll('.btnDeleteVideogame')

    btnDeleteVideogameList.forEach((item) => {
      item.addEventListener('click', (e) => {
        const currentUserEmail = localStorage.getItem('gamesAppUserEmail')

        const data = {
          email: currentUserEmail,
          videogameName: e.target.parentElement.querySelector('.videogameCard__title').textContent,
          videogamePlatform: e.target.parentElement.querySelector('.videogameCard__platform').textContent
        }

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
})();

(() => {
  const arr = document.querySelectorAll('.videogameCard__circleWrapper')

  arr.forEach((item) => {
    item.addEventListener('mouseover', (e) => {
      item.parentElement.querySelector('.videogameCard__descriptionWrapper').style.left = '0'
      item.parentElement.querySelector('.videogameCard__statsWrapper').style.right = '0'
    })
    item.addEventListener('mouseout', (e) => {
      item.parentElement.querySelector('.videogameCard__descriptionWrapper').style.left = '-100%'
      item.parentElement.querySelector('.videogameCard__statsWrapper').style.right = '-100%'
    })
  })
})()
