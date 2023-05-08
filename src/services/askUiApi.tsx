import connection from "./connect";


export interface IAskAiApi {
    getToken(): Promise<string>;
    getInference(data:questionData): Promise<string>;
    getChunkByChunkId(chunkId: string,token:string): Promise<string>;

}

export interface questionData {
    question: string;
    
}

interface ITokenResponse {
    token: string;
}

export class AskAiApi implements IAskAiApi {

    private tokenTimestamp: number = 0;
    private token: string = '';

    private possibleApiKeysForInference: string[] = [
        '7c4e87e6-aef8-467a-b43a-4f80147453bf',
        '3211bc12-9ba4-4169-b8a3-dbc92494fa76',
        'e4f24b15-f271-4abd-8c8f-3ec106941bfa']

    private possibleApiKeysForChunk: string[] = [
        'd486a94c-29f4-453a-a822-f909a97dbfa7',
        'aa156e6b-0f41-4ef7-ae7a-f9ff8b5b5ad3',
        '43ecda4c-7ee1-4acb-a50f-7f81e4c90719'
    ]         

    constructor() {
    }

    private setTokenTimestamp() {
        this.tokenTimestamp = Date.now();
    }

    private async refreshToken() {
        let response = {token:''};
        try{
            connection.init(this.possibleApiKeysForChunk[0]);
            response = await connection.post<ITokenResponse>("https://chunk-holder.hw.ask-ai.co/auth/generate-token",{});
        }
        catch(e){
            console.log(e);
        }
        
        this.token =  response.token;
    }

    public async getToken(): Promise<string> {
        if (this.tokenTimestamp == 0 || this.tokenTimestamp + 60000 < Date.now()) {
            this.setTokenTimestamp();
            await this.refreshToken();
        }
        return this.token;
    }

    public async getInference<T>(data:questionData): Promise<T> {
        connection.init(this.possibleApiKeysForInference[1]);
        const response = await connection.post<T>('https://inference-runner.hw.ask-ai.co/ask',data);
        return response;
    }

    public async getChunkByChunkId(chunkId: string,token:string): Promise<string> {
        const response = await connection.get<string>('https://chunk-holder.hw.ask-ai.co/chunks/' + chunkId,{ headers:{'Authorization': token} });
        return response;
    }

}
const askAiApi = new AskAiApi();
export default askAiApi;