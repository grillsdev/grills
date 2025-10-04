import { map } from 'nanostores'
import { SandboxStoreInterface, SelectedModel } from '@/lib/types';

export const $sanboxObj = map<SandboxStoreInterface>({id:'', code:{'page.tsx': "rn null"} , isStreaming:false})
export const $modelObj = map<SelectedModel>({model: null})