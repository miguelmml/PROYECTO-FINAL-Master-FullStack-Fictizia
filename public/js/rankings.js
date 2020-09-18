(() => {
  try {
    const searchRankingButton = document.getElementById('searchRankingButton')

    searchRankingButton.addEventListener('click', () => {
      const source = document.getElementById('platformSelect').value + document.getElementById('timeSelect').value
      const token = localStorage.getItem('gamesAppToken')
      window.location.href = `../${source}/${token}`
    })
  } catch (error) {
    console.error(error)
  }
})();

(() => {
  try {
    const btnAddVideogameList = document.querySelectorAll('.btnAddVideogame')

    btnAddVideogameList.forEach((item) => {
      item.addEventListener('click', (e) => {
        const currentUserEmail = localStorage.getItem('gamesAppUserEmail')
        const divFather = e.target.parentElement.parentElement.parentElement
        const data = {
          email: currentUserEmail,
          videogame: {
            title: divFather.querySelector('.videogameCard__title').textContent,
            rankNumber: divFather.querySelector('.videogameCard__rankNumber--number').textContent,
            img: divFather.querySelector('.videogameCard__image').src,
            platform: divFather.querySelector('.videogameCard__platform').textContent,
            date: divFather.querySelector('.videogameCard__date').textContent,
            description: divFather.querySelector('.videogameCard__description').textContent,
            score: divFather.querySelector('.videogameCard__score--number').textContent
          }
        }

<<<<<<< HEAD
        fetch('https://morning-bastion-27317.herokuapp.com/users/saveGame', {
=======
        const url = `${window.location.protocol}//${window.location.host}/users/saveGame`

        fetch(url, {
>>>>>>> develop
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
            throw new Error('fetch(POST)/response error // response.status != 200 or/and response.ok === false on first .then() at comming-soon add listeners function in rankings.js')
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
