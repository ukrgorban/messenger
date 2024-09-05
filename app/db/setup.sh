# Очікуємо, поки сервер PostgreSQL стане доступним
until pg_isready -h postgres -p 5432 -U postgres; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 10
done

# Спочатку видаляємо існуючі таблиці
PGPASSWORD=marcus psql -h postgres -p 5432 -U postgres -d example -f install.sql

# Створюємо нові таблиці
PGPASSWORD=marcus psql -h postgres -p 5432 -U postgres -d example -f structure.sql

# Додаємо дані
PGPASSWORD=marcus psql -h postgres -p 5432 -U postgres -d example -f data.sql
