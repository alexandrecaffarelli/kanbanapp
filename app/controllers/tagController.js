const { Tag, Card } = require('../models');

const tagController = {

  // method to pull all tags from database
  getAllTags: async (req, res) => {
    try {
      const tags = await Tag.findAll();
      res.status(200).json(tags);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // method to create a new tag and insert it into database
  createTag: async (req, res) => {
    try {
      const { name, color } = req.body;
      let bodyErrors = [];
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        let newTag = new Tag();
        newTag.name = name;
        newTag.color = color;
        await newTag.save();
        res.status(201).json(newTag);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // method to modify tag from database using its id
  modifyTag: async (req, res) => {
    try {
      const tagId = req.params.id;
      const { name, color } = req.body;
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        res.status(404).json('Cant find tag with id ' + tagId);
      } else {
        if (name) {
          tag.name = name;
        }
        if (color) {
          tag.color = color;
        }
        await tag.save();
        res.status(200).json(tag);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // method to find a tag from databse using its id, if found, modify the tag, if not found, create the tag
  createOrModify: async (req, res) => {
    try {
      let tag;
      if (req.params.id) {
        tag = await Tag.findByPk(req.params.id);
      }
      if (tag) {
        await tagController.modifyTag(req, res);
      } else {
        await tagController.createTag(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // method to delete tag from database using its id
  deleteTag: async (req, res) => {
    try {
      const tagId = req.params.id;
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        res.status(404).json('Cant find tag with id ' + tagId);
      } else {
        await tag.destroy();
        res.status(200).json('OK');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // method to add a tag to card, using both card and tag ids
  associateTagToCard: async (req, res) => {
    try {
      console.log(req.body);
      const cardId = req.params.id;
      const tagId = req.body.tagId;
      let card = await Card.findByPk(cardId, {
        include: ['tags']
      });
      if (!card) {
        return res.status(404).json('Cant find card with id ' + cardId);
      }
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        return res.status(404).json('Cant find tag with id ' + tagId);
      }
      await card.addTag(tag);
      card = await Card.findByPk(cardId, {
        include: ['tags']
      });
      res.status(200).json(card);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  // method to remove tag from card, using both card and tag ids
  removeTagFromCard: async (req, res) => {
    try {
      const { cardId, tagId } = req.params;
      let card = await Card.findByPk(cardId);
      if (!card) {
        return res.status(404).json('Cant find card with id ' + cardId);
      }
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        return res.status(404).json('Cant find tag with id ' + tagId);
      }
      await card.removeTag(tag);
      card = await Card.findByPk(cardId, {
        include: ['tags']
      });
      res.status(200).json(card);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  }

};

module.exports = tagController;