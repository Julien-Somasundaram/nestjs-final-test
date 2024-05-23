-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "userId" SET DATA TYPE TEXT;
