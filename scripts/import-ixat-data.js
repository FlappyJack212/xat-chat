const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Power = require('../src/server/models/Power');
const User = require('../src/server/models/User');
const Room = require('../src/server/models/Room');

dotenv.config();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ixat_chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Complete powers data from iXat SQL database
const IXAT_POWERS = [
  {id: 0, section: 'p0', name: 'allpowers', subid: 1, cost: 0, limited: 1, description: 'test', amount: 1, topsh: 'allpowers', group: '', icon: '🌟'},
  {id: 1, section: 'p0', name: 'topman', subid: 2, cost: 180, limited: 0, description: 'Your icon will go to the top of your section (eg moderator/member) even if you have a high id number unless another user also has this power', amount: 0, topsh: '', group: '', icon: '⬆️'},
  {id: 2, section: 'p0', name: 'subhide', subid: 4, cost: 90, limited: 0, description: 'Set your star or heart to black (from red) even if you are a subscriber (have days). All other subscriber features still work eg glitter.', amount: 0, topsh: '', group: '', icon: '🖤'},
  {id: 3, section: 'p0', name: 'mod8', subid: 8, cost: 450, limited: 0, description: 'On any chat where you are a moderator you will be able to ban for up to 8 hours (up from 6).', amount: 0, topsh: '', group: '', icon: '⚖️'},
  {id: 4, section: 'p0', name: 'zoom', subid: 16, cost: 270, limited: 0, description: 'When anybody mouses over your picture it will enlarge so that they can get a better look. Also you can zoom anyones picture on the chat.', amount: 0, topsh: '', group: '', icon: '🔍'},
  {id: 5, section: 'p0', name: 'nofollow', subid: 32, cost: 90, limited: 0, description: 'Normally friends can locate you and follow you around from chat to chat. This power allows you to block them from locating and following you.', amount: 0, topsh: '', group: '', icon: '🚫'},
  {id: 6, section: 'p0', name: 'invert', subid: 64, cost: 180, limited: 0, description: 'Make almost any smilie upside down. To make a smilie upside down add #i to the smilie code eg (cd#i). Works with () smilies only.', amount: 0, topsh: '', group: '', icon: '🙃'},
  {id: 7, section: 'p0', name: 'mirror', subid: 128, cost: 90, limited: 0, description: 'Mirror almost any smilie left to right. To make a smilie mirror add #m to the smilie code eg (cd#m). Works with () smilies only.', amount: 0, topsh: '', group: '', icon: '🪞'},
  {id: 8, section: 'p0', name: 'noaudies', subid: 256, cost: 9, limited: 0, description: 'Turns off the audies sound effects. Any messages with an audie will just beep like any other message. Audies still work if you click on them.', amount: 0, topsh: '', group: '', icon: '🔇'},
  {id: 9, section: 'p0', name: 'reghide', subid: 512, cost: 90, limited: 0, description: 'Remove your star or heart so that you show on the user list like an unregistered user. All other subscriber features still work eg glitter.', amount: 0, topsh: '', group: '', icon: '👻'},
  {id: 10, section: 'p0', name: 'nopc', subid: 1024, cost: 180, limited: 0, description: 'Block incoming PC (private chat) from all users except friends. You can still initiate a PC. Owners, Mods and xat staff can always PC you.', amount: 0, topsh: '', group: '', icon: '🚪'},
  {id: 11, section: 'p0', name: 'tempmod', subid: 2048, cost: 585, limited: 0, description: 'NOTE YOU HAVE TO BE AN OWNER TO USE THIS POWER! Make a user a moderator from 1 minute to 24 hours. To use private chat the user and send him a message like /m2.5 which in this case would make him a moderator for 2 hours 30 minutes.', amount: 0, topsh: '', group: '', icon: '👑'},
  {id: 12, section: 'p0', name: 'hat', subid: 4096, cost: 90, limited: 0, description: 'For a Turkish cap or baseball hat use (hat#t#FF0000). For a US football helmet use (hat#f#000080). You can use any color with a hex code. More hats will be added. Some hats may only available for holidays.', amount: 0, topsh: '', group: '', icon: '👒'},
  {id: 13, section: 'p0', name: 'red', subid: 8192, cost: 135, limited: 0, description: 'Color any "yellow" smilie red. To make a smilie red add #r to the smilie code eg (d#r). If you have multiple color powers you can create custom colored smilies. Works with () smilies only.', amount: 0, topsh: '', group: '', icon: '🔴'},
  {id: 14, section: 'p0', name: 'green', subid: 16384, cost: 135, limited: 0, description: 'Color any yellow smilie green. To make a smilie green add #g to the smilie code eg (d#g). If you have multiple color powers you can create custom colored smilies. Works with () smilies only.', amount: 0, topsh: '', group: '', icon: '🟢'},
  {id: 15, section: 'p0', name: 'blue', subid: 32768, cost: 135, limited: 0, description: 'Color any yellow smilie blue. To make a smilie blue add #b to the smilie code eg (d#b). If you have multiple color powers you can create custom colored smilies. Works with () smilies only.', amount: 0, topsh: '', group: '', icon: '🔵'},
  {id: 16, section: 'p0', name: 'light', subid: 65536, cost: 135, limited: 0, description: 'Light/Dark any "yellow" smilie. To make a smilie lighter add pluses to the smilie #+++, darker add minuses #---- to the smilie code. If you have multiple color powers you can create custom colored smilies. Works with () smilies only.', amount: 0, topsh: '', group: '', icon: '💡'},
  {id: 17, section: 'p0', name: 'heart', subid: 131072, cost: 597, limited: 1, description: 'Give a heart shape to any "yellow" smilie. To make a heart smilie add #h to the smilie code eg (biggrin#h). If you have color powers you can change the color. EG for a pink heart use: (love#h#ff99ff). Works with () smilies only.', amount: 0, topsh: '', group: '', icon: '❤️'},
  {id: 18, section: 'p0', name: 'shuffle', subid: 262144, cost: 22, limited: 0, description: 'Selects a random picture from a strip of pictures you specify. Set your avatar to be a horizontal strip of square pictures and a random picture will be shown with each message. Tool to help make a strip.', amount: 0, topsh: '', group: '', icon: '🔀'},
  {id: 19, section: 'p0', name: 'animate', subid: 524288, cost: 360, limited: 0, description: 'Make an animated avatar from a strip of pictures you specify. Set your avatar to be a horizontal strip of square pictures and an animation will be shown as your avatar. You can convert animated GIFs to picture strips here', amount: 0, topsh: '', group: '', icon: '🎬'},
  {id: 20, section: 'p0', name: 'square', subid: 1048576, cost: 90, limited: 0, description: 'Give a cyan square shape to any "yellow" smilie. To make a cyan square smilie add #s to the smilie code eg (smile#s). If you have color powers you can change the color. EG for purple use: (biggrin#s#800080). Works with () smilies only.', amount: 0, topsh: '', group: '', icon: '🟦'},
  {id: 21, section: 'p0', name: 'nameglow', subid: 2097152, cost: 360, limited: 0, description: 'Give a neon glow to your name on the chat box. To add a green glow add (glow) to the end of your name. If you have color powers you can add a custom colored glow. EG for red use: (glow#r) or white use: (glow#FFFFFF)', amount: 0, topsh: '', group: '', icon: '✨'},
  {id: 22, section: 'p0', name: 'cycle', subid: 4194304, cost: 450, limited: 0, description: 'Give a cycle of rainbow colors to any "yellow", heart or square smilie. To make an cycle smilie add #y to the smilie code. EG (smile#y). To make a heart smiley cycle use: (wink#h#y), To make a square smiley cycle use: (frown#s#y). Works with ( ) Smilies only.', amount: 0, topsh: '', group: '', icon: '🌈'},
  {id: 23, section: 'p0', name: 'hexagon', subid: 8388608, cost: 90, limited: 0, description: 'Give a pink hexagon shape to any "yellow" smilie. To make a pink hexagon smilie add #x to the smilie code eg (smile#x). If you have color powers you can change the color. EG for purple use: (biggrin#x#800080). Works with () smilies only.', amount: 0, topsh: '', group: '', icon: '⬡'},
  {id: 24, section: 'p0', name: 'clear', subid: 16777216, cost: 3300, limited: 1, description: 'Give a clear background to any "yellow" smilie. To make a clear smilie add #c to the smilie code eg (smile#c). Works with () smilies only.', amount: 0, topsh: '', group: '', icon: '⚪'},
  {id: 25, section: 'p0', name: 'boot', subid: 33554432, cost: 13716, limited: 1, description: 'NOTE YOU HAVE TO BE AN OWNER OR MODERATOR TO USE THIS POWER! Boot a user to another chat. To boot click on the user and choose kick, there is a box to enter the group to kick them to e.g. "Illusion". If you boot people to inappropriate rooms or otherwise abuse the power it is a violation of the terms and you will forfeit the power. More info', amount: 0, topsh: '', group: '', icon: '👢'},
  {id: 34, section: 'p1', name: 'diamond', subid: 4, cost: 738, limited: 1, description: 'Give a purple diamond shape to any "yellow" smilie. To make a diamond smilie add #d to the smilie code eg (smile#d). If you have color powers you can change the color. EG for red use: (biggrin#d#FF0000). Works with () smilies only.', amount: 1, topsh: '', group: '', icon: '💎'},
  {id: 35, section: 'p1', name: 'purple', subid: 8, cost: 22500, limited: 0, description: 'Turn your pawn purple. When this power is enabled you will show as purple on the user list no matter what your status. xat\'s first epic power is expensive so will be very rare.', amount: 2, topsh: '', group: '', icon: '🟣'},
  {id: 40, section: 'p1', name: 'fade', subid: 256, cost: 1638, limited: 1, description: 'Give a ghost like fade effect to any "yellow" smilie. To make a smilie fade add #f to the smilie code eg (smile#f).', amount: 0, topsh: 'noface', group: '', icon: '👻'},
  {id: 45, section: 'p1', name: 'angel', subid: 8192, cost: 10000, limited: 1, description: 'Add wings, a halo, a cloud and prayer hands to any yellow smiley. For example to add all the effects use (angel#angel#halo#cloud#pray).', amount: 0, topsh: 'halo,cloud,pray', group: '', icon: '😇'},
  {id: 48, section: 'p1', name: 'fruit', subid: 65536, cost: 639, limited: 1, description: 'Give a fruity background to any "yellow" smilie. Eg (smile#fruit) (d#apple) (yum#pear) (eek#orange) (wink#plum) (hello#lemon). Works with () smilies only.', amount: 0, topsh: 'apple,lemon,pear,orange,plum,banana', group: '', icon: '🍎'},
  {id: 52, section: 'p1', name: 'halloween', subid: 1048576, cost: 600, limited: 1, description: 'Halloween smilies and effects. Smileys are: (halloween) (ghost) (grim) (tomb) (bat) (pkn) (cdn) (mmy) (frk) (wh). This power will be limited but there will be a chance for all to buy. See wiki for details', amount: 0, topsh: 'pknlaugh,tort,pkn,wh,frk,mmy,cdn,grim,tomb,bat,ghost,dig,die', group: '', icon: '🎃'},
  {id: 57, section: 'p1', name: 'christmas', subid: 33554432, cost: 2061, limited: 1, description: '26 seasonal smilies and effects eg (scarf) (give) (shiver) (wreath) (sball) (xb1) (tree). See wiki for details', amount: 0, topsh: 'beard,bell,cane,ches,elf,give,pole,sack,sball,scarf,sdeer,sfeet,shiver,sledge,slist,smound,spull,stock,tree,wreath,xb1,xb4,skiss,bulb,sgift', group: '', icon: '🎄'},
  {id: 62, section: 'p1', name: 'valentine', subid: 1073741824, cost: 2610, limited: 1, description: 'Valentine smilies, (beat) (bheart) (cupid) (card) (hug2) (hug3) (ilu) (lhand) (ring) (rose) (rose2) (valentine) See wiki for details', amount: 0, topsh: 'beat,bheart,cupid,card,hug2,hug3,ilu,lhand,ring,rose,rose2', group: '', icon: '💕'},
  // Add more powers from the SQL data...
];

