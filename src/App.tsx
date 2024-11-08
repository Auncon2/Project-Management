import { RouterProvider } from "react-router";
import { routers } from "./router";
import { App, ConfigProvider } from "antd";

import { useRef } from "react";

import "./App.css";
import { Notifications } from "react-push-notification";

function MyApp() {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6657af",
        },
      }}
      getPopupContainer={() => modalContainerRef.current as HTMLElement}
    >
      <App>
        <div ref={modalContainerRef}>
          <RouterProvider router={routers} />

          <Notifications />
        </div>
      </App>
    </ConfigProvider>
  );
}
export default MyApp;
