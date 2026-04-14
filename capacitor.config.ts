import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.grapplingos.app',
  appName: 'GrapplingOS',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
