-- CreateTable
CREATE TABLE "Homedb" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Homedb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Homedb_id_key" ON "Homedb"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Homedb_img_key" ON "Homedb"("img");
