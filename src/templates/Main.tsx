import type { ReactNode } from "react";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased flex ">
    <div className="mx-auto max-w-screen-md">
      <div className="border-gray-300 flex justify-center">
        {props.children}
      </div>
    </div>
  </div>
);

export { Main };
