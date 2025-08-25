# start server
npx prisma generate
npx prisma migrate dev --name init
npm run dev

# start psql
lsof -i :5432
pg_ctl -D ~/postgres_data -l ~/postgres_data/logfile start

# access psql
psql -U hoggi_admin -d hoggi
SELECT * FROM "User";
DELETE FROM "User" WHERE email = 'test@example.com';
