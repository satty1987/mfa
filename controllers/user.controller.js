const User = require('../models/user.model');
const Speakeasy = require("speakeasy");
var QRCode = require('qrcode');

exports.signUp = async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.signIn = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.userEmailPhone, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.getQrCode = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        //var url = Speakeasy.otpauthURL({ secret: user.mfaSecret, label: 'DXT MFA', algorithm: 'sha512' });
        const url = user.qrcode;
        QRCode.toDataURL(url, function (err, data_url) {
            console.log(data_url);
            res.status(200).send({imageUrl :data_url});
        });
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.getTotpCode = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.send({
            "token": Speakeasy.totp({
                secret: user.mfaSecret,
                encoding: "base32"
            }),
            "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
        });
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.validateOtp = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);
        console.log(user.mfaSecret);
        console.log(req.body.mfaSecret);

        const validate = {
            "valid": Speakeasy.totp.verify({
                secret: user.mfaSecret,
                encoding: "base32",
                token: req.body.token,
                window: 1
            })
        }
        res.status(200).send(validate);
    } catch (e) {
        res.status(500).send(e);
    }
}
