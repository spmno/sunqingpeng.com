---
title: nodejs与cpp相互调用
date: "2020-02-21T19:08:03.284Z"
description: "通过CPP实现nodejs与native层互相调用"
tags: ["nodejs", "native", "cpp", "n-api"]
---

Nodejs 与 native交互有3种方式：N-API，nan，直接使用V8，libuv及nodejs库。  
N-API是nodejs 8.0以上新发布的稳定的，主要解决版本兼容性。  
N-API 是C语言，版本C++版本是 https://github.com/nodejs/node-addon-api  

1. N-API使用方法：  
    `npm install node-gyp --save-dev`  
    `npm install -g --production windows-build-tools(windows下的编译环境）  `

根目录下建立工程文件binding.gyp  
```
    {  
        "targets": [  
        {  
          "target_name": "hello",  
          "sources": [ "hello.cc" ] 
        }  
      ]  
    }  
```  

建立hello.cc  
```  
    #include <node_api.h>  
    #include <assert.h>  

    napi_value Method(napi_env env, napi_callback_info info) {
      napi_status status;
      napi_value world;
      status = napi_create_string_utf8(env, "world", 5, &world);
      assert(status == napi_ok);
      return world;
    }

    #define DECLARE_NAPI_METHOD(name, func)                          \
      { name, 0, func, 0, 0, 0, napi_default, 0 }

    napi_value Init(napi_env env, napi_value exports) {
      napi_status status;
      napi_property_descriptor desc = DECLARE_NAPI_METHOD("hello", Method);
      status = napi_define_properties(env, exports, 1, &desc);
      assert(status == napi_ok);
      return exports;
    }

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
```  
编译文件 node-gyp rebuild，生成文件在build/Release目录下。  
建立hello.js并且调用  
```  
var addon = require('bindings')('hello');  
console.log(addon.hello()); // 'world'
```  
  
  
2. C++调用方法:  
    ```  
    npm install node-gyp --save-dev
    npm install -g --production windows-build-tools(windows下的编译环境）
    npm install node-addon-api --save
    ```  
    建立工程文件binding.gyp  
    ```  
    {
      "targets": [
        {
          "target_name": "hello",
          "cflags!": [ "-fno-exceptions" ],
          "cflags_cc!": [ "-fno-exceptions" ],
          "sources": [ "hello.cc" ],
          "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")"
          ],
          'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
        }
      ]
    }
    ```  
建立hello.cc
```  
#include <napi.h>

    Napi::String Method(const Napi::CallbackInfo& info) {
      Napi::Env env = info.Env();
      return Napi::String::New(env, "world");
    }

    Napi::Object Init(Napi::Env env, Napi::Object exports) {
      exports.Set(Napi::String::New(env, "hello"),
                  Napi::Function::New(env, Method));
      return exports;
    }

NODE_API_MODULE(hello, Init)
```    

编译node-gyp rebuild
建立hello.js并且运行

```  
    var addon = require('bindings')('hello');
    console.log(addon.hello()); // 'world'
```  


3. C++ 多函数导出用法：
Napi::Object functionexample::Init(Napi::Env env, Napi::Object exports) {
    exports.Set("hello", Napi::Function::New(env, functionexample::HelloWrapped));
    exports.Set("add", Napi::Function::New(env, functionexample::AddWrapped));
    return exports;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return functionexample::Init(env,exports);
}

4. c++ callback使用方法：
void RunCallback(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::Function cb = info[0].As<Napi::Function>();
  cb.Call(env.Global(), { Napi::String::New(env, "hello world") });
}

