-- CreateTable
CREATE TABLE "ReportedError" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "componentStack" TEXT NOT NULL,
    "digest" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "severity" INTEGER NOT NULL,

    CONSTRAINT "ReportedError_pkey" PRIMARY KEY ("id")
);
