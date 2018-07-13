export class Appointment {
    constructor(
        public user?:string,
        public date?: Date,
        public status?: string,
        public price?: number,
        public therapist?: string,
        public service?: string,
        public branchOffice?: string,
        public _id?:string
){

    }
}