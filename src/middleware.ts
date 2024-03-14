import { NextRequest } from "next/server"
import { updateSession } from "./utils/auth"

const middleware = async (request: NextRequest) => {
  return await updateSession(request)
}

export default middleware
