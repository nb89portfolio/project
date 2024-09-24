/*
  Warnings:

  - You are about to drop the column `errorInstances` on the `ErrorRecords` table. All the data in the column will be lost.
  - You are about to drop the column `errorInstances` on the `Users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ErrorInstances" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL,
    "updated" DATETIME NOT NULL,
    "users" TEXT NOT NULL,
    "usersId" INTEGER,
    "errorRecordsId" INTEGER,
    CONSTRAINT "ErrorInstances_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ErrorInstances_errorRecordsId_fkey" FOREIGN KEY ("errorRecordsId") REFERENCES "ErrorRecords" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ErrorInstances" ("created", "id", "updated", "users") SELECT "created", "id", "updated", "users" FROM "ErrorInstances";
DROP TABLE "ErrorInstances";
ALTER TABLE "new_ErrorInstances" RENAME TO "ErrorInstances";
CREATE TABLE "new_ErrorRecords" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "digest" TEXT NOT NULL
);
INSERT INTO "new_ErrorRecords" ("digest", "id", "message", "name", "stack") SELECT "digest", "id", "message", "name", "stack" FROM "ErrorRecords";
DROP TABLE "ErrorRecords";
ALTER TABLE "new_ErrorRecords" RENAME TO "ErrorRecords";
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL
);
INSERT INTO "new_Users" ("id", "username") SELECT "id", "username" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
