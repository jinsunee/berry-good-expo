import { DbContext } from "components/providers/DBProvider";
import { useContext } from "react";

export const useDB = () => {
  const context = useContext(DbContext);
  if (!context) {
    throw new Error("useDb must be used within a DbProvider");
  }
  return context.db;
};
