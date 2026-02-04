#!/bin/sh
set -e

echo "🚀 Starting deployment automation..."

# 1. Fix Permissions (Critical for runtime volumes)
echo "🔧 Fixing permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# 2. Cache Configuration (Critical for Env Var loading)
echo "🧊 Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 2.5 Wait for Database (Critical)
echo "⏳ Waiting for database..."
until mysqladmin ping -h"$DB_HOST" -u"$DB_USERNAME" -p"$DB_PASSWORD" --silent; do
    echo "Waiting for database connection..."
    sleep 2
done

# 3. Database Migration
echo "📦 Running migrations..."
php artisan migrate --force

# 4. Data Population
echo "🌱 Syncing initial data..."
# Run sync only if we want to ensure data exists.
# Using || true to prevent crash if external API fails, but user wants it to run.
php artisan app:sync-bars || echo "⚠️ Warning: Data sync encountered an issue, but continuing..."

echo "✅ Ready to serve!"

# 5. Start Main Process
exec "$@"
