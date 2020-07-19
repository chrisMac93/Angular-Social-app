import { Injectable } from '@angular/core';
import { Post } from '../models/Posts';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Friend } from '../models/Friend';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allPosts: Observable<Post[]>;
  postCollection: AngularFirestoreCollection<Post>;

  allFriends: Observable<Friend[]>;
  friendCollection: AngularFirestoreCollection<Friend>;


  constructor(private fb:AngularFirestore) {
    this.postCollection = fb.collection<Post>('posts');
    this.friendCollection = fb.collection<Friend>('friends');

    // read all the messages from the database and popular local array
    this.allPosts = this.postCollection.valueChanges();
    

  }

  public savePost(post : Post){
    var item = Object.assign({}, post);
    this.postCollection.add(item);
  }

  public getAllPosts(){
    // data processing
    // data validations
    // etc
    return this.allPosts;
  }

  public saveFriend(theNewFriendObject: Friend){
    var item = Object.assign({}, theNewFriendObject);
    this.friendCollection.add(item);
  }

  public removeFriend(objId : string){
    //remove object from database
    this.fb.doc("friends/" + objId).delete();
  }

  public getAllFriends(){
    //read all friends
    this.allFriends = this.friendCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(m => {
        //here we can read the object and the document id
        let id = m.payload.doc.id;
        let friend : Friend = m.payload.doc.data();
        friend.fbId = id;
        return friend;
      });
    })
   );
    return this.allFriends;
  }

}
