#!/bin/sh

ROOT_DIR=/app

# Replace env vars in JavaScript files
echo "Replacing env constants in JS"
for file in $ROOT_DIR/js/app.*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js; do
  echo "Processing $file ..."

  sed -i 's|VUE_APP_AAD_CLIENT_ID|'${VUE_APP_AAD_CLIENT_ID}'|g' $file
  sed -i 's|VUE_APP_AAD_LOGIN_AUTHORITY|'${VUE_APP_AAD_LOGIN_AUTHORITY}'|g' $file

done

echo "Starting Nginx"
nginx -g 'daemon off;'
