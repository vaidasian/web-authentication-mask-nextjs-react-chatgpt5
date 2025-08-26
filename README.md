# start server
```console
bash ./scripts/start-service.sh
```

# install psql
```bash
brew install postgresql
```

# start psql
```bash
lsof -i :5432
pg_ctl -D ~/postgres_data -l ~/postgres_data/logfile start
```

# access psql
```bash
psql -U hoggi_admin -d hoggi
SELECT * FROM "User";
DELETE FROM "User" WHERE email = 'test@example.com';
````
