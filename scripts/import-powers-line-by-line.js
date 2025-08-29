const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
const uri = 'mongodb://localhost:27017/ixat_chat';
const client = new MongoClient(uri);

async function importPowersFromSQL() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('ixat_chat');
        const powersCollection = db.collection('powers');

        // Clear existing powers
        await powersCollection.deleteMany({});
        console.log('Cleared existing powers');

        // Read the SQL file
        const sqlFilePath = path.join(__dirname, '..', 'Ixat Files', '_server', 'database.sql');
        const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
        const lines = sqlContent.split('\n');

        let totalPowers = 0;
        let inPowersInsert = false;
        let currentValues = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Check if we're starting a powers INSERT
            if (line.startsWith('INSERT INTO `powers`')) {
                inPowersInsert = true;
                currentValues = [];
                console.log(`Found powers INSERT at line ${i + 1}`);
                continue;
            }
            
            // If we're in a powers INSERT, look for VALUES
            if (inPowersInsert && line.startsWith('VALUES')) {
                // Extract the first row from this line
                const valuesMatch = line.match(/VALUES\s*\(([^)]+)\)/);
                if (valuesMatch) {
                    const values = parseSQLValues(valuesMatch[1]);
                    if (values.length >= 10) {
                        await insertPower(powersCollection, values, totalPowers);
                        totalPowers++;
                    }
                }
                continue;
            }
            
            // If we're in a powers INSERT, look for additional rows
            if (inPowersInsert && line.startsWith('(') && line.endsWith('),')) {
                // Remove the trailing comma and parse
                const cleanLine = line.slice(0, -1);
                const values = parseSQLValues(cleanLine);
                if (values.length >= 10) {
                    await insertPower(powersCollection, values, totalPowers);
                    totalPowers++;
                }
                continue;
            }
            
            // If we're in a powers INSERT, look for the last row (no comma)
            if (inPowersInsert && line.startsWith('(') && line.endsWith(');')) {
                // Remove the semicolon and parse
                const cleanLine = line.slice(0, -1);
                const values = parseSQLValues(cleanLine);
                if (values.length >= 10) {
                    await insertPower(powersCollection, values, totalPowers);
                    totalPowers++;
                }
                // End of this INSERT statement
                inPowersInsert = false;
                console.log(`Completed INSERT statement, total powers so far: ${totalPowers}`);
                continue;
            }
            
            // If we're in a powers INSERT, look for continuation rows
            if (inPowersInsert && line.startsWith('(') && line.includes(',')) {
                const values = parseSQLValues(line);
                if (values.length >= 10) {
                    await insertPower(powersCollection, values, totalPowers);
                    totalPowers++;
                }
                continue;
            }
        }

        console.log(`\n✅ Successfully imported ${totalPowers} powers to MongoDB!`);
        
        // Verify the import
        const count = await powersCollection.countDocuments();
        console.log(`Total powers in database: ${count}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

async function insertPower(collection, values, index) {
    const power = {
        id: parseInt(values[0]) || 0,
        section: values[1] || 'p0',
        name: values[2] || '',
        subid: parseInt(values[3]) || 0,
        cost: parseInt(values[4]) || 0,
        limited: parseInt(values[5]) || 0,
        description: values[6] || '',
        amount: parseInt(values[7]) || 0,
        topsh: values[8] || '',
        group: values[9] || ''
    };

    try {
        await collection.insertOne(power);
        if (index % 50 === 0) {
            console.log(`Imported ${index} powers...`);
        }
    } catch (err) {
        console.error(`Error inserting power ${power.id}:`, err.message);
    }
}

function parseSQLValues(valuesString) {
    const values = [];
    let current = '';
    let inQuotes = false;
    let i = 0;
    
    while (i < valuesString.length) {
        const char = valuesString[i];
        
        if (char === "'" && (i === 0 || valuesString[i-1] !== '\\')) {
            inQuotes = !inQuotes;
            i++;
            continue;
        }
        
        if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
            i++;
            continue;
        }
        
        current += char;
        i++;
    }
    
    // Add the last value
    if (current.trim()) {
        values.push(current.trim());
    }
    
    // Clean up the values (remove quotes, handle NULL, etc.)
    return values.map(value => {
        value = value.trim();
        if (value === 'NULL') return '';
        if (value.startsWith("'") && value.endsWith("'")) {
            return value.slice(1, -1).replace(/\\'/g, "'");
        }
        return value;
    });
}

// Run the import
importPowersFromSQL().catch(console.error);
