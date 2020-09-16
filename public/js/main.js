window.addEventListener('load', checkUser)
window.addEventListener('scroll', scrollFunction)

function checkUser () {
  const user = localStorage.getItem('gamesAppUserName')
  if (!user) {
    window.location.replace('/login')
  }
  if (document.head.querySelector('title').textContent === 'VideoGamesAPP » home') {
    const token = localStorage.getItem('gamesAppToken')
    window.location.replace(`/rankings/Allall/${token}`)
  }
}

(() => {
  try {
    const links = document.querySelectorAll('.mainNav__item > a')

    links.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (item.className === 'myList') {
          const user = localStorage.getItem('gamesAppUserEmail')
          const token = localStorage.getItem('gamesAppToken')
          item.href += `/${user}/${token}`
        } else {
          const token = localStorage.getItem('gamesAppToken')
          item.href += `/${token}`
        }
      })
    })

    document.getElementById('logOut').addEventListener('click', () => {
      localStorage.removeItem('gamesAppToken')
      localStorage.removeItem('gamesAppUserName')
      localStorage.removeItem('gamesAppUserEmail')
      window.location.replace('/')
    })
  } catch (error) {
    console.error(error)
  }
})();

(() => {
  try {
    const name = localStorage.getItem('gamesAppUserName')
    const email = localStorage.getItem('gamesAppUserEmail')
    document.getElementById('currentUser').innerText = name
    document.getElementById('currentUserEmail').innerText = email
  } catch (error) {
    console.error(error)
  }
})()

const goTopButton = document.getElementById('goTopBtn')

goTopButton.addEventListener('click', topFunction)

function scrollFunction () {
  if (document.documentElement.scrollTop > 500) {
    goTopButton.style.display = 'block'
  } else {
    goTopButton.style.display = 'none'
  }
}

function topFunction () {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}
