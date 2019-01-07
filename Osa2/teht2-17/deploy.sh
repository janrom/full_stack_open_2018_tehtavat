#!/bin/bash

# kopioi edellisen Puhelinluettelo projektin tiedostot uuteen projektiin
# 1. luo uusi projekti: npx create-react-app uusi-projekti
# 2. kopioi tama tiedosto uuden projektin juurihakemistoon
# 2. avaa kopioitu tiedosto ja tarkista SOURCEDIR seka kopiointi- ja npm/awk-komennot
# 5. suorita skripti uuden projektin juurihakemistossa

# polku edellisen projektin juurihakemistoon
SOURCEDIR=../teht2-16

# tiedostojen kopiointikomennot
cp $SOURCEDIR/db.json .
cp $SOURCEDIR/src/index.js src/
cp $SOURCEDIR/src/App.js src/
cp -r $SOURCEDIR/src/components/ src/
cp -r $SOURCEDIR/src/services/ src/

# npm-pakettien asennuskomennot
npm install json-server --save
npm install axios --save

#lisaa skriptin package.json tiedoston 'scripts'-osioon. skripti kaynnistaa json-palvelimen portiin 3001, komennolla 'npm run server'
awk '/scripts/ { print; print "    \"server\": \"json-server -p3001 db.json\""; next }1' package.json
