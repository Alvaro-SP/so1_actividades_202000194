#!/bin/bash
echo "Ingrese su usuario de Github:"
read GITHUB_USER
response=$(curl -s "https://api.github.com/users/$GITHUB_USER")
id=$(echo $response | jq '.id')
created=$(echo $response | jq '.created_at')
fecha=$(date +%Y-%m-%d)
outputs="Hola $GITHUB_USER . User ID: $id . Cuenta fue creada el: $created"
echo $outputs
mkdir -p /tmp/$fecha
echo $outputs  >> /tmp/$fecha/saludos.log
