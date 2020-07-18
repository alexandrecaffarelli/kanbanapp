const List = require('../models/list');

const listController = {
  
  // method to pull all lists from database
  getAllLists: async (req, res) => {
    try {
      const lists = await List.findAll({
        include: {
          association: 'cards',
          include: 'tags'
        },
        order: [
          ['position', 'ASC'],
          ['cards', 'position', 'ASC']
        ]
      });
      res.status(200).json(lists);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // method to pull one list from database using its id
  getOneList: async (req, res) => {
    try {
      const listId = req.params.id;
      const list = await List.findByPk(listId);
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).send('Cant find list with id ' + listId);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // method to create a new list and insert it into database
  createList: async (req, res) => {
    try {
      const { name, position } = req.body;
      const bodyErrors = [];
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        let newList = List.build({
          name,
          position
        });
        await newList.save();
        res.status(201).json(newList);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // method to modify existing list from database using its id
  modifyList: async (req, res) => {
    try {
      const listId = req.params.id;
      const list = await List.findByPk(listId);
      if (!list) {
        res.status(404).send('Cant find list with id ' + listId);
      } else {
        const { name, position } = req.body;
        if (name) {
          list.name = name;
        }
        if (position) {
          list.position = position;
        }
        await list.save();
        res.status(200).json(list);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // method to look for a list from database using its id, if found, modify the list, if not found, create the list
  createOrModify: async (req, res) => {
    try {
      let list;
      if (req.params.id) {
        list = await List.findByPk(req.params.id);
      }
      if (list) {
        await listController.modifyList(req, res);
      } else {
        await listController.createList(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // method to delete list from database using its id
  deleteList: async (req, res) => {
    try {
      const listId = req.params.id;
      const list = await List.findByPk(listId);
      await list.destroy();
      res.status(200).json('OK');
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  }

};

module.exports = listController;