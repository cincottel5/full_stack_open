import axios from 'axios'
import { getDefaultHeaders } from '../utils/authorization-headers'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getDefaultHeaders())
  return response.data
}

const update = async (object) => {
  const url = `${baseUrl}/${object.id}`

  const response = await axios.put(url, object, getDefaultHeaders())
  return response.data
}

const remove = async (objectId) => {
  const url = `${baseUrl}/${objectId}`

  const response = axios.delete(url, getDefaultHeaders())
  return response.data
}

const addComment = async (objectId, comment) => {
  const url = `${baseUrl}/${objectId}/comments`
  const response = await axios.post(url, { comment }, getDefaultHeaders())
  return response.data
}

export default { getAll, create, update, remove, addComment }
