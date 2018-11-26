import React, { useContext, useEffect } from "react";
import { combineReducers, Reducer, Store } from "redux";
import { Epic } from "redux-observable";
import { Subject } from "rxjs";

interface InjectorProps {
  epics?: Epic[];
  reducers?: Record<string, Reducer>;
}

interface InjectionProviderProps {
  store: Store;
  epicSubject: Subject<Epic>;
  defaultReducers: Record<string, Reducer>;
}

interface ContextValue {
  inject: (props: InjectorProps) => void;
}

const InjectionContext = React.createContext<ContextValue>({
  inject: () => undefined
});

export class Inject extends React.Component<InjectorProps> {
  componentWillMount() {
    this.context.inject(this.props);
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
Inject.contextType = InjectionContext;

// export const Inject: React.SFC<InjectorProps> = ({
//   epics,
//   reducers,
//   children
// }) => {
//   const context = useContext(InjectionContext);

//   debugger;
//   useEffect(() => {
//     debugger;

//   }, []);

// };

export class InjectionProvider extends React.Component<InjectionProviderProps> {
  injectedReducers: Record<string, Reducer> = this.props.defaultReducers;
  injectedEpics: WeakSet<Epic> = new WeakSet();

  value: ContextValue = {
    inject: ({ epics, reducers }) => {
      this.injectEpics(epics);
      this.injectReducers(reducers);
    }
  };

  injectEpics(epics?: Epic[]) {
    if (epics === undefined) {
      return;
    }

    epics.forEach(epic => {
      if (this.injectedEpics.has(epic)) {
        return;
      }

      this.props.epicSubject.next(epic);
      this.injectedEpics.add(epic);
    });
  }

  injectReducers(reducers?: Record<string, Reducer>) {
    if (reducers === undefined) {
      return;
    }

    this.injectedReducers = {
      ...this.injectedReducers,
      ...reducers
    };

    console.log(this.injectedReducers);

    this.props.store.replaceReducer(combineReducers(this.injectedReducers));
  }

  render() {
    return (
      <InjectionContext.Provider value={this.value}>
        {this.props.children}
      </InjectionContext.Provider>
    );
  }
}
