const express = require('express');
const router = express.Router();

// Sample avatar data - in a real app, this would come from a database
const avatars = [
  {
    id: 'cat',
    name: 'Cat',
    image: '/avatars/cat.png',
    category: 'animals',
    price: 0
  },
  {
    id: 'dog',
    name: 'Dog',
    image: '/avatars/dog.png',
    category: 'animals',
    price: 0
  },
  {
    id: 'robot',
    name: 'Robot',
    image: '/avatars/robot.png',
    category: 'characters',
    price: 100
  },
  {
    id: 'ninja',
    name: 'Ninja',
    image: '/avatars/ninja.png',
    category: 'characters',
    price: 200
  },
  {
    id: 'wizard',
    name: 'Wizard',
    image: '/avatars/wizard.png',
    category: 'characters',
    price: 300
  },
  {
    id: 'dragon',
    name: 'Dragon',
    image: '/avatars/dragon.png',
    category: 'mythical',
    price: 500
  }
];

// Get all avatars
router.get('/', async (req, res) => {
  try {
    const { category, limit = 50 } = req.query;
    
    let filteredAvatars = avatars;
    
    if (category) {
      filteredAvatars = avatars.filter(avatar => avatar.category === category);
    }
    
    if (limit) {
      filteredAvatars = filteredAvatars.slice(0, parseInt(limit));
    }
    
    res.json({ avatars: filteredAvatars });
  } catch (error) {
    console.error('Error fetching avatars:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get avatar by ID
router.get('/:avatarId', async (req, res) => {
  try {
    const { avatarId } = req.params;
    
    const avatar = avatars.find(a => a.id === avatarId);
    if (!avatar) {
      return res.status(404).json({ message: 'Avatar not found' });
    }
    
    res.json({ avatar });
  } catch (error) {
    console.error('Error fetching avatar:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get avatar categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = [...new Set(avatars.map(avatar => avatar.category))];
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching avatar categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get avatars by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const filteredAvatars = avatars.filter(avatar => avatar.category === category);
    
    res.json({ avatars: filteredAvatars });
  } catch (error) {
    console.error('Error fetching avatars by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get free avatars
router.get('/free/list', async (req, res) => {
  try {
    const freeAvatars = avatars.filter(avatar => avatar.price === 0);
    res.json({ avatars: freeAvatars });
  } catch (error) {
    console.error('Error fetching free avatars:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get premium avatars
router.get('/premium/list', async (req, res) => {
  try {
    const premiumAvatars = avatars.filter(avatar => avatar.price > 0);
    res.json({ avatars: premiumAvatars });
  } catch (error) {
    console.error('Error fetching premium avatars:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
