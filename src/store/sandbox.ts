import { map } from 'nanostores'
import { SandboxStoreInterface } from '@/lib/types';

export const $sanboxObj = map<SandboxStoreInterface>({id:'', code:{'page.tsx': "rn null"} , isStreaming:false})
