import {VercelRequest, VercelResponse} from "@vercel/node";

type OauthTokenResponse = {
    access_token: string;
    token_type: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse){
    if(req.method !== 'POST'){
        return res.status(405).json({message: "Method Not Allowed"});
    }
    const {code} = req.body;

    if(!code){
        return res.status(400).json({
            message: "Missing authorization code",
        })
    }

    try {
        const result = await fetch("https://api.todoist.com/oauth/access_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: "99176cc6e6af4dee9508f6422eb3216f",
                client_secret: "f799765b62e344ac9b76b6438682e65c",
                redirect_uri: "https://todoist-clone-app-five.vercel.app/google-redirect",
                code: code
            })
        })
        const data: OauthTokenResponse | {error: string} = await result.json()
        if(!result.ok){
            return res.status(result.status).json({
                message: "OAuth failed!",
                data: data
            })
        }
        if(!("access_token" in data) || !data.access_token){
            return res.status(401).json({
                message: "Missing token",
                data
            })
        }

        return res.status(200).json({
            access_token: data.access_token,
            token_type: data.token_type,
        })
    }catch(error){
        const message = error instanceof Error ? error.message : "Internal server error";
        return res.status(500).json({
            message: message,
        })
    }
}