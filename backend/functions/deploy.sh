#!/bin/bash

ENV=$1
CREDENTIALS_PATH=$2

if [ "$ENV" = "dev" ]; then
    echo "Deploying to development environment..."
    cp .env.dev .env
    PROJECT="four-birds-dev"
elif [ "$ENV" = "prod" ]; then
    echo "Deploying to production environment..."
    cp .env.prod .env
    PROJECT="four-birds-409101"
else
    echo "No environment is set."
    exit 1
fi

export GOOGLE_APPLICATION_CREDENTIALS=$CREDENTIALS_PATH

read -p "Do you continue? [y/N]: " CONFIRM
if [[ $CONFIRM =~ ^[Yy]$ ]]; then
    tsc
    firebase deploy --only functions --project=$PROJECT
else
    echo "Deploying cancelled."
    exit 1
fi

cleanup() {
    echo "Cleaning up..."
    rm -f .env
    unset GOOGLE_APPLICATION_CREDENTIALS
}

trap cleanup EXIT
