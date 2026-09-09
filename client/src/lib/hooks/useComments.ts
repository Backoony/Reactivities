import { useLocalObservable } from "mobx-react-lite"
import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { useEffect, useRef } from "react";
import { runInAction } from "mobx";

export const useComments = (activityId?:string) => {
    const created = useRef(false);  //值在钩子内部是稳定的不会被修改
    const commentStore = useLocalObservable(() => ({     //使用()隐式返回
        comments:[] as ChatComment[],
        hubConnection : null as HubConnection | null,

        createHubConnection(activityId: string) {       //创建连接
            if(!activityId) return;

            this.hubConnection = new HubConnectionBuilder().withUrl(`${import.meta.env.VITE_COMMENT_URL}?activityId=${activityId}`,{
                withCredentials:true    //指定以在请求中传递Cookie
            }).withAutomaticReconnect().build();  //自动尝试重新连接

            this.hubConnection.start().catch(error=>console.log('Error establishing connection: ', error));

            this.hubConnection.on('LoadComments', comments => {
                runInAction(()=>{
                    this.comments = comments;
                })
            });

            this.hubConnection.on('ReceiveComment',comment => {
                runInAction(()=>{
                    this.comments.unshift(comment);
                })
            })
        },

        stopHubConnection(){       //停止连接
            if (this.hubConnection?.state === HubConnectionState.Connected) {
                this.hubConnection.stop().catch(error => console.log('Error stopping connection: ',error));
            }
        }
    }));

    useEffect(()=>{
        if (activityId && !created.current) {
            commentStore.createHubConnection(activityId);
            created.current = true;
        }
        return () => {
            commentStore.stopHubConnection();
            commentStore.comments = [];
        }
    },[activityId,commentStore])

    return { commentStore };
}