
![runtime preview](http://oss.normalhamal.online/6f2b0d359e947124e35daafc52757465.jpeg)

## react开启异步渲染的方法

1. unstable_createRoot 开启异步模式
2. unstable_deferredUpdates 设置低优先级，延迟更新
3. unstable_AsyncMode 异步组件

**react 更新日志**

> Remove `unstable_deferredUpdates` in favor of `unstable_scheduleWork` from `schedule` ([@gaearon](https://github.com/gaearon) in [#13488](https://github.com/facebook/react/issues/13488))
>
> Replace `React.unstable_AsyncComponent` with `React.unstable_AsyncMode`.([@acdlite](https://github.com/acdlite) in [#12117](https://github.com/facebook/react/pull/12117))
>
> Rename `unstable_AsyncMode` to `unstable_ConcurrentMode`. ([@trueadm](https://github.com/trueadm) in [#13732](https://github.com/facebook/react/pull/13732))

## 各分支在线预览

master: [preview](https://react-fiber-learning.normalhamal.now.sh/)

unstable_deferredUpdates: [preview](https://react-fiber-learning-baawfkagd.now.sh/)

unstable_scheduleWork: [preview](https://react-fiber-learning-2ul1bful4.now.sh/)

unstable_AsyncMode: [preview](https://react-fiber-learning-ivlzpk2gv.now.sh/)

unstable_ConcurrentMode: [preview](https://react-fiber-learning-7dtq1tz0e.now.sh/)

unstable_createRoot: [preview](https://react-fiber-learning-gfkp6j54a.now.sh/)

vue: [preview](https://sdp-l6706muf3.now.sh/)

debug-for-reconciliation: [preview](https://sdp-9gvztq5o3.now.sh)

debug-for-interrupt: [preview](https://sdp-6os525uzh.now.sh/)

## 各分支compare详情

**unstable_deferredUpdates vs master**

```
tick() {
+  ReactDOM.unstable_deferredUpdates(() => {
+    this.setState(state => ({ seconds: (state.seconds % 10) + 1 }));
+  });
-  this.setState(state => ({ seconds: (state.seconds % 10) + 1 }));
}
```

**unstable_scheduleWork vs master**

```
import { unstable_scheduleWork } from 'schedule';

tick() {
+  unstable_scheduleWork(() => {
+    this.setState(state => ({ seconds: (state.seconds % 10) + 1 }));
+  });
-  this.setState(state => ({ seconds: (state.seconds % 10) + 1 }));
}
```

**unstable_AsyncMode vs master**

```
ReactDOM.render(
+  <React.unstable_AsyncMode><ExampleApplication /></React.unstable_AsyncMode>,
-  <ExampleApplication />,
  document.getElementById('root')
);
```

**unstable_ConcurrentMode vs master**

```
ReactDOM.render(
+  <React.unstable_ConcurrentMode><ExampleApplication /></React.unstable_ConcurrentMode>,
-  <ExampleApplication />,
  document.getElementById('root')
);
```

**unstable_createRoot vs master**

```
+ const root = ReactDOM.unstable_createRoot(document.getElementById('root'));

+ root.render(<ExampleApplication />);

- ReactDOM.render(
-  <ExampleApplication />,
-  document.getElementById('root')
- );
```

**vue vs master**

一个是vue实现的，一个是react


**debug-for-reconciliation vs master**

debug-for-reconciliation是一个在react-dom.development.js中注入了各种埋点日志的分支。你可以清晰地看到整个reconciliation过程中workInprogress和nextEffect的流向。

**debug-for-interrupt vs master**

debug-for-interrupt是一个也在react-dom.development.js中注入了各种埋点日志的分支。你可以清晰地看到整个reconciliation过程中突然被高优先级任务打断时的workInprogress流向。
