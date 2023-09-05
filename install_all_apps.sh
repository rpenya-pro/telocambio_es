#!/bin/bash

# Iniciar en el directorio de la aplicación host
cd host-app
yarn install
cd ..

# Lista de aplicaciones adicionales
apps=("app-navigation" "app-landing" "app-footer" "app-shared" "app-dashboard")

# Iterar sobre cada aplicación y hacer yarn install
for app in "${apps[@]}"
do
  echo "Installing dependencies for $app"
  cd $app
  yarn install
  cd ..
done

echo "All dependencies installed."
