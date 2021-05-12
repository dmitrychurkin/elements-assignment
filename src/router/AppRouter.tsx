import { FC, memo, PropsWithChildren } from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

const AppRouter: FC<PropsWithChildren<{}>> = ({ children }) => process.env.NODE_ENV === 'test'
    ? (
        <MemoryRouter>
            {children}
        </MemoryRouter>
    ) : (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );

export default memo(AppRouter);
