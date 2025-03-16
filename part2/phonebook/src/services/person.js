import axios from "axios";

const url = "http://localhost:3001/persons"
const addPerson = p => axios.post(url, p).then(request => request.data)
const getAll = () => axios.get(url).then(request => request.data)
const deletePerson = (id) => axios.delete(`${url}/${id}`)
const updatePerson = p => axios.put(`${url}/${p.id}`,p).then(response => response.data)
export default { addPerson, getAll, deletePerson, updatePerson}