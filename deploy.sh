#! /bin/bash

# DISTRO

cd distro || exit
pnpm install && pnpm build

mkdir -p /data/zkldixyz/playground/distro
cp -r public/. /data/zkldixyz/playground/distro

# LOGO PICKER

cd ..

mkdir -p /data/zkldixyz/playground/tachi-logo
cp tachi-logo/index.html /data/zkldixyz/playground/tachi-logo/index.html

# static

for k in "flow" "perhaps"
do
	mkdir -p /data/zkldixyz/words/$k
	cp $k/index.html /data/zkldixyz/words/$k/index.html
done

