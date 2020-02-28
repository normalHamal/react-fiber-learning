
![runtime preview](http://oss.normalhamal.online/6f2b0d359e947124e35daafc52757465.jpeg)

## 各分支在线预览

master: [preview](https://react-fiber-learning.normalhamal.now.sh/)

unstable_deferredUpdates: [preview](https://react-fiber-learning-baawfkagd.now.sh/)

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

