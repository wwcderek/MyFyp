export class UserModel {
    user_id:any = null;
    username:string = null;
    displayname:string = null;
    email:string = null;
    iconPath:string = null;
    role:string = null;

    constructor(data) {
        this.user_id= data[0].user_id;
         this.username = data[0].username;
         this.displayname = data[0].displayname;
         this.email = data[0].email;
         this.iconPath = data[0].iconPath;
         this.role = data[0].role;
    }


}