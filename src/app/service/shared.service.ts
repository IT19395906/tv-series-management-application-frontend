import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private upcomingSubject = new BehaviorSubject<any[]>([]);
  upcomingSeries$ = this.upcomingSubject.asObservable();

  updateUpcoming(newData: any[]): void {
    this.upcomingSubject.next(newData);
  }
}
