import dotenv from 'dotenv';

import type { CodegenConfig } from '@graphql-codegen/cli';

dotenv.config();

const config: CodegenConfig = {
  schema: process.env.API_URL,
  documents: ['./graphql/**/*.graphql'],
  generates: {
    './src/generated/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
