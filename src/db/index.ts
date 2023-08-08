import * as SQLite from "expo-sqlite";
import { tables } from "../constants/tables";

export async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
  return SQLite.openDatabase("myDatabaseName.db");
}

export const initDatabase = async (database: SQLite.WebSQLDatabase) => {
  database.transaction(
    (txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tables.goals} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        startAt DATE NOT NULL,
        endAt DATE
      );`,
        []
      );

      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tables.goalsItems} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        goalId INTEGER NOT NULL, 
        date DATE,
        point INTEGER CHECK(point IN (1, 2, 3)), 
        memo TEXT,
        FOREIGN KEY (goalId) REFERENCES goals(id) 
      );`,
        []
      );
    },
    (error) => {
      console.log("error:", error);
    }
  );
};

export function queryItems<T>(
  database: SQLite.WebSQLDatabase,
  query: string
): Promise<any[]> {
  return new Promise((resolve, reject) => {
    database?.transaction(function (txn) {
      txn.executeSql(
        query,
        [],
        function (tx, res) {
          if (res.rows.length <= 0) {
            resolve([]);
          } else {
            const items = [];
            for (let i = 0; i < res.rows.length; i++) {
              items.push(res.rows.item(i));
            }
            resolve(items as T[]);
          }
        },
        function (tx, error): any {
          reject(error);
        }
      );
    });
  });
}

export function queryItem(
  database: SQLite.WebSQLDatabase,
  query: string
): Promise<any | null> {
  return new Promise((resolve, reject) => {
    database?.transaction(function (txn) {
      txn.executeSql(
        query,
        [],
        function (tx, res) {
          if (res.rows.length <= 0) {
            resolve(null);
          } else {
            resolve(res.rows.item(0));
          }
        },
        function (tx, error): any {
          reject(error);
        }
      );
    });
  });
}

export function mutateItem(
  database: SQLite.WebSQLDatabase,
  query: string,
  params: any[]
): Promise<any | null> {
  return new Promise((resolve, reject) => {
    database?.transaction(function (txn) {
      txn.executeSql(
        query,
        params,
        function (tx, res) {
          console.log("Results", res.rowsAffected, res);
          resolve({ id: res.insertId, ...params });
        },
        function (tx, error): any {
          reject(error);
        }
      );
    });
  });
}

// txn.executeSql(
//   `CREATE TABLE IF NOT EXISTS ${tables.settings}
//   (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     theme TEXT,
//     view TEXT
//   );`,
//   []
// );
