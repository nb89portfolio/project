-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ErrorRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "digest" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ErrorInstances" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "errorRecordId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "created" DATETIME NOT NULL,
    "updated" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ErrorRecord_id_key" ON "ErrorRecord"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ErrorInstances_id_key" ON "ErrorInstances"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ErrorInstances_errorRecordId_key" ON "ErrorInstances"("errorRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "ErrorInstances_userId_key" ON "ErrorInstances"("userId");
