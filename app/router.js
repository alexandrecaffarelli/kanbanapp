const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello');
});

router.use((req, res) => {
  res.status(404).send('Service does not exist\nSee : https://doc.localhost.api');
});

module.exports = router;