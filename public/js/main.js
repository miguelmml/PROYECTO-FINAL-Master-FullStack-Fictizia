// Search button handler
const btnSearch = document.getElementById('search')

btnSearch.addEventListener('click', (e) => {
  e.preventDefault()
  const searchItemId = document.getElementById('searchItem').value

  if (searchItemId !== '') {
    window.location = `../search/${searchItemId}`
  }
})
