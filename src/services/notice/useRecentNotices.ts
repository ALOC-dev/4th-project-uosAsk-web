import { useEffect, useState } from "react";
import { getRecentNotices, RecentNotice, RECENT_NOTICE_EVENT } from "./recentNoticeQueue";

export const useRecentNotices = () => {
    const [recent, setRecent] = useState<RecentNotice[]>([]);

    useEffect(() => {
        setRecent(getRecentNotices());

        const handleStorage = (e: StorageEvent) => {
            if(e.key === "recent_notices") {
                setRecent(JSON.parse(e.newValue || "[]"));
            }
        };

        const handleImmediateUpdate = (e: Event) => {
            try {
                const detail = (e as CustomEvent<RecentNotice[]>).detail;
                if (Array.isArray(detail)) {
                    setRecent(detail);
                }
            } catch {}
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener(RECENT_NOTICE_EVENT, handleImmediateUpdate as EventListener);
        
        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener(RECENT_NOTICE_EVENT, handleImmediateUpdate as EventListener);
        }
    }, []);

    return { recent, setRecent };
};