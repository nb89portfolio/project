/*
  Warnings:

  - You are about to drop the column `created` on the `ErrorInstances` table. All the data in the column will be lost.
  - Added the required column `intial` to the `ErrorInstances` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ErrorInstances" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "intial" DATETIME NOT NULL,
    "updated" DATETIME NOT NULL,
    "users" TEXT NOT NULL,
    "usersId" INTEGER NOT NULL,
    "errorRecordsId" INTEGER NOT NULL,
    CONSTRAINT "ErrorInstances_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ErrorInstances_errorRecordsId_fkey" FOREIGN KEY ("errorRecordsId") REFERENCES "ErrorRecords" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ErrorInstances" ("errorRecordsId", "id", "updated", "users", "usersId") SELECT "errorRecordsId", "id", "updated", "users", "usersId" FROM "ErrorInstances";
DROP TABLE "ErrorInstances";
ALTER TABLE "new_ErrorInstances" RENAME TO "ErrorInstances";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
