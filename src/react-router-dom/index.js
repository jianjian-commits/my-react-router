import { Router } from "../react-router";
import { useLayoutEffect, useRef, useState } from "react";
import { createHashHistory } from "history";

export * from "../react-router";

export function HashRouter({ children }) {
  const historyRef = useRef();
  if (!historyRef.current) {
    historyRef.current = createHashHistory();
  }

  console.log(historyRef.current);
  const history = historyRef.current;
  console.log(history);
  const [state, setState] = useState({
    action: history.action, // 表示当前的动作 push pop ...
    location: history.location, // 表示当前的路径 相当于window.history.pathname
  });

  // 监听history的变化 重新执行setState
  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      children={children}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    />
  );
}
