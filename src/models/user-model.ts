export class UserModel {

    username:string = null;
    displayname:string = null;
    email:string = null;
    iconPath:string = null;
    role:string = null;

    constructor(data) {
         this.username = data[0].username;
         this.displayname = data[0].displayname;
         this.email = data[0].email;
         this.iconPath = data[0].iconPath;
         this.role = data[0].role;
    }


}