FROM node:20-alpine

WORKDIR /app

# 1) package files
COPY package*.json ./

# 2) prisma schema muss VOR npm ci rein (wegen postinstall/prisma generate)
COPY prisma ./prisma

# 3) deps installieren
RUN npm install

# 4) restlicher code
COPY . .

# 5) build (macht optional nochmal prisma generate via build script)
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm","run","start"]