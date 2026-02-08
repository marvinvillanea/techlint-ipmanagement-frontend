import type { ControllerModule, ConfigModule } from "./controllerInterface/types";

const controllers = import.meta.glob<Promise<ControllerModule>>("@appControllers/*/*.tsx");
const configs = import.meta.glob<Promise<ConfigModule>>("@appControllers/*/config.ts");

export async function LoadController(name: string) {
    const controllerKey = Object.keys(controllers)
        .find(p => p.includes(`/${name}Controller/${name}Controller.tsx`));

    const configKey = Object.keys(configs)
        .find(p => p.includes(`/${name}Controller/config.ts`));

    const controller: ControllerModule | null = controllerKey
        ? await controllers[controllerKey]()
        : null;

    const config: ConfigModule | null = configKey
        ? await configs[configKey]()
        : null;

    // get standard functions (exclude default)
    const standardFunctions = controller
        ? Object.fromEntries(
            Object.entries(controller).filter(([key]) => key !== "default")
        )
        : {};

    // type-safe default handling
    const component = controller?.default ?? null;
    const cfg = typeof config?.default === "function" ? config.default() : null;

    return {
        component,
        standardFunctions,
        config: cfg
    };
}
