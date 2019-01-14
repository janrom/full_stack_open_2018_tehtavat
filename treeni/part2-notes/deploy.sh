#!/bin/sh
npm run build
rm -rf ../part3-notes-backend/build
cp -r build ../part3-notes-backend/
