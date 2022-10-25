import files from "./files"
import users from "../apiCalls/users"
import services from "./services"
import films from "../apiCalls/films"
import websites from "../apiCalls/websites"
import application from "../apiCalls/application"
import references from "../apiCalls/references"
import orders from "../apiCalls/orders"

const apiCall = {
  application,
  films,
  websites,
  files,
  users,
  services,
  references,
  orders,
}

export default apiCall
