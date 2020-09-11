
const searchRankingButton = document.getElementById('searchRankingButton')

searchRankingButton.addEventListener('click', () => {
  const source = document.getElementById('platformSelect').value + document.getElementById('timeSelect').value
  console.log(source)
  window.location.href = `./${source}`
})
