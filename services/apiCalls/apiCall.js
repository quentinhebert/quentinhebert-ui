import admin from "../apiCalls/admin"
import users from "../apiCalls/users"
import unauthenticated from "../apiCalls/unauthenticated"
import films from "../apiCalls/films"
import websites from "../apiCalls/websites"
import application from "../apiCalls/application"
import references from "../apiCalls/references"

const apiCall = {
  application,
  films,
  websites,
  admin,
  users,
  unauthenticated,
  references,
}

export default apiCall
