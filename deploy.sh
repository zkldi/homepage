#! /bin/bash

# DISTRO

cd distro
pnpm install && pnpm build

mkdir -p /data/zkldixyz/playground/distro
cp -r public/. /data/zkldixyz/playground/distro