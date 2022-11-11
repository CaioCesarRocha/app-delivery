FROM node:18-slim

WORKDIR /home/src/api

COPY . .


CMD ["sh", "-c","npm install && cd src && cd @core && cd infra && cd db && cd prisma && npx prisma migrate dev && npm run express"]
