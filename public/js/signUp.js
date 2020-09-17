(() => {
  try {
    const btnSignUp = document.getElementById('btnSignUp')

    btnSignUp.addEventListener('click', () => {
      const name = document.getElementById('signUpName').value
      const email = document.getElementById('signUpEmail').value
      const password = document.getElementById('signUpPassword').value
      const passwordCheck = document.getElementById('signUpPassword__check').value

      if (/^[A-Za-z]+[A-Za-z0-9-_]*@\w+\.[A-Za-z]+\.*[A-Za-z]*\.*[A-Za-z]*/.test(email)) {
        if (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password) && password === passwordCheck) {
          postToSignUp(name, email, password)
        } else {
          document.getElementById('infoSignUp').textContent = '🚫 Invalid password or passwords do not match 🚫'
        }
      } else {
        document.getElementById('infoSignUp').textContent = '🚫 Invalid Email 🚫'
      }
    })
  } catch (error) {
    console.error(error)
  }
})()

function postToSignUp (name, email, password) {
  const data = {
    name: name,
    email: email,
    password: password
  }

  fetch('https://morning-bastion-27317.herokuapp.com/users/signUp', {
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
      throw new Error('fetch(POST)/response error // response.status != 200 or/and response.ok === false on first .then() at myList add listeners function in signUp.js')
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
      document.getElementById('infoSignUp').textContent = 'Sign Up failed! User or email already exists'
    })
}

(() => {
  const signUpInputList = document.querySelectorAll('.signUpInput')

  signUpInputList.forEach(item => {
    item.addEventListener('focus', () => {
      console.log('click')
      document.getElementById('infoSignUp').textContent = ''
    })
  })
})()
