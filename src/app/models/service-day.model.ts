import { BranchOffice } from './branch-office.model';
export class ServiceDay{
    constructor(
        public day_desc?:string,
        public businessHours?:string,
        public branchOffice?:BranchOffice,
        public _id?:string
    ){}
}