// Chat rooms from iXat SQL - will be created after users
const IXAT_ROOMS = [
  {
    name: 'Lobby',
    description: 'The main lobby chat room',
    maxUsers: 50,
    settings: {
      isPrivate: false,
      allowGuests: true,
      backgroundMusic: {
        enabled: true,
        url: 'http://69.64.38.76:8035/sid=1',
        volume: 30
      }
    },
    background: {
      type: 'image',
      url: 'http://oi60.tinypic.com/1r6io9.jpg'
    }
  }
];

// Sample users structure based on iXat SQL
const IXAT_SAMPLE_USERS = [
  {
    username: 'ACE',
    email: 'ace@example.com',
    passwordHash: '$2b$10$HashHere', // Will be hashed properly
    displayName: 'ACE',
    avatarId: '1',
    xats: 50000,
    days: 365,
    credits: 1000,
    level: 1,
    powers: [],
    userPowers: [
      { powerId: 13, count: 5 }, // red power
      { powerId: 14, count: 3 }, // green power
      { powerId: 15, count: 2 }  // blue power
    ]
  },
  {
    username: 'IM-Emo',
    email: 'emo@example.com', 
    passwordHash: '$2b$10$HashHere',
    displayName: 'IM-Emo',
    avatarId: '2',
    xats: 25000,
    days: 180,
    credits: 500,
    level: 1,
    powers: [],
    userPowers: [
      { powerId: 52, count: 1 }, // halloween power
      { powerId: 17, count: 2 }  // heart power
    ]
  }
];

