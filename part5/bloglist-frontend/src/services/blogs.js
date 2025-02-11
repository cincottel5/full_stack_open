import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const defaultConfig = () => ({
  headers: { Authorization: token }
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, defaultConfig())
  return response.data
}

const update = async object => {
  const url = `${baseUrl}/${object.id}`

  const response = await axios.put(url, object, defaultConfig())
  return response.data
}

const remove = async objectId => {
  const url = `${baseUrl}/${objectId}`

  const config = {
    headers: { Authorization: token }
  }

  const response = axios.delete(url, config)
  return response.data
}

export default { getAll, setToken, create, update, remove }