import { coverageConfigDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		coverage: {
			provider: "istanbul",
			exclude: [
				"next.config.mjs",
				"src/middleware.ts",
				"src/utils/*",
				...coverageConfigDefaults.exclude
			]
		}
	},
})