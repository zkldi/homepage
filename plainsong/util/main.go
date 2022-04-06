package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var title = readline("Song Title")
	var artist = readline("Artist")
	var tags = readline("Tags")
	var album = readline("Album")
	var weirdness = readline("Weirdness")
	var fav = readline("Is Favourite? (y/N)") == "y"

	fmt.Println("Writing File...")

	var path = strings.ToLower(strings.Replace(title, " ", "_", -1))

	var data = fmt.Sprintf(
		`artist: %s
title:  %s
tags:   %s
album:  %s
weird:  %s
fav:    %t

-----

`, artist, title, tags, album, weirdness, fav)

	os.WriteFile("../recs/"+path+".recmd",
		[]byte(data),
		0644)

	fmt.Println("All done!")
}

var reader = bufio.NewReader(os.Stdin)

func readline(prompt string) string {
	fmt.Print(prompt + ": ")
	text, err := reader.ReadString('\n')

	if err != nil {
		panic(err)
	}

	return strings.TrimSpace(text)
}
