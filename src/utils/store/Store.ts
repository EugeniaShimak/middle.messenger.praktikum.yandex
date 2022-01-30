import EventBus from '../services/EventBus';
import {IChat, IChatData} from '../../templates/chat';
import {IUserInfo} from '../../controllers/User.controller';

interface IState  {
  user: IUserInfo | null,
  chats: IChat[],
  chatData: IChatData,
}

export const StoreEvents  = {
  UPDATED: 'UPDATED'
}

export const initialState: IState = {
  user: null,
  chats: [],
  chatData: {
    id: undefined,
    messages: [],
  },
};

export class Store {
  private static _instance: Store | null;

  public readonly eventBus: EventBus;

  private _state: IState;

  constructor() {
    if (Store._instance) {
      return Store._instance;
    }

    this.eventBus = new EventBus();
    this._state = this._makeStoreProxy(initialState);
    Store._instance = this;
  }

  private _makeStoreProxy(state: IState) {
    return new Proxy<typeof state>(state, {
      set: (target, prop, value) => {
        // @ts-ignore
        target[prop] = value;
        this.eventBus.emit(StoreEvents.UPDATED);
        return true;
      },
    });
  }

  get state(): IState {
    return this._state;
  }

  public setState(data: Partial<IState>) {
    Object.assign(this._state, data);
  }
}

export const store = new Store();
