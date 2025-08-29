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

        // Extract all INSERT statements for powers - use multiline regex that captures everything until the final semicolon
        const powersMatches = sqlContent.match(/INSERT INTO `powers`[\s\S]*?;/g);
        
        if (!powersMatches) {
            console.log('No powers INSERT statements found');
            return;
        }

        console.log(`Found ${powersMatches.length} powers INSERT statements`);

        let totalPowers = 0;

        for (const insertStatement of powersMatches) {
            console.log(`Processing INSERT statement: ${insertStatement.substring(0, 100)}...`);
            
            // Extract VALUES part - handle multiline
            const valuesMatch = insertStatement.match(/VALUES\s*\(([\s\S]*?)\);/);
            if (!valuesMatch) {
                console.log('No VALUES found in statement');
                continue;
            }

            const valuesString = valuesMatch[1];
            console.log(`Values string length: ${valuesString.length}`);
            
            // Split by ),( to get individual rows
            const rows = valuesString.split('),(');
            console.log(`Found ${rows.length} rows`);
            
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                
                // Clean up first and last row
                if (i === 0) row = row.replace(/^\(/, '');
                if (i === rows.length - 1) row = row.replace(/\)$/, '');
                
                // Parse the values
                const values = parseSQLValues(row);
                
                if (values.length >= 10) {
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
                        await powersCollection.insertOne(power);
                        totalPowers++;
                        if (totalPowers % 50 === 0) {
                            console.log(`Imported ${totalPowers} powers...`);
                        }
                    } catch (err) {
                        console.error(`Error inserting power ${power.id}:`, err.message);
                    }
                } else {
                    console.log(`Row ${i} has ${values.length} values, expected 10: ${row.substring(0, 100)}...`);
                }
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
