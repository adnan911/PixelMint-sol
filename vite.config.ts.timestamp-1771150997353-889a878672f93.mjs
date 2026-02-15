// vite.config.ts
import { defineConfig } from "file:///D:/DarkDEV/PIXELMINT/pixel%20mint%20-%20Copy/node_modules/vite/dist/node/index.js";
import react from "file:///D:/DarkDEV/PIXELMINT/pixel%20mint%20-%20Copy/node_modules/@vitejs/plugin-react/dist/index.js";
import svgr from "file:///D:/DarkDEV/PIXELMINT/pixel%20mint%20-%20Copy/node_modules/vite-plugin-svgr/dist/index.js";
import path from "path";
import { miaodaDevPlugin } from "file:///D:/DarkDEV/PIXELMINT/pixel%20mint%20-%20Copy/node_modules/miaoda-sc-plugin/dist/index.js";
var __vite_injected_original_dirname = "D:\\DarkDEV\\PIXELMINT\\pixel mint - Copy";
var vite_config_default = defineConfig({
  plugins: [react(), svgr({
    svgrOptions: {
      icon: true,
      exportType: "named",
      namedExport: "ReactComponent"
    }
  }), miaodaDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEYXJrREVWXFxcXFBJWEVMTUlOVFxcXFxwaXhlbCBtaW50IC0gQ29weVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcRGFya0RFVlxcXFxQSVhFTE1JTlRcXFxccGl4ZWwgbWludCAtIENvcHlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0RhcmtERVYvUElYRUxNSU5UL3BpeGVsJTIwbWludCUyMC0lMjBDb3B5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHsgbWlhb2RhRGV2UGx1Z2luIH0gZnJvbSBcIm1pYW9kYS1zYy1wbHVnaW5cIjtcblxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgc3Zncih7XG4gICAgICBzdmdyT3B0aW9uczoge1xuICAgICAgICBpY29uOiB0cnVlLCBleHBvcnRUeXBlOiAnbmFtZWQnLCBuYW1lZEV4cG9ydDogJ1JlYWN0Q29tcG9uZW50JywgfSwgfSksIG1pYW9kYURldlBsdWdpbigpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1QsU0FBUyxvQkFBb0I7QUFDL1UsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFVBQVU7QUFFakIsU0FBUyx1QkFBdUI7QUFMaEMsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLO0FBQUEsSUFDcEIsYUFBYTtBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQU0sWUFBWTtBQUFBLE1BQVMsYUFBYTtBQUFBLElBQWtCO0FBQUEsRUFBRyxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7QUFBQSxFQUM5RixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
