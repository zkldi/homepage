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
	var rating = readline("Rating")

	if rating != "1" && rating != "2" && rating != "3" {
		fmt.Println("Invalid rating. Should be 1, 2 or 3.")
		os.Exit(1)
	}

	fmt.Println("Writing File...")

	var path = strings.ToLower(strings.Replace(title, " ", "_", -1))

	var data = fmt.Sprintf(
		`artist: %s
title:  %s
tags:   %s
album:  %s
weird:  %s
rating: %s

-----

`, artist, title, tags, album, weirdness, rating)

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
