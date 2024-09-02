-- CreateTable
CREATE TABLE "ErrorRecord" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "digest" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ErrorRecord_id_key" ON "ErrorRecord"("id");
