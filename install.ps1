# Lista de nombres de las aplicaciones de microfrontend
$apps = @(
    "host-app",
    "app-landing",
    "app-footer",
    "app-navigation",
    "app-profile",
    "app-shared",
    "app-dashboard"
)

# Navega a cada directorio de la aplicación y ejecuta 'yarn install'
foreach ($app in $apps) {
    Write-Host "Instalando dependencias en $app..."
    Set-Location -Path $app
    yarn install
    Set-Location -Path ..
}

Write-Host "Todas las aplicaciones han sido instaladas."
