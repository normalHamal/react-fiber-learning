
![runtime preview](http://oss.normalhamal.online/6f2b0d359e947124e35daafc52757465.jpeg)

## 各分支在线预览

master: [preview](https://react-fiber-learning.normalhamal.now.sh/)

unstable_deferredUpdates: [preview](https://react-fiber-learning-baawfkagd.now.sh/)

unstable_scheduleWork: [preview](https://react-fiber-learning-2ul1bful4.now.sh/)

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
