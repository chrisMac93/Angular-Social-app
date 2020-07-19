import { SharedService } from '../service/shared.service';

export class Friend {
    public name : string = ""; // actual name of friend
    public belongsTo : string = ""; // <- to specify it belongs to me

    /** Fire Base Id used to remove the object from db */
    public fbId : string = '';

    constructor() {}
}