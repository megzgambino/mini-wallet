"use strict";
const express = require("express");
const router = express.Router();
const WalletController = require("../controllers/walletController");

router.post("/api/v1/init", WalletController.initAccount);
router.post("/api/v1/wallet", WalletController.enableWallet);
router.get("/api/v1/wallet", WalletController.showWallet);
router.post("/api/v1/wallet/deposits", WalletController.addMoney);
router.post("/api/v1/wallet/withdrawals", WalletController.withdrawMoney);
router.patch("/api/v1/wallet", WalletController.disableWallet);


module.exports = router;