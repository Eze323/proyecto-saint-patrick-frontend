// server/plugins/nitro-plugin.ts
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('request', (event) => {
      console.log(`Nitro Request: ${event.method} ${event.path}`);
    });
  });