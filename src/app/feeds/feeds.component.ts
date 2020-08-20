import { Component, OnInit, Input, Output } from '@angular/core';


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
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  @Input() feeds;
  constructor() { }

  ngOnInit() {
  }

}