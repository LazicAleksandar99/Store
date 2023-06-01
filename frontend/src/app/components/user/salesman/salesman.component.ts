import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.css']
})
export class SalesmanComponent implements OnInit {
  salesmans!: User[];

  constructor(private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getSalesmans();
  }

  getSalesmans(): void{
    this.userService.getSalesmans().subscribe(
      data=>{
        this.salesmans = data as User[];
      }, error =>{
        console.log('Error occurred at salesman.component.ts')
      }
    );
  }

  Verify(id: number, status: string){
    this.userService.verify(id,status).subscribe(
      data=>{
        this.toastr.success('User verified successfully!', 'Succes!', {
          timeOut: 3000,
          closeButton: true,
        });
      }, error =>{
        this.toastr.error("Something went wrong", 'Error!', {
          timeOut: 3000,
          closeButton: true,
        });
      }

    );
  }

}
