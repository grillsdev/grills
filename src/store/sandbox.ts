import { atom } from 'nanostores'
import { SandboxStoreInterface } from '@/lib/types';


export const $sandbox = atom<SandboxStoreInterface>({id:'', code:''})


export const addNewSandbox = (sandbox:SandboxStoreInterface) => {
    $sandbox.set(sandbox)
}