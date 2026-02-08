// types for controller module
export interface ControllerModule {
    default?: React.ComponentType<any>; // default export (React component)
    [key: string]: any;                  // other named exports (standardFunctions)
}

// types for config module
export interface ConfigModule {
    default?: () => any;                 // default function that returns config
    [key: string]: any;
}