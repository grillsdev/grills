import { auth } from "@/lib/auth";

import Sandbox from "@e2b/code-interpreter";


export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: req.headers,
    });
    if (!session) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { sandboxAPI, msgId, code, pkgs } = await req.json() as {
            sandboxAPI: string;
            msgId: string;
            code: Record<string, string>;
            css: string;
            pkgs: string[]
        };

        if (!sandboxAPI || !msgId) {
            return Response.json(
                { error: "Missing required parameters: sandboxAPI and msgId" },
                { status: 400 }
            );
        }

        // If sandbox with same msgId is already present just return the preview
        const sandboxes = await Sandbox.list({
            apiKey: sandboxAPI,
            query: {
                metadata: {
                    sandboxId: `grills:${msgId}`,
                    msgId
                },
            },
        });

        const sandboxList = await sandboxes.nextItems();

        if (sandboxList.length > 0) {
            const newSandbox = sandboxList[0];
            console.warn("state of already created sandbox", newSandbox.state)
            return Response.json({
                e2bSandboxAPI: sandboxAPI,
                e2bSandboxId: `grills:${msgId}`,
                previewUrl: `https://3000-${newSandbox.sandboxId}.e2b.app`,
            });
        }

        // If sandbox is in process of creating it; get the status and if it is started return
        const sandbox = await Sandbox.create(process.env.SANDBOX_ID!, {
            apiKey: sandboxAPI,
            timeoutMs: 500000,
            metadata: {
                sandboxId: `grills:${msgId}`,
                msgId
            }
        });


        //downlodes the pakages 
        if(pkgs && pkgs.length>0){
            await sandbox.commands.run(`bun add ${pkgs.join(' ')}`);
        }
    

        // converting the code obj into e2b sandbox files format
        for (const [key, value] of Object.entries(code)) {
            await sandbox.files.write(key, value)
        }

        const previewUrl = `https://${sandbox.getHost(3000)}`;


        return Response.json({
            e2bSandboxAPI: sandboxAPI,
            e2bSandboxId: `grills:${msgId}`,
            previewUrl,
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return Response.json(
            { error: "Failed to create sandbox", message: errorMessage },
            { status: 400 }
        );
    }
}