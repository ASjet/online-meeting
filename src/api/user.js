import { apiNoAuth, apiAuth } from "@/api";

const defaultToken = "1234567890";

export function userRegister(username, password) {
    // return apiNoAuth.post("/user/register", {
    //     username: username,
    //     password: password
    // });
    return new Promise((resolve, reject) => {
        const storedUsername = localStorage.getItem("username");
        if (username === storedUsername) {
            reject({
                message: "用户名已存在"
            });
        } else {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            resolve({
                data: {
                    token: defaultToken
                }
            });
        }
    });
}

export function userLogin(username, password) {
    // return apiNoAuth.post("/user/login", {
    //     username: username,
    //     password: password
    // });
    return new Promise((resolve, reject) => {
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");
        if (username === storedUsername && password === storedPassword) {
            resolve({
                data: {
                    token: defaultToken
                }
            });
        } else {
            reject({
                message: "用户名或密码错误"
            });
        }
    });
}

export function userLogout() {
    // return apiAuth.get("/user/logout");
    return new Promise((resolve, reject) => {
        resolve();
    });
}
