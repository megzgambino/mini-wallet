"use strict";

const { Wallet } = require("../models");
const { v4: uuidv4 } = require("uuid");
const CryptoJS = require("crypto-js");


class WalletController {
    
    static initAccount (req, res) {
        const { customer_xid } = req.body;
        const status = "Success";
       
            Wallet.create({
                customer_id: uuidv4(customer_xid),
                customer_xid
            })
            .then((wallet) => {
                const token = CryptoJS.AES.encrypt(wallet.customer_id, process.env.SECRET_KEY).toString()
                res.status(201).json({
                    data: {
                        token
                    },
                    status
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    };

    static enableWallet (req, res) {
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const status = "Enabled";
        const decodedToken = CryptoJS.AES.decrypt(token, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const dateNow = new Date().toISOString();

        Wallet.create({
            customer_id: decodedToken,
            status,
            balance: 0,
            enabled_at: dateNow,
            owned_by: decodedToken
        })
        .then((wallet) => {
            res.status(201).json({
                status: "Success",
                data: {
                    wallet: {
                        id: wallet.customer_id,
                        owned_by: wallet.owned_by,
                        status: wallet.status,
                        enabled_at: wallet.enabled_at,
                        balance: wallet.balance
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    };

    static showWallet (req, res) {
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const decodedToken = CryptoJS.AES.decrypt(token, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

        Wallet.findOne(
            {
                where: { 
                    customer_id: decodedToken,
                },
                order: [ [ 'createdAt', 'DESC' ] ] 
            })
        .then((wallet) => {
            res.status(200).json({
                status: "Success",
                data: {
                    wallet: {
                        id: wallet.customer_id,
                        owned_by: wallet.owned_by,
                        status: wallet.status,
                        enabled_at: wallet.enabled_at,
                        balance: wallet.balance
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })

    };

    static addMoney (req, res) {
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const decodedToken = CryptoJS.AES.decrypt(token, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const { amount, reference_id } = req.body;
        const dateNow = new Date().toISOString();

        Wallet.create({
            customer_id: decodedToken,
            deposited_by: decodedToken,
            deposited_at: dateNow,
            status: "Success",
            enabled_at: dateNow,
            owned_by: decodedToken,
            reference_id,
            amount
        })
        .then((wallet) => {
            Wallet.increment("balance", { 
                by: amount,
                where: {
                    customer_id : decodedToken,
                    deposited_by : decodedToken
                }
            })
            res.status(201).json({
                status: "Success",
                data : {
                    deposit: {
                        id: wallet.customer_id,
                        deposited_by: wallet.deposited_by,
                        status: wallet.status,
                        deposited_at: wallet.deposited_at,
                        amount: wallet.amount,
                        reference_id: wallet.reference_id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    };

    static withdrawMoney (req, res) {
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const decodedToken = CryptoJS.AES.decrypt(token, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const { amount, reference_id } = req.body;
        const dateNow = new Date().toISOString();

        Wallet.create({
            customer_id: decodedToken,
            withdrawn_by: decodedToken,
            withdrawn_at: dateNow,
            status: "Success",
            enabled_at: dateNow,
            owned_by: decodedToken,
            reference_id,
            amount
        })
        .then((wallet) => {
            Wallet.decrement("balance", { 
                by: amount,
                where: {
                    customer_id : decodedToken,
                    withdrawn_by : decodedToken
                }
            })
            res.status(201).json({
                status: "Success",
                data : {
                    deposit: {
                        id: wallet.customer_id,
                        withdrawn_by: wallet.withdrawn_by,
                        status: wallet.status,
                        withdrawn_at: wallet.withdrawn_at,
                        amount: wallet.amount,
                        reference_id: wallet.reference_id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })  
    };

    static disableWallet (req, res) {
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const decodedToken = CryptoJS.AES.decrypt(token, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const dateNow = new Date().toISOString();
        const { is_disabled } = req.body;
        Wallet.update(
            {
            status: "disabled"
            }, 
            {
            where: {
                customer_id : decodedToken
            },
            returning: true
        })
        .then((wallet) => {
            res.status(200).json({
                status: "Success",
                data : {
                    wallet: {
                        id: wallet.customer_id,
                        owned_by: wallet.owned_by,
                        status: wallet.status,
                        disabled_at: dateNow,
                        balance: wallet.balance
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })  
    };
};

module.exports = WalletController;