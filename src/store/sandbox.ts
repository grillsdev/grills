import { map } from 'nanostores'
import { SandboxStoreInterface } from '@/lib/types';

export const $sanboxObj = map<SandboxStoreInterface>({id:'', code:'', isStreaming:false})
