import axios from 'axios'
import { getDefaultHeaders } from '../utils/authorization-headers'
const baseUrl = '/api/users'

const getAll = async () => (await axios.get(baseUrl, getDefaultHeaders())).data

const getById = async userId => {
  const result = await axios.get(`${baseUrl}/${userId}`, getDefaultHeaders())
  return result.data
}//(await axios.get(`${baseUrl}/${userId}`, getDefaultHeaders())).data

export default { getAll, getById }