
const btnLogin = document.getElementById('btnLogin')

btnLogin.addEventListener('click', () => {
  const email = document.getElementById('loginEmail').value
  const password = document.getElementById('loginPassword').value

  const data = {
    email: email,
    password: password
  }

  fetch('http://localhost:3000/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok && response.status === 200) {
        return response.json()
      } else if (response.status === 401) {
        throw new Error()
      }
    })
    .then((data) => {
      const token = data.token
      console.log(token)
      localStorage.setItem('gamesAppToken', token)
      window.location.replace(`/rankings/Allall/${token}`)
    })
    .catch((err) => {
      console.error('error in post -> ', err)
      document.getElementById('infoLogin').textContent = 'Login failed! Check authentication credentials'
    })
})
