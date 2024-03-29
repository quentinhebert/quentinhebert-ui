import files from "./files"
import users from "../apiCalls/users"
import services from "./services"
import films from "../apiCalls/films"
import websites from "../apiCalls/websites"
import application from "../apiCalls/application"
import references from "../apiCalls/references"
import orders from "../apiCalls/orders"
import clients from "../apiCalls/clients"
import quotations from "../apiCalls/quotations"
import dashboard from "../apiCalls/dashboard"
import events from "../apiCalls/events"
import reviews from "../apiCalls/reviews"

const apiCall = {
  application,
  films,
  websites,
  files,
  users,
  services,
  references,
  orders,
  clients,
  quotations,
  dashboard,
  events,
  reviews,
}

export default apiCall
