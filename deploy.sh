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

	cp dist/* /data/plainsong
)

(
	cd plainsong/server || exit
	cargo build --release
	mv ./target/release/plainsong-server /usr/local/bin/plainsong-server
	mv plainsong-server.service /lib/systemd/system
	systemctl start plainsong-server
)

# static

for k in "flow" "perhaps"
do
	mkdir -p /data/zkldixyz/words/$k
	cp $k/index.html /data/zkldixyz/words/$k/index.html
done

