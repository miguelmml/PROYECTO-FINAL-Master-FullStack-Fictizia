const btnSignUp = document.getElementById('btnSignUp')

btnSignUp.addEventListener('click', () => {
  const name = document.getElementById('signUpName').value
  const email = document.getElementById('signUpEmail').value
  const password = document.getElementById('signUpPassword').value

  const data = {
    name: name,
    email: email,
    password: password
  }

  fetch('http://localhost:3000/users/signUp', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok && response.status === 200) {
        return response.json()
      } else if (response.status === 400) {
        throw new Error()
      }
    })
    .then((data) => {
      console.log(data)
      const token = data.token
      console.log(token, data.user)
      localStorage.setItem('gamesAppToken', token)
      window.location.replace(`/rankings/Allall/${token}`)
    })
    .catch((err) => {
      console.error('error in post -> ', err)
      document.getElementById('infoSignUp').textContent = 'signUp failed! Check authentication credentials'
    })
})
