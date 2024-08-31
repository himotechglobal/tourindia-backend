const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth'); // Middleware to protect routes
const Place = require('../models/Place');
const router = express.Router();

// Create a new place
router.post('/',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('location', 'Location is required').not().isEmpty(),
            check('image', 'Image is required').not().isEmpty(),
            check('category', 'Category is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, location, image, category } = req.body;

        try {
            const newPlace = new Place({
                name,
                description,
                location,
                image,
                category,
                createdBy: req.user.id
            });

            const place = await newPlace.save();
            res.json(place);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// Get all places
router.get('/', async (req, res) => {
    try {
        const places = await Place.find().populate('createdBy', ['username']);
        res.json(places);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a specific place by ID
router.get('/:id', async (req, res) => {
    try {
        const place = await Place.findById(req.params.id).populate('createdBy', ['username']);
        if (!place) {
            return res.status(404).json({ msg: 'Place not found' });
        }
        res.json(place);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Place not found' });
        }
        res.status(500).send('Server error');
    }
});

// Edit a place by ID
router.put(
    '/:id',
    [
      auth,
      [
        check('name', 'Name is required').optional().not().isEmpty(),
        check('location', 'Location is required').optional().not().isEmpty(),
        check('image', 'Image is required').optional().not().isEmpty(),
        check('category', 'Category is required').optional().not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, description, location, image, category } = req.body;
  
      try {
        // Find the place by ID
        let place = await Place.findById(req.params.id);
        if (!place) {
          return res.status(404).json({ msg: 'Place not found' });
        }
  
        // Check if the user is authorized to update this place
        if (place.createdBy.toString() !== req.user.id) {
          return res.status(403).json({ msg: 'User not authorized' });
        }
  
        // Update the place
        place = await Place.findByIdAndUpdate(
          req.params.id,
          { $set: { name, description, location, image, category } },
          { new: true }
        );
        res.json(place);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );
  

  router.delete('/:id', auth, async (req, res) => {
    try {
      // Find the place by ID
      const place = await Place.findById(req.params.id);
      if (!place) {
        return res.status(404).json({ msg: 'Place not found' });
      }

      if (place.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'User not authorized' });
      }
  
      // Delete the place
      await Place.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Place removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// Get a  places by specific category
router.get('/category/:category', async (req, res) => {
    try {
        const place = await Place.findOne({category: req.params.category}).populate('createdBy', ['username']);
        if (!place) {
            return res.status(404).json({ msg: 'Place not found' });
        }
        res.json(place);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Place not found' });
        }
        res.status(500).send('Server error');
    }
});


module.exports = router;
