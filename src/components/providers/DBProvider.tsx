import * as SQLite from "expo-sqlite";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { initDatabase, openDatabase } from "../../db";

interface DbContextValue {
  db: SQLite.WebSQLDatabase | null;
}

export const DbContext = createContext<DbContextValue | undefined>(undefined);

export function DbProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<SQLite.WebSQLDatabase | null>(null);

  useEffect(() => {
    (async () => {
      const database = await openDatabase();
      await initDatabase(database);
      setDb(database);
    })();
  }, []);

  return <DbContext.Provider value={{ db }}>{children}</DbContext.Provider>;
}
