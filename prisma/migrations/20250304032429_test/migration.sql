-- CreateTable
CREATE TABLE "MyClient" (
    "id" SERIAL NOT NULL,
    "name" CHAR(250) NOT NULL,
    "slug" CHAR(100) NOT NULL,
    "isProject" VARCHAR(30) NOT NULL DEFAULT '0',
    "selfCapture" CHAR(1) NOT NULL DEFAULT '1',
    "clientPrefix" CHAR(4) NOT NULL,
    "clientLogo" CHAR(255) NOT NULL DEFAULT 'no-image.jpg',
    "address" TEXT,
    "phoneNumber" CHAR(50),
    "city" CHAR(50),
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),
    "deletedAt" TIMESTAMP(0),

    CONSTRAINT "MyClient_pkey" PRIMARY KEY ("id")
);
