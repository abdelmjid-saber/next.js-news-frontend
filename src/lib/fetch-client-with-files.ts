import { getSession, signOut } from "next-auth/react";

interface fetchClientProps {
    method?: string;
    url: string;
    body?: string | FormData;
    token?: string;
}

async function fetchClientWithFiles({ method = "GET", url, body = "", token }: fetchClientProps) {
    try {
        const session = await getSession();
        const accessToken = token || session?.accessToken;

        const response = await fetch(url.toString(), {
            method: method,
            headers: {
                Authorization: "Bearer" + accessToken
            },
            body: body || undefined,
        });

        if (!response.ok) {
            throw response;
        }

        return response;
    } catch (error) {
        if (error instanceof Response) {
            if (error.status === 401) {
                signOut();
            }

            if (error.status === 409) {
                window.location.href = "/request-email-verification";
            }

            throw error;
        }

        throw new Error("Failed to fetch data", { cause: error });
    }
}

export default fetchClientWithFiles;
