const express = require('express');

// import controllers
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');

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

/* Cards */
router.get('/lists/:id/cards', cardController.getCardsInList);
router.get('/cards/:id', cardController.getOneCard);
router.post('/cards', cardController.createCard);
router.patch('/cards/:id', cardController.modifyCard);
router.put('/cards/:id?', cardController.createOrModify);
router.delete('/cards/:id', cardController.deleteCard);

router.use((req, res) => {
  res.status(404).send('Service does not exist\nSee : https://doc.localhost.api');
});

module.exports = router;