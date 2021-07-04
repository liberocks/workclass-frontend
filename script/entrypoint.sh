#!/bin/bash

echo "GATSBY_API_URL=$GATSBY_API_URL" > .env
yarn serve -p 1234 -H "0.0.0.0"