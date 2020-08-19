import decode from "jwt-decode";
import auth0 from "auth0-js";
import Router from "vue-router";
const ID_TOKEN_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";

const CLIENT_ID = "gZrlQv9M44q8HqbwYavLHAc1TwtGrYmB";
const CLIENT_DOMAIN = "dev-kialml3c.us.auth0.com";
const REDIRECT = "https://frontend-user-ia-comp-sci.herokuapp.com/callback";
const AUDIENCE = "http://ia-comp-sci.com/user";

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN,
  responseType: "token id_token",
  redirectUri: REDIRECT,
  audience: AUDIENCE
});

export function login() {
  auth.authorize();
}

var router = new Router({
  mode: "history"
});

export function logout() {
  endSession();
  router.go("/");
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: "/",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getUserData() {
  const user_data = decode(getIdToken());
  return user_data;
}

function endSession() {
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem("user");
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp("[#&]" + name + "=([^&]*)").exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

// Get and store access_token in local storage
export function setSession() {
  let accessToken = getParameterByName("access_token");
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

  let idToken = getParameterByName("id_token");
  localStorage.setItem(ID_TOKEN_KEY, idToken);

  let decodedToken = decode(idToken);
  localStorage.setItem("user", JSON.stringify(decodedToken));
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
