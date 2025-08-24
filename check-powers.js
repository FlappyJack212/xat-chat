const mongoose = require('mongoose');
const Power = require('./src/server/models/Power');

async function checkPowers() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ixat_chat', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('Connected to MongoDB');
        
        const count = await Power.countDocuments();
        console.log(`Total powers in database: ${count}`);
        
        if (count > 0) {
            const powers = await Power.find().limit(10);
            console.log('First 10 powers:');
            powers.forEach(power => {
                console.log(`  - ${power.name} (ID: ${power.id}, Cost: ${power.cost} xats)`);
            });
        } else {
            console.log('No powers found in database!');
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.connection.close();
    }
}

checkPowers();
