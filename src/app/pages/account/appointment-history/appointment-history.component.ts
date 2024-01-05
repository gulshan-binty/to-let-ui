import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from 'src/app/interfaces/common/user.interface';
import { UserDataService } from 'src/app/services/common/user-data.service';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.scss'],
})
export class AppointmentHistoryComponent {
  requestAppointments = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'submissionDate',
    'status',
    'actions',
  ];
  user: User;
  constructor(private userDataService: UserDataService,
    private cdr:ChangeDetectorRef) {}
  ngOnInit(): void {
    this.requestAppointments =
      JSON.parse(localStorage.getItem('requestAppointments')) || [];
  }

  private getLoggedInUserInfo() {
    this.userDataService.getLoggedInUserData().subscribe(
      (res) => {
        if (res) {
          this.user = res.data;
          if (this.user?.phoneNo !== '01521215390') {
            this.displayedColumns = [
              'name',
              'email',
              'phone',
              'submissionDate',
            ];
            this.cdr.detectChanges();
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
