const express = require('express')
const router = express.Router();


router.get('/', (req, res, next) => {
    console.log("getcalled");
    res.json({ data: "Yo its working" });
})

module.exports = router;