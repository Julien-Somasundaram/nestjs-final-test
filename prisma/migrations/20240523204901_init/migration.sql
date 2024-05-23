/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_name_userId_key" ON "Task"("name", "userId");
