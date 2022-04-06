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

# PLAINSONG

mkdir -p /data/plainsong

(
	cd plainsong/client || exit
	pnpm install && pnpm build

	cp -r dist/* /data/plainsong
)

(
	cd plainsong/server || exit
	source "$HOME"/.cargo/env
	~/.cargo/bin/cargo run || exit
	mv parsed-recmds.json /data/plainsong/assets
)

# static

for k in "flow" "perhaps"
do
	mkdir -p /data/zkldixyz/words/$k
	cp $k/index.html /data/zkldixyz/words/$k/index.html
done

