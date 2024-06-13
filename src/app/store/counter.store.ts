import {patchState, signalStore, withState, withHooks, withMethods} from '@ngrx/signals';

export const CounterStore = signalStore(
  {providedIn: 'root'},
  withState({count: 0}),
  withMethods((store) => ({
    increment(): void {
      patchState(store, (state) => ({count: state.count + 1}));
    },
    decrement(): void {
      patchState(store, (state) => ({
        count: state.count == 0 ? state.count : dec(state.count)
      }));
    },
    reset(): void {
      patchState(store, (state) => ({count: 0}));

    }
  }))
);


function dec(count: number) {
  return count - 1
}
