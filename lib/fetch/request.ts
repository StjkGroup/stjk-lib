/**
 * Created by feichongzheng on 17/1/5.
 */
import {getPublicPathWithoutStartAndEndForwardSlash} from '../publicPath';
import {getUser} from '../user';
import cookies from '../cookie';

const authorization = () => {
  const user = getUser();
  let authorization = undefined;
  if(user && user.token){
    const {token, tokenType} = user;
    if(tokenType === 'Bearer Token'){
      authorization = 'Bearer ' + token;
    }else{
      authorization = JSON.stringify({token});
    }
  }
	return authorization;
};

export interface HeadersType {
	[key: string]: any
}

export type ParamsType = 'formData' | null;

const getHeaders = (headers?: HeadersType, paramsType?: ParamsType) => {
  const token = cookies.get('X-MOBILE-TOKEN');
  const authHeader: any = {
    'Authorization': authorization(),
  }
  if(token){
    authHeader['X-MOBILE-TOKEN'] = token;
  }
  if(paramsType === 'formData'){
    return {
      ...authHeader,
      ...headers
    }
  }
	return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...authHeader,
    ...headers
  };
};

export const getQueryString = (params:any) => {
	if(params){
		const arr:string[] = [];
		Object.keys(params).forEach((key: string) => {
			arr.push(key + '=' + encodeURIComponent(params[key]));
		});
		return '?' + arr.join('&');
	}else{
		return '';
	}
};

interface ReqBrace {
	method: string,
	contentType?: string,
	acceptType?: string,
	auth?: boolean,
	params?: any,
  cache?: string
  headers?: HeadersType
}

export const reqGetBrace = ({method, cache='no-cache', headers}:ReqBrace) => {
	return {
		method,
		headers: getHeaders(headers),
		credentials: 'same-origin',
		mode: 'cors',
		cache
	};
};

export const reqPostBrace = ({method, params = {}, headers}:ReqBrace) => {
  let paramsType: ParamsType = null;
  let body = params;
  if(params instanceof FormData){
    paramsType = 'formData';
  }else{
    const contentType = headers ? headers['Content-Type'] : undefined;
    if((!contentType || contentType === 'application/json') && typeof params === 'object'){
      body = JSON.stringify(params);
    }
  }
	return {
		method,
		headers: getHeaders(headers, paramsType),
		credentials: 'same-origin',
		mode: 'cors',
		cache: 'no-cache',
		body
	};
};

export interface CustomPromise extends Promise<any>{
	abort: Function
}

interface PromiseType{
  url:string
  options: object
  type?:string
}

export const promise = ({url, options = {}, type}: PromiseType) => {
  let controller: AbortController | undefined;
  let signal: AbortSignal|undefined = undefined;
  try {
    controller = new AbortController();
    signal = controller.signal;
  } catch (error) {
    controller = undefined;
  }
	const _promise: any = new Promise<any>((resolve, reject) => {
		fetch(url, {...options, signal}).then((res) => {
      const status = res.status;
      let canResolve = false;
			if(res.ok){
				if(window.fetchInterceptor){
					window.fetchInterceptor(res, type).then((fetchInterceptorRes) => {
						resolve(fetchInterceptorRes);
					});
				}else{
          canResolve = true;
				}
			}else{
				if (status === 401 || status === 403) {
					const publicPath = getPublicPathWithoutStartAndEndForwardSlash();
					const scope = publicPath ? '/' + publicPath : '';
					const pathname = parent.location.pathname;
					pathname === scope + '/login' || (parent.location.href = scope + '/login?redirectUrl=' + encodeURIComponent(parent.location.href));
				} else{
          canResolve = true;
        }
      }
      if(canResolve){
        if(type === 'json'){
          res.json().then((result) => {
            const errCodes = ['106', '105'];
            if(errCodes.includes(result.errorCode)){
              parent.location.href = '/management/login?redirectUrl='+encodeURIComponent(location.href);
            }else{
              resolve({status, ...result});
            }
          })
        }else{
          resolve(res);
        }
      }
		}).catch((err) => {
			reject(err);
		});
	});
	_promise.abort = () => {
    if(controller){
      controller.abort();
    }else{
      console.error('can not support AbortController');
    }
	};
	const customPromise: CustomPromise = _promise;
	return customPromise;
};
