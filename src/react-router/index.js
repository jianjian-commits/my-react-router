import React, { createContext, useContext, useMemo } from "react";
// import { matchPath } from "react-router";

// 导航上下文
const NavigationContext = createContext();
// 路径上下文
const LocationContext = createContext();
// 路由上下文
const RouteContext = createContext();

/**
 * @param {*} children 子组件
 * @param {*} location 当前的路径对象
 * @param {*} navigator history对象
 */
export function Router({ children, location, navigator }) {
  const navigationContext = useMemo(() => navigator, [navigator]);
  const locationContext = useMemo(() => location, [location]);
  return (
    // 最外面可以提供history
    <NavigationContext.Provider value={{ navigationContext }}>
      {/* //可以提供location */}
      <LocationContext.Provider
        value={{ locationContext }}
        children={children}
      />
    </NavigationContext.Provider>
  );
}

export function createRoutesFromChildren(children) {
  // children是虚拟dom数组
  const routers = [];
  // React.Children.forEach是react提供的一个工具方法，能够遍历react的子节点(vdom)
  // 还有React.Children.map ....等等
  React.Children.forEach(children, (element) =>
    routers.push({
      path: element.props.path,
      element: element.props.element,
    })
  );
  return routers;
}

export function useLocation() {
  return useContext(LocationContext).locationContext;
}

// 更具当前路由中的路径生成一个正则用于和当前地址栏中的路径比对 后续扩展
function compilePath(path) {
    let regexpSource = '^' + path;
    regexpSource += '$'
    const matcher = new RegExp(regexpSource)
    return matcher
}

/**
 * 
 * @param {*} path 当前的路由中的路径
 * @param {*} pathname 地址栏中的路径
 * @returns 
 */
export function matchPath(path, pathname) {
    // 得到一个正则
    const matcher = compilePath(path)
    const match = pathname.match(matcher)
    if(!match) return null;
    return match
}

export function useRouts(routes) {
  const location = useLocation();
  const pathname = location.pathname || "/";
  for (let i = 0; i < routes.length; i++) {
    const { path, element } = routes[i];
    // 将path和path进行比较
    const match = matchPath(path, pathname)
    if (match) {
      return element;
    }
  }
  return null;
}

export function Routes({ children }) {
  const routes = createRoutesFromChildren(children);
  return useRouts(routes);
}

export function Route() {}
