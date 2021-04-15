import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersList } from 'src/app/models/usersModel';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user:  User;

  constructor( private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  //Form Declaration
  addUser : FormGroup;

  ngOnInit(): void {
    this.addUser = this.fb.group({
      id :['',[Validators.required]],
      firstName :['',[Validators.required]],
      lastName :['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      birthDate: ['', [Validators.required]],
      roleId:['', [Validators.required]],
      createdAt:['', [Validators.required]]
    });

    

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new'){
      this.userService.getUser(id)
      .subscribe(( user: User) =>{
        this.user = user;
        this.loadData(this.user);
      });
    } else{
      this.loadData(null)
    }
  }

  //Validation Method
  validation(controlName: string): boolean{
    return this.addUser.get(controlName).valid
  }
  loadData(user: any){
    if(user !== null){
      this.addUser.reset({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthDate: new Date(user.birthDate),
        roleId: user.roleId,
        createdAt: user.createdAt
      });
    } else{
      this.addUser.reset({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        roleId: '',
        createdAt: ''
      });
    }
  }

  userSubmit(){
    if( this.addUser.invalid){
      console.log( "Invalid Form");
      return;
    }

    Swal.fire({
      icon: 'info',
      title:'Saving Information',
      text: 'Wait while the information is updated...'
    });

    Swal.showLoading();

    let id = this.addUser.get('id').value;
    let body = this.addUser.getRawValue();
    this.userService.updateUser(id,body)
    .subscribe(resp =>{
     Swal.fire({
       icon: 'success',
       title: this.user.firstName  + '&nbsp;' +  this.user.lastName,
       text: 'Information successfully saved'
     });
      this.router.navigate(['/usersList']);
    });


   

  

    

  }

}
