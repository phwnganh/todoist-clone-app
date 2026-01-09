import express, { type Request, type Response} from "express";
import cors from "cors"
const app = express();
const PORT = 9999;

type OauthTokenResponse = {
    access_token: string;
    token_type: string;
}
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json());

app.post('/oauth/access-token', async (req: Request<{code: string}>, res: Response) => {
    const {code} = req.body;

    if(!code) {
        return res.status(400).json({
            message: "Missing authorization code"
        })
    }
        try {
            const result = await fetch("https://todoist.com/oauth/access_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: "99176cc6e6af4dee9508f6422eb3216f",
                    client_secret: "37e90dfb1c1d4e5286180e9452fe5d30",
                    redirect_uri: "http://localhost:5173/google-redirect",
                    code: code
                }),
            })

            if(!result.ok){
                return res.status(result.status).json({
                    message: "OAuth failed!"
                })
            }

            const data: OauthTokenResponse = await result.json()
            if(!data.access_token) {
                return res.status(401).json({
                    message: "Missing token",
                    data
                })
            }

            return res.json({
                access_token: data.access_token,
                token_type: data.token_type
            })
        }catch(err){
            return res.status(500).json({
                message:err.message,
            })

        }
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})
