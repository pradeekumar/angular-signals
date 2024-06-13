import {Component, effect, inject} from '@angular/core';
import {CounterStore} from "../store/counter.store";
import {getState} from "@ngrx/signals";
import {PostStore} from "../store/post.store";

@Component({
  selector: 'app-testing-counter',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './testing-counter.component.html',
  styleUrl: './testing-counter.component.css'
})
export class TestingCounterComponent {
  counterStore = inject(CounterStore)
  postStore = inject(PostStore)

  constructor() {
    console.log(this.counterStore)
    console.log(this.postStore)
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this.counterStore);
      console.log('books state changed', state);
    });



  }
}
