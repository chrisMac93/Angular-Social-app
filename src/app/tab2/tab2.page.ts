import { Component } from '@angular/core';
import { Post } from '../models/Posts';
import { DataService } from '../service/data.service';
import { Friend } from '../models/Friend';
import { SharedService } from '../service/shared.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  p: Post = new Post();
  friendsToDisplay : Friend[] = [];

  constructor(private data : DataService, private shared : SharedService) {
    data.getAllFriends().subscribe(list => {
      //clear the array
      this.friendsToDisplay = [];
      // filter to see only my friends

      for(let i=0; i<list.length; i++){
        let friend = list[i];
        if(friend.belongsTo == shared.userName){
          this.friendsToDisplay.push(friend);
        }
      }

      // sort the array
      this.friendsToDisplay = this.friendsToDisplay.sort((left,right) => {
        if(left.name.toLowerCase() <right.name.toLowerCase()) return -1;
        return 1;
      });
    });
  }

  post(){

    console.log('Save btn pressed');
    console.log(this.p);

    this.p.from = this.shared.userName;

    // save the post
    this.data.savePost(this.p);

    // clear the form
    this.p = new Post();
  }
}
