import { atom, map } from 'nanostores'
import { SandboxStoreInterface } from '@/lib/types';


export const $sandbox = atom<SandboxStoreInterface>({id:'', code:'', isStreaming:false})


export const updateSandboxStore = (sandbox:SandboxStoreInterface) => {
    $sandbox.set(sandbox)
}

export const $sanboxObj = map<SandboxStoreInterface>({id:'', code:'', isStreaming:false})
