# reactflow-ts

TODO list: 
* use redux as SSOT
* porting ```src/Graph``` to ts
* hold at ```yourdomain.com```


## Run

compile

```
tsc -p tsconfig.app.json
```

lint
```
npx eslint --fix .
```

hold
```
npm run dev
```



## Debug Redux

at ```package.json```
```
"dev": "NODE_ENV=DEBUG vite",
```

in browser, F12 and type 

```
window.store.getState().subGraphs
```
