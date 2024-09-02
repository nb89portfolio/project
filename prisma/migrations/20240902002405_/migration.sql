/*
  Warnings:

  - The primary key for the `ErrorRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ErrorRecord` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ErrorRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "digest" TEXT NOT NULL
);
INSERT INTO "new_ErrorRecord" ("digest", "id", "message", "name", "stack") SELECT "digest", "id", "message", "name", "stack" FROM "ErrorRecord";
DROP TABLE "ErrorRecord";
ALTER TABLE "new_ErrorRecord" RENAME TO "ErrorRecord";
CREATE UNIQUE INDEX "ErrorRecord_id_key" ON "ErrorRecord"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
