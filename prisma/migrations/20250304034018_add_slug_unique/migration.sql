/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `MyClient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MyClient_slug_key" ON "MyClient"("slug");
