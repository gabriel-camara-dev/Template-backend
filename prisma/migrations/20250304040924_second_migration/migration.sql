-- AlterTable
ALTER TABLE "users" ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "login_attempts" INTEGER NOT NULL DEFAULT 0;
