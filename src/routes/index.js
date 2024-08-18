import login from "./login.js"
import register from "./register.js"
import logout from "./logout.js"
import logger from "./logger.js"
import createOneTimeToken from "./create-one-time-token.js"
import home from "./home.js"
import checkCookies from "./check-cookies.js"

export const post = {
    login,
    register,
    logout,
    logger,
    createOneTimeToken,
    checkCookies
}

export const get = {
    home
}