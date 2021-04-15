# ==================================
#          Frontend build
# ==================================
FROM node:12.13.0-alpine as build-frontend
WORKDIR /app

ARG PUBLIC_URL=""

COPY src/AzureFileShareExplorer/ClientApp/package.json src/AzureFileShareExplorer/ClientApp/package-lock.json ./
RUN npm install
RUN npm install -g cross-env

COPY src/AzureFileShareExplorer/ClientApp/. ./
RUN cross-env PUBLIC_URL=$PUBLIC_URL npm run build

# ==================================
#          Backend build
# ==================================
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-backend
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY src/**/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# ==================================
#           Runtime image
# ==================================
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-backend /app/out .
COPY --from=build-frontend /app/build ./ClientApp/build

EXPOSE 5000

ENV ASPNETCORE_ENVIRONMENT Production

ENTRYPOINT ["dotnet", "AzureFileShareExplorer.dll"]
