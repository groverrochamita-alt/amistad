-- CreateTable
CREATE TABLE "Visita" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apPaterno" TEXT NOT NULL,
    "apMaterno" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visita_pkey" PRIMARY KEY ("id")
);
