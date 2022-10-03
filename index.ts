import { Data, InitResponse, Response, State } from '@retter/rdk'

export async function authorizer(data: Data): Promise<Response> {
  const { identity, isAnonymous } = data.context

  if (identity === 'developer') return { statusCode: 200 }

  if (isAnonymous) {
    return { statusCode: 403 }
  }
  return { statusCode: 200 }
}

export async function init(): Promise<InitResponse> {
  return { state: { private: { items: {} } } }
}

export async function getState(data: Data): Promise<Response<State>> {
  return { statusCode: 200, body: data.state }
}

export async function getInstanceId(): Promise<string> {
  return 'default'
}
