export * from 'react-router-dom';

declare module "react-router-dom" {
    export function useRoutes(arg: Array<any>): any;
    export function useNavigate(): any;
}