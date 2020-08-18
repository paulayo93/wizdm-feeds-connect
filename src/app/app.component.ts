import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";

export interface wmCard {
  username?: string,
  moreVert?: string,
  userImage?: string,
  avatar?: string,
  postMsg?: string,
  postImage? : string,
  color?: string,
  created?: string
}

@Component({
  selector: "body",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  card: wmCard = {
    username: "Wizdm.io",
    moreVert: "Compassionate development",
    avatar: "https://octodex.github.com/images/saritocat.png",
    userImage:
      "https://images.unsplash.com/photo-1421526053088-51b69c8a8d59?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7f00bcff27bf4fd8062358af0c28c653&auto=format&fit=crop&w=1946&q=80",
    color: "blue",
    postImage: "https://images.unsplash.com/photo-1421526053088-51b69c8a8d59?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7f00bcff27bf4fd8062358af0c28c653&auto=format&fit=crop&w=1946&q=80",
    postMsg:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet nec ullamcorper sit amet risus nullam eget felis."
  };

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
