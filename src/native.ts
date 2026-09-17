import { Capacitor, registerPlugin, WebPlugin } from "@capacitor/core";
// Capacitor-capable web host: native SystemBars is a no-op in the browser.

type SystemBarsPlugin = {
  setStyle(options: { style: string }): Promise<void>;
  setAnimation(options: { animation: string }): Promise<void>;
  show(): Promise<void>;
  hide(options?: { animation?: string }): Promise<void>;
};

class SystemBarsWeb extends WebPlugin implements SystemBarsPlugin {
  async setStyle(): Promise<void> {
    return;
  }
  async setAnimation(): Promise<void> {
    return;
  }
  async show(): Promise<void> {
    return;
  }
  async hide(): Promise<void> {
    return;
  }
}

const SystemBars = registerPlugin<SystemBarsPlugin>("SystemBars", {
  web: () => new SystemBarsWeb(),
});

/** Hide native chrome on Capacitor iOS/Android; no-op on the web host. */
export async function lockNativeChrome(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await SystemBars.setStyle({ style: "DARK" });
    await SystemBars.hide({ animation: "NONE" });
  } catch {
    // Web and older Capacitor runtimes skip SystemBars.
  }
}
