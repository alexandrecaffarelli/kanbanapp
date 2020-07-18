const express = require('express');

// import controllers
const listController = require('./controllers/listController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello');
});

/** Lists */
router.get('/lists', listController.getAllLists);
router.get('/lists/:id', listController.getOneList);
router.post('/lists', listController.createList);
router.patch('/lists/:id', listController.modifyList);
router.put('/lists/:id?', listController.createOrModify);
router.delete('/lists/:id', listController.deleteList);

router.use((req, res) => {
  res.status(404).send('Service does not exist\nSee : https://doc.localhost.api');
});

module.exports = router;