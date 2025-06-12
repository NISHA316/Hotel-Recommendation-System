let model = require("../models/regModel.js");

class RegService {
    acceptData(name, email, address, contact, type, created_at, username, password) {
        let index = email.indexOf("@gmail.com");
        if (index != -1) {
            model.saveUser(name, email, address, contact, type, created_at, username, password);
            return "Registration success";
        } else {
            return "Registration failed";
        }
    }
}

module.exports = new RegService();