async function importIxatData() {
  try {
    console.log('🎭 Starting iXat data import...');
    
    // Clear existing data
    await Power.deleteMany({});
    console.log('✅ Cleared existing powers');
    
    // Import sample users first
    console.log('👥 Importing sample users...');
    for (const userData of IXAT_SAMPLE_USERS) {
      try {
        const user = new User({
          username: userData.username,
          email: userData.email,
          password: 'password123', // Default password
          nickname: userData.displayName,
          avatar: userData.avatarId,
          xats: userData.xats,
          days: userData.days,
          rank: 1,
          enabled: true
        });
        await user.save();
        console.log(`  ✅ Imported user: ${userData.username}`);
      } catch (error) {
        if (error.code === 11000) {
          console.log(`  ⚠️ User ${userData.username} already exists`);
        } else {
          console.log(`  ❌ Failed to import user ${userData.username}:`, error.message);
        }
      }
    }
    
    // Import powers
    console.log('📦 Importing powers...');
    for (const powerData of IXAT_POWERS) {
      try {
        const power = new Power({
          id: powerData.id,
          name: powerData.name,
          description: powerData.description,
          cost: powerData.cost,
          subid: powerData.subid,
          section: powerData.section,
          amount: powerData.amount,
          topsh: powerData.topsh,
          group: powerData.group,
          limited: powerData.limited === 1
        });
        
        await power.save();
        console.log(`  ✅ Imported power: ${powerData.name} (${powerData.cost} xats)`);
      } catch (error) {
        console.log(`  ❌ Failed to import power ${powerData.name}:`, error.message);
      }
    }
    
    // Import rooms (after users so we can assign createdBy)
    console.log('🏠 Importing rooms...');
    const adminUser = await User.findOne({ username: 'ACE' });
    for (const roomData of IXAT_ROOMS) {
      try {
        const room = new Room({
          ...roomData,
          createdBy: adminUser._id
        });
        await room.save();
        console.log(`  ✅ Imported room: ${roomData.name}`);
      } catch (error) {
        if (error.code === 11000) {
          console.log(`  ⚠️ Room ${roomData.name} already exists`);
        } else {
          console.log(`  ❌ Failed to import room ${roomData.name}:`, error.message);
        }
      }
    }
    
    console.log('🎉 iXat data import completed!');
    console.log(`📊 Summary:`);
    console.log(`   💎 Powers: ${await Power.countDocuments()}`);
    console.log(`   🏠 Rooms: ${await Room.countDocuments()}`);
    console.log(`   👥 Users: ${await User.countDocuments()}`);
    
  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run import
importIxatData();
