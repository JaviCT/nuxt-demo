import express from 'express'
import axios from 'axios'

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  getCredentials(req.body.username, req.body.password).then(function(data){
    req.session.authUser = data
    return res.json(data)
  }).catch(function (error){
    res.status(401).json({ message: 'Bad credentials' })
  });

})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

function getCredentials(username, password) {
  return new Promise((resolve, reject) => {
    axios.get(process.env.API_URL + 'users/'+username+'/credentials',{
      params: {
        password: password
      }
    })
    .then(function (response) {
      // handle success
      console.log(response.data)
      resolve(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      resolve(error)
    });
  });
}

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
