import { map } from 'nanostores'
import { SandboxStoreInterface, SelectedModel, AddedImage } from '@/lib/types';

export const $sanboxObj = map<SandboxStoreInterface>({id:'', code:{'page.tsx': "rn null"} , isStreaming:false})
export const $modelObj = map<SelectedModel>({model: null})
export const $userImage = map<AddedImage>({chatId:"", images:[]})