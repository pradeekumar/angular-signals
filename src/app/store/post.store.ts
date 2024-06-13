import {computed, DestroyRef, inject} from '@angular/core';
import {delay, interval, pipe, switchMap, tap} from 'rxjs';
import {patchState, signalStore, withState, withHooks, withMethods} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {tapResponse} from '@ngrx/operators';
import {PostService} from "../services/post.service";
import {HttpErrorResponse} from "@angular/common/http";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

interface State {
  items: any[];
  isLoading: boolean;
  count: number;
  page: number
}

const initialState: State = {
  items: [],
  isLoading: false,
  count: 0,
  page: 0
};


export const PostStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, postService: PostService = inject(PostService),destroyRef =  inject(DestroyRef)) => ({
      loadData(): any {
        patchState(store, {isLoading: true})
        return postService.getPosts().pipe(delay(1000),takeUntilDestroyed(destroyRef)).subscribe((res: any) => {
          patchState(store, {items: res, count: res.length, isLoading: false})
        });
        //   pipe(tap(() => patchState(store, {isLoading: true})),
        //     switchMap(() => {
        //       console.log("sdadasasdasd")
        //       return postService.getPosts().pipe(tapResponse({
        //         next: (posts) => {
        //           // @ts-ignore
        //           patchState(store, {items: posts})
        //         },
        //         error: (error: HttpErrorResponse) => {
        //           console.debug(error.message);
        //         },
        //         finalize: () => patchState(store, {isLoading: false})
        //       }));
        //     })
        //   )

      },
      clearData(): void {
        patchState(store, {items: [], count: 0, isLoading: false})
      }
    }),

    // withMethods((store) => ({
    //   increment(): void {
    //     patchState(store, (state) => ({count: state.count + 1}));
    //   },
    //   decrement(): void {
    //     patchState(store, (state) => ({count: state.count == 0 ? state.count : dec(state.count)}));
    //   },
    //   reset(): void {
    //     patchState(store, (state) => ({count: 0}));
    //
    //   }
    // }))
  ),
  withHooks({
    onInit(store) {

    },
    onDestroy(store) {
      console.log('count on destroy', store.count());
    },
  }),

)


function dec(count: number) {
  return count - 1
}
