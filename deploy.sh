#! /bin/bash

# DISTRO

cd distro
pnpm install && pnpm build

mkdir -p /data/zkldixyz/playground/distro
cp -r public/. /data/zkldixyz/playground/distro

# LOGO PICKER

cd ..

mkdir -p /data/zkldixyz/playground/tachi-logo
cp tachi-logo/index.html /data/zkldixyz/playground/tachi-logo/index.html

# FLOW

mkdir -p /data/zkldixyz/playground/flow
cp flow/index.html /data/zkldixyz/playground/flow/index.html
