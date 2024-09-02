-- CreateTable
CREATE TABLE "UserId" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ErrorInstances" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "errorId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "updated" DATETIME NOT NULL,
    CONSTRAINT "ErrorInstances_errorId_fkey" FOREIGN KEY ("errorId") REFERENCES "ErrorRecord" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ErrorInstances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserId" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserId_id_key" ON "UserId"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserId_username_key" ON "UserId"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ErrorInstances_id_key" ON "ErrorInstances"("id");
