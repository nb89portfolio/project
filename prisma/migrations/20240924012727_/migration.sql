/*
  Warnings:

  - Made the column `errorRecordsId` on table `ErrorInstances` required. This step will fail if there are existing NULL values in that column.
  - Made the column `usersId` on table `ErrorInstances` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ErrorInstances" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "intial" DATETIME NOT NULL,
    "updated" DATETIME NOT NULL,
    "usersId" INTEGER NOT NULL,
    "errorRecordsId" INTEGER NOT NULL,
    CONSTRAINT "ErrorInstances_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ErrorInstances_errorRecordsId_fkey" FOREIGN KEY ("errorRecordsId") REFERENCES "ErrorRecords" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ErrorInstances" ("errorRecordsId", "id", "intial", "updated", "usersId") SELECT "errorRecordsId", "id", "intial", "updated", "usersId" FROM "ErrorInstances";
DROP TABLE "ErrorInstances";
ALTER TABLE "new_ErrorInstances" RENAME TO "ErrorInstances";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
