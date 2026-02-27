import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartFabService {
  private bumpTrigger = new Subject<void>();
  bumpTrigger$ = this.bumpTrigger.asObservable();

  triggerBump(): void {
    this.bumpTrigger.next();
  }
}
