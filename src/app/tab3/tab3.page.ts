import { Component } from '@angular/core';
import { Friend } from '../models/Friend';
import { DataService } from '../service/data.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  model : Friend = new Friend();
  friendsToDisplay : Friend[]= [];

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

  register() {

    // set belongsTo to model
    this.model.belongsTo = this.shared.userName;

    // send object to data service
    this.data.saveFriend(this.model);

    //clear the form
    this.model = new Friend();
  }

  unfriend(friendToRemove : Friend){
    this.data.removeFriend(friendToRemove.fbId)
  }
}
