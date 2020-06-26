export const SEND_MESSAGE   = 'SEND_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const LOAD_TESTS     = 'LOAD_TESTS';
export const SAVE_TEST      = 'SAVE_TEST';

export interface IAllTests {
  user: string
  message: string
  timestamp: number
}

interface ILoadTests {
  type: typeof LOAD_TESTS
  payload: IAllTests
}

export interface Message {
  user: string
  message: string
  timestamp: number
}

interface SendMessageAction {
  type: typeof SEND_MESSAGE
  payload: Message
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE
  meta: {
    timestamp: number
  }
}

export type ChatActionTypes = SendMessageAction | DeleteMessageAction;

export type ILoadTestsTypes = ILoadTests;
