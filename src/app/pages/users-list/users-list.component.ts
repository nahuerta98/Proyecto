import { Component, OnInit } from '@angular/core';
import { UsersList } from 'src/app/models/usersModel';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; 


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  //Excel
  fileName = 'ExcelSheet.xlsx'

  users: UsersList;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  records = [];

  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    this.getUsers(1);
  }

  //Methods
  getUsers(PageNumber:number){
    this.userService.getUsers(PageNumber).subscribe( (resp: UsersList ) => {
      if ( resp.data.length > 0 ){
        this.users = resp;
        this.currentPage = resp.pageNumber;
        this.pageSize = resp.pageSize;
        this.totalPages = resp.totalPages;
        this.totalRecords = resp.totalRecords;
        this.records = resp.data ? resp.data: []; 
      }
    });
  }
  deleteUser(id: string){
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text:'Are you sure you want to delete this user?',
      showCloseButton: true,
      showCancelButton: true,
    }).then(resp=>{
      if(resp.value){
        this.userService.deleteUser(id).subscribe();
      }
    });
  }

  //Pagination
  initialRange():number{
    if(this.currentPage === 1){
      return 1; // First Page
    } else if ( this.currentPage === this.totalPages){
      let records = this.totalRecords;
      do {
        records--;
      } while( records % this.pageSize !=0);
      return records + 1; // Get initial range of page.
    }else{
      return this.currentPage * this.pageSize - this.pageSize + 1;
    }
  }

  lastRange(): number{
    if(this.currentPage === 1){
      return this.pageSize;
    } else if(this.currentPage === this.totalPages){
      return this.totalRecords;
    } else{
      return this.currentPage * this.pageSize;
    }
  }

  firstPage(): boolean{
    return this.currentPage === 1 ? true : false;
  }

  finalPage(): boolean{
    return this.currentPage === this.totalPages ? true : false;
  }

  //Export Excel
  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }








}
