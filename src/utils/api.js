import {get, post} from "./http";

export function login(data) {
    return post("/api/login", data)
}

export function register(data) {
    return post("/api/register", data)
}

export function logout() {
    return get("/api/logout")
}

export function getAuth() {
    return get("/api/auth")
}

export function getArticle(params) {
    return get("/api/article/" + params)
}

export function getArticles(params) {
    return get("/api/articles", params)
}

export function getComments(params) {
    return get("/api/comments", params)
}

export function getCategories(params) {
    return get("/api/categories", params)
}

export function addArticle(data) {
    return post("/api/article", data)
}

export function addComment(data) {
    return post("/api/comment", data)
}