"use strict";

const fs = require("fs").promises;

class UserStorage {
    static #getUserInfo(data, id) {
        const users = JSON.parse(data)
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // =>[id, psword, name]
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }

    static #getUsers(data, isAll, args) {
        const users = JSON.parse(data);
        if(isAll) return users;

        const newUsers = args.reduce((newUsers, arg) => {
            if (users.hasOwnProperty(arg)) {
                newUsers[arg] = users[arg];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUsers(isAll, ...args) {
        return fs
            .readFile("./src/databases/users.json")
            .then((data) => {
                return this.#getUsers(data, isAll, args);
            })
            .catch(console.error);
    };

    static getUserInfo(id) {
        // const users = this.#users;
        return fs
            .readFile("./src/databases/users.json")
            .then((data) => {
                return this.#getUserInfo(data, id);
            })
            .catch((err) => { console.error });
    }

    static async save(userInfo) {
        const users = await this.getUsers(true)
        if(users.id.includes(userInfo.id)){
            throw "이미 존재하는 아이디입니다.";
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return {success : true};
    }
}

module.exports = UserStorage;