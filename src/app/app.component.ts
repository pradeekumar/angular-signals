import {Component, signal, WritableSignal, effect, Injector, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {count} from "rxjs";
import {CounterStore} from "./store/counter.store";
import {TestingCounterComponent} from "./testing-counter/testing-counter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestingCounterComponent],
  providers:[],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'signal-testing';
  protected count: WritableSignal<number> = signal<number>(0);
  counterStore = inject(CounterStore);
  constructor(private injector: Injector) {
  }

  updateCounter() {
    this.count.update((i: number) => i + 1);
    effect(() => {
      console.log(this.count())
    }, {
      injector: this.injector
    });
    this.counterStore.decrement();
  }
}
