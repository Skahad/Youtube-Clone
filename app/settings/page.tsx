"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function SettingsPage() {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const username = user?.handle || "@me";
        router.replace(`/settings/general/${username}`);
    }, [user, router]);

    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
