import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import dotenv from "dotenv";

dotenv.config();

import { envSchema } from "./env";

envSchema.parse(process.env);

export default defineConfig({
  plugins: [solid()],
});
