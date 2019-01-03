import axios from 'axios'

// palvelimen juurihakemisto
const baseUrl = 'http://localhost:3001/persons'

// hakee kaikki kontaktit palvelimelta ja palauttaa datan (kontaktit)
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

export default { getAll, create }