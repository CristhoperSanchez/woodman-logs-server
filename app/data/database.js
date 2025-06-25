import DatabaseConstructor from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Resolve path to ./data/pdf.db in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = path.resolve(__dirname, 'database.db');

const db = new DatabaseConstructor(dbPath);

const capitalizeString = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  


class DataBaseManager {
    constructor(database) {
        this.DB = database;
    }

    PrepareDatabase() {

        try {
            this.DB.prepare(`
                CREATE TABLE IF NOT EXISTS event_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                application TEXT,
                environment TEXT,
                statusCode INTEGER,
                level TEXT CHECK(level IN ('Fatal', 'Error', 'Warn', 'Info', 'Debug', 'Trace')) NOT NULL,
                status TEXT,
                dateRecieved DATETIME DEFAULT CURRENT_TIMESTAMP,
                stack TEXT,
                message TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )`).run();
        } catch(error) {
            console.error("Error Loading/Creating Database")
            console.error(error)

        }
    }

    InsertLog(logObject) {

        console.log("Log Object being inserted: ", logObject)
        try {
            const stmt = this.DB.prepare(`
                INSERT INTO event_logs (
                    application, environment, statusCode, level,
                    status, stack, message, timestamp
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `);
    
            const result = stmt.run(
                logObject.application,
                logObject.environment,
                logObject.statusCode,
                capitalizeString(logObject.level),
                logObject.status,
                logObject.stack,
                logObject.message,
                logObject.timestamp
            );
    
            console.log("Result: ", result);
            return result;
        } catch (error) {
            console.log("Error adding record: ", error);
            return;
        }
    }
    


}


// Usage
export const DB = new DataBaseManager(db);
DB.PrepareDatabase();
export default DB; // optional, in case you want default import
