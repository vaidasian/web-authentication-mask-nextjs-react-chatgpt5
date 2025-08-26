#!/bin/bash

# cleanup resources
rm -rf node_modules package-lock.json .next prisma/generated

# install dependencies
npm i

# use prisma
npx prisma generate
npx prisma migrate dev --name init

# start service
npm run dev
