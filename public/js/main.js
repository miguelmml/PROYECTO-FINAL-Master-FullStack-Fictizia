
if (document.head.querySelector('title').textContent === 'VideoGamesAPP » home') {
  window.addEventListener('load', checkUser)
}

function checkUser () {
  const token = localStorage.getItem('gamesAppToken')
  if (!token) {
    window.location.replace('/login')
  }
  console.log(`/rankings/Allall/${token}`)
  window.location.replace(`/rankings/Allall/${token}`)
}

const links = document.querySelectorAll('.mainNav__item > a')

links.forEach((item) => {
  console.log(item)
  item.addEventListener('click', (e) => {
    // e.preventDefault()
    const token = localStorage.getItem('gamesAppToken')
    item.href += `/${token}`
    console.log(item.href)
  })
})

// Search button handler
const btnSearch = document.getElementById('search')

btnSearch.addEventListener('click', (e) => {
  e.preventDefault()
  const searchItemId = document.getElementById('searchItem').value

  if (searchItemId !== '') {
    window.location = `../search/${searchItemId}`
  }
})
