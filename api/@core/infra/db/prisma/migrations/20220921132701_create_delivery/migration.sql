-- CreateTable
CREATE TABLE "delivery" (
    "id" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,
    "id_deliveryman" TEXT NOT NULL,
    "name_item" TEXT NOT NULL,
    "size_item" TEXT NOT NULL,
    "startPosition" DOUBLE PRECISION[],
    "endPosition" DOUBLE PRECISION[],
    "status" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "delivery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliveryman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
