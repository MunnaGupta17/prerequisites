-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SCAM', 'VISA', 'MONEY', 'TRANSPORT', 'FOOD', 'CULTURE', 'PACKING', 'ACCOMMODATION', 'GENERAL');

-- CreateEnum
CREATE TYPE "TravellerType" AS ENUM ('SOLO', 'COUPLE', 'FAMILY', 'GROUP', 'BUDGET', 'LUXURY');

-- CreateTable
CREATE TABLE "Destination" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "description" TEXT,
    "visaInfo" TEXT,
    "currency" TEXT,
    "bestSeason" TEXT,
    "budgetRange" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tip" (
    "id" SERIAL NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "travellerType" "TravellerType" NOT NULL DEFAULT 'SOLO',
    "authorName" TEXT,
    "authorFrom" TEXT,
    "bestMonths" TEXT[],
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "tipId" INTEGER NOT NULL,
    "direction" INTEGER NOT NULL,
    "voterIp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_tipId_voterIp_key" ON "Vote"("tipId", "voterIp");

-- AddForeignKey
ALTER TABLE "Tip" ADD CONSTRAINT "Tip_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_tipId_fkey" FOREIGN KEY ("tipId") REFERENCES "Tip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
