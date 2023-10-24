const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    console.log("generating token id", id);

    const payload = { userId: id };

    return jwt.sign(payload, "SECRETKEY", {
        expiresIn: "30d"
    });
}

module.exports = {
    generateToken
}