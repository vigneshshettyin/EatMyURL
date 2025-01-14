-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "imageurl" TEXT,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "short_code" TEXT NOT NULL,
    "long_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClickAnalytics" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "device" TEXT,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "timestamp" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClickAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "links_short_code_key" ON "links"("short_code");

-- CreateIndex
CREATE INDEX "links_short_code_idx" ON "links"("short_code");

-- CreateIndex
CREATE INDEX "ClickAnalytics_code_timestamp_idx" ON "ClickAnalytics"("code", "timestamp");

-- CreateIndex
CREATE INDEX "ClickAnalytics_code_idx" ON "ClickAnalytics"("code");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
