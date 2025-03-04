-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'NORMAL_USER');

-- CreateEnum
CREATE TYPE "AUTHENTICATION_STATUS" AS ENUM ('SUCCESS', 'USER_NOT_EXISTS', 'INCORRECT_PASSWORD', 'BLOCKED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_digest" TEXT NOT NULL,
    "role" "USER_ROLE" NOT NULL DEFAULT 'NORMAL_USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authentication_audit" (
    "id" SERIAL NOT NULL,
    "ip_address" TEXT,
    "remote_port" TEXT,
    "browser" TEXT,
    "status" "AUTHENTICATION_STATUS" NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authentication_audit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_id_idx" ON "users"("id");

-- AddForeignKey
ALTER TABLE "authentication_audit" ADD CONSTRAINT "authentication_audit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
