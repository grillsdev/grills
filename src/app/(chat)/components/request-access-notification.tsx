import {  useEffect} from 'react'
import useSWRSubscription from 'swr/subscription'
import { toast } from "sonner"
import { ProjectAccessRequest } from '@/lib/types'
import {BellRing, Loader2} from "lucide-react"
import useSWRMutation from 'swr/mutation'
import { acceptAccessRequest } from '@/lib/fetchers'

//adminId is logedIn users userId
// it get reder on everyrequest so add the uniqkey refercen past and current if bioth are different then rerender other wice no rerender
const RequestAccessNotification = () => {
  const {data} = useSWRSubscription<ProjectAccessRequest>(`/api/project`, (key: string, {next}: {next: (error: Error | null, data?: ProjectAccessRequest) => void}) => {
    const es = new EventSource(key)
    es.addEventListener('message', ({data}) => {
      next(null, JSON.parse(data))
    })
    es.addEventListener('error', () => next(new Error("Fetch Error")))
    return () => es.close()
  })
  
  const {trigger, isMutating} = useSWRMutation(`/api/project/${data?.requestedProject}/accept`, acceptAccessRequest)

  useEffect(() => {
    if (!data) return

    const handleAccept = async () => {
      try {
       const tr =  await trigger(data)
       toast.dismiss(data.id)
       if(tr!==200){
        toast.error("Error while accepting the request", {position: "top-right"})
       }
      } catch (error) {
        console.error('Accept failed:', error)
      }
    }

    const handleReject = () => {
      toast.dismiss(data.id)
    }

    toast(
      <div>
        {data.userRequestedName} requested access to the chat <span className='underline text-blue-500'>{data.requestedProjectTitle}</span>
      </div>,
      {
        id: data.id,
        cancel: {
          label: 'Reject',
          onClick: handleReject,
        },
        action: {
          label: 'Accept',
          onClick: handleAccept,
        },
        icon: isMutating ? <Loader2 width={19} /> : <BellRing width={19} />,
        duration: 30000,
      }
    )
  }, [data, trigger, isMutating])

  return null
}

export default RequestAccessNotification

