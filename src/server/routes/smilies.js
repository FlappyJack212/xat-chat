const express = require('express');
const router = express.Router();

// Sample smiley data - in a real app, this would come from a database
const smilies = {
  ':)': {
    image: '/smilies/smile.png',
    category: 'basic',
    description: 'Happy smile'
  },
  ':(': {
    image: '/smilies/sad.png',
    category: 'basic',
    description: 'Sad face'
  },
  ':D': {
    image: '/smilies/laugh.png',
    category: 'basic',
    description: 'Big laugh'
  },
  ';)': {
    image: '/smilies/wink.png',
    category: 'basic',
    description: 'Winking'
  },
  ':P': {
    image: '/smilies/tongue.png',
    category: 'basic',
    description: 'Sticking tongue out'
  },
  ':O': {
    image: '/smilies/surprised.png',
    category: 'basic',
    description: 'Surprised'
  },
  '<3': {
    image: '/smilies/heart.png',
    category: 'emotions',
    description: 'Love'
  },
  '>:(': {
    image: '/smilies/angry.png',
    category: 'emotions',
    description: 'Angry'
  },
  ':cool:': {
    image: '/smilies/cool.png',
    category: 'emotions',
    description: 'Cool'
  },
  ':cry:': {
    image: '/smilies/cry.png',
    category: 'emotions',
    description: 'Crying'
  },
  ':lol:': {
    image: '/smilies/lol.png',
    category: 'emotions',
    description: 'Laughing out loud'
  },
  ':love:': {
    image: '/smilies/love.png',
    category: 'emotions',
    description: 'In love'
  },
  ':music:': {
    image: '/smilies/music.png',
    category: 'activities',
    description: 'Music'
  },
  ':game:': {
    image: '/smilies/game.png',
    category: 'activities',
    description: 'Gaming'
  },
  ':food:': {
    image: '/smilies/food.png',
    category: 'activities',
    description: 'Food'
  },
  ':sleep:': {
    image: '/smilies/sleep.png',
    category: 'activities',
    description: 'Sleeping'
  }
};

// Get all smilies
router.get('/', async (req, res) => {
  try {
    const { category, limit = 50 } = req.query;
    
    let filteredSmilies = smilies;
    
    if (category) {
      filteredSmilies = Object.fromEntries(
        Object.entries(smilies).filter(([code, smiley]) => smiley.category === category)
      );
    }
    
    // Convert to array format if limit is specified
    if (limit) {
      const smileyArray = Object.entries(filteredSmilies).slice(0, parseInt(limit));
      filteredSmilies = Object.fromEntries(smileyArray);
    }
    
    res.json({ smilies: filteredSmilies });
  } catch (error) {
    console.error('Error fetching smilies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get smiley by code
router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const smiley = smilies[code];
    if (!smiley) {
      return res.status(404).json({ message: 'Smiley not found' });
    }
    
    res.json({ smiley: { code, ...smiley } });
  } catch (error) {
    console.error('Error fetching smiley:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get smiley categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = [...new Set(Object.values(smilies).map(smiley => smiley.category))];
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching smiley categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get smilies by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const filteredSmilies = Object.fromEntries(
      Object.entries(smilies).filter(([code, smiley]) => smiley.category === category)
    );
    
    res.json({ smilies: filteredSmilies });
  } catch (error) {
    console.error('Error fetching smilies by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search smilies
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    const filteredSmilies = Object.fromEntries(
      Object.entries(smilies).filter(([code, smiley]) => 
        code.toLowerCase().includes(query.toLowerCase()) ||
        smiley.description.toLowerCase().includes(query.toLowerCase())
      )
    );
    
    res.json({ smilies: filteredSmilies });
  } catch (error) {
    console.error('Error searching smilies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get popular smilies
router.get('/popular/list', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    // In a real app, this would be based on usage statistics
    const popularCodes = [':)', ':D', '<3', ';)', ':P'];
    const popularSmilies = Object.fromEntries(
      popularCodes.slice(0, parseInt(limit)).map(code => [code, smilies[code]])
    );
    
    res.json({ smilies: popularSmilies });
  } catch (error) {
    console.error('Error fetching popular smilies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all smilies as array
router.get('/list/all', async (req, res) => {
  try {
    const smileyArray = Object.entries(smilies).map(([code, smiley]) => ({
      code,
      ...smiley
    }));
    
    res.json({ smilies: smileyArray });
  } catch (error) {
    console.error('Error fetching all smilies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/smilies (new endpoint for xat-engine)
// @desc    Get all smilies with codes
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Return smilies in format expected by xat-engine
    const smilies = {
      '(smile)': '😊', '(frown)': '😢', '(big_smile)': '😃', '(wink)': '😉',
      '(tongue)': '😛', '(surprised)': '😮', '(upset)': '😠', '(cool)': '😎',
      '(cry)': '😭', '(laugh)': '😂', '(kiss)': '😘', '(heart)': '❤️',
      '(star)': '⭐', '(music)': '🎵', '(fire)': '🔥', '(diamond)': '💎',
      '(angel)': '😇', '(devil)': '😈', '(sleep)': '😴', '(sick)': '🤒',
      '(party)': '🥳', '(love)': '😍', '(think)': '🤔', '(shock)': '😱',
      '(peace)': '✌️', '(thumbs_up)': '👍', '(thumbs_down)': '👎', '(clap)': '👏'
    };
    
    res.json({
      success: true,
      smilies: smilies
    });
  } catch (error) {
    console.error('Error fetching smilies:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch smilies'
    });
  }
});

module.exports = router;
