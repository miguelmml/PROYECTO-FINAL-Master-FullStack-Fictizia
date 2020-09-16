(() => {
  try {
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
          }
          throw new Error('fetch(POST)/response error // response.status != 200 or/and response.ok === false on first .then() at myList add listeners function in login.js')
        })
        .then((data) => {
          const token = data.token
          const name = data.user.name
          const email = data.user.email

          localStorage.setItem('gamesAppToken', token)
          localStorage.setItem('gamesAppUserName', name)
          localStorage.setItem('gamesAppUserEmail', email)

          window.location.replace(`/rankings/Allall/${token}`)
        })
        .catch((err) => {
          console.error(err)
          document.getElementById('infoLogin').textContent = 'Login failed! Check authentication credentials'
        })
    })
  } catch (error) {
    console.error(error)
  }
})()
