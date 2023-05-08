import askAiApi from "./askUiApi";


export interface IAnswer{
    answer:string;
    confidence:number;
}

export interface IChunks{
    "chunks": [{'chunkId':string,'confidence':number}];
}

export interface ISessionService {
    askQuestion(question:string): Promise<IAnswer[]>;

}

class Session implements ISessionService{
    private minConfidence:number;

    public constructor(confidence:number = 70) {
        this.minConfidence = confidence;    
    }

    private cleanHtmlTagsFromStr(str:string):string{
        return str.replace(/<\/?[^>]+(>|$)/g, "\n");
    }

    

   async askQuestion(question:string): Promise<IAnswer[]> {
        let result:IAnswer[] = [];
        try{
            let chunks:IChunks = await askAiApi.getInference<IChunks>({question:question});
            console.log(chunks);
            for (let chunk of chunks.chunks){
                if (chunk.confidence >= this.minConfidence){
                  let answer = await askAiApi.getChunkByChunkId(chunk.chunkId,await askAiApi.getToken());
                  result.push({answer: this.cleanHtmlTagsFromStr(answer),confidence:chunk.confidence});
                }                
            }            
          }
        catch(e){
            console.log(e);
        }
        if (result.length == 0){
            result.push({answer: "Sorry, I don't know the answer to that question",confidence:0});
        }
        
        result.sort((a,b)=>{return b.confidence - a.confidence});

        return result
    }   
}
const sessionService = new Session();
export default sessionService;