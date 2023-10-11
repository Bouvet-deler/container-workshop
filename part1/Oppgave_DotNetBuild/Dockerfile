FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env

WORKDIR /home/app

RUN git clone https://github.com/stenbror/GraphQL_DotNet_Example.git

WORKDIR /home/app/GraphQL_DotNet_Example

RUN dotnet restore
RUN dotnet build
RUN dotnet publish -c Release -o out
