import { merge, Observable, OperatorFunction } from "rxjs";
import { withLatestFrom } from "rxjs/operators";

/**
 * Replays the last item emitted by the source observable, whenever
 * selector emits.
 */
export const replayLastWhen = <T>(
  selector$: Observable<any>
): OperatorFunction<T, T> => source$ =>
  merge(source$, selector$.pipe(withLatestFrom(source$, (_, val) => val)));
