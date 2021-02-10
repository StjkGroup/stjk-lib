# fay react lib
####工具库

# Usage
`npm i @stjk/lib`

# fetch
```javascript
import {get, put, post, remove, getJson, putJson, postJson, removeJson} from '@stjk/lib/fetch';
get({path, data, headers, type});
put({path, data, headers, defaultQuery, type});
post({path, data, headers, type});
remove({path, data, headers, type});
```
* getJson, putJson, postJson, removeJson对应get,put,post,remove的返回值转成JSON对象
