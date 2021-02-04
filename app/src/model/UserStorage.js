"use strict";

const fs = require("fs").promises;

class UserStorage{
    static #getUserInfo(data, id){
        const users = JSON.parse(data)
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // =>[id, psword, name]
        const userInfo = usersKeys.reduce((newUser, info)=>{
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }

    static getUsers(...args){
        // const users = this.#users;
        const newUsers = args.reduce((newUsers, arg)=>{
            if(users.hasOwnProperty(arg)){
                newUsers[arg] = users[arg];
            }
            return newUsers;
        }, {});
        // console.log(newUsers);
        return newUsers;
    };

    static getUserInfo(id){
        // const users = this.#users;
        return fs
            .readFile("./src/databases/users.json")
            .then((data)=>{
                return this.#getUserInfo(data, id);
            })
            .catch((err)=>{console.error});
    }

    static save(userInfo){
        const users = this.getUsers("","","")
        const data = "";
        fs.writeFile("./src/databases/users.json",data);
        // const users = this.#users;
        // users.id.push(userInfo.id);
        // users.name.push(userInfo.name);
        // users.psword.push(userInfo.psword);
        // return {success : true};
    }
}

module.exports = UserStorage;