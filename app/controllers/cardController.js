const { List, Card } = require('../models');

const cardController = {

  // method to pull from database all cards belonging to a specific list using its id
  getCardsInList: async (req, res) => {
    try {
      const listId = req.params.id;
      const list = await List.findByPk(listId, {
        include: [{
          association: 'cards',
          include: ['tags']
        }],
        order: [
          ['cards', 'position', 'ASC']
        ],
      });
      if (!list) {
        res.status(404).json('Cant find list with id ' + listId);
      } else {
        res.status(200).json(list.cards);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // method to pull one card from database using its id
  getOneCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      const card = await Card.findByPk(cardId, {
        include: ['tags']
      });
      if (!card) {
        res.status(404).json('Cant find card with id ' + cardId);
      } else {
        res.status(200).json(card);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // method to create new card and insert it into database
  createCard: async (req, res) => {
    try {
      const { content, color, list_id } = req.body;
      let bodyErrors = [];
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        let newCard = new Card();
        newCard.content = content;
        newCard.list_id = list_id;
        if (color) {
          newCard.color = color;
        }
        await newCard.save();
        res.status(201).json(newCard);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // method to find a card from database using its id, if found, modify the card, if not, 404 error
  modifyCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      const { content, color, list_id, position } = req.body;
      let card = await Card.findByPk(cardId, {
        include: ['tags']
      });
      if (!card) {
        res.status(404).json(`Cant find card with id ${cardId}`);
      } else {
        if (content) {
          card.content = content;
        }
        if (list_id) {
          card.list_id = list_id;
        }
        if (color) {
          card.color = color;
        }
        if (position) {
          card.position = position;
        }
        await card.save();
        res.status(200).json(card);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // method to find a card in database using its id, if found, modify the card, if not found, create a new card
  createOrModify: async (req, res) => {
    try {
      let card;
      if (req.params.id) {
        card = await Card.findByPk(req.params.id);
      }
      if (card) {
        await cardController.modifyCard(req, res);
      } else {
        await cardController.createCard(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // method to delete a card from database using its id
  deleteCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      let card = await Card.findByPk(cardId);
      if (!card) {
        res.status(404).json(`Cant find card with id ${cardId}`);
      } else {
        await card.destroy();
        res.status(200).json('ok');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  }
  
};

module.exports = cardController;