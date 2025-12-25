import { Notify } from 'quasar'


export function useNotify() {

    const notify = (message: string, type: string, icon: string) => {
        Notify.create({
            message: message,
            type: type,
            icon: icon
        })
    }

    return {
        notify
    }
}