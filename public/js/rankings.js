const searchRankingButton = document.getElementById('searchRankingButton')

searchRankingButton.addEventListener('click', () => {
  const source = document.getElementById('platformSelect').value + document.getElementById('timeSelect').value
  const token = localStorage.getItem('gamesAppToken')
  window.location.href = `../${source}/${token}`
})
