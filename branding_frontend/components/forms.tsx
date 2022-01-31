import { stat } from "fs";
import { text } from "stream/consumers";

interface FormProps{
    prompt:string;
    setPrompt:any;
    onSubmit:any;
    isLoading:boolean;
    characterLimit:number;
}
const Form: React.FC<FormProps> =(props) => {

    const isPromptValid = props.prompt.length <= props.characterLimit;

    const updatePromptValue = (text: string) => {
        if(text.length <= props.characterLimit){
            props.setPrompt(text);
        }
    };
    let statusText = null;
    let statusColor = "text-slate-500";
    if(!isPromptValid){
        statusColor="text-red-400";
        statusText = `Input must be less than 32 characters`;
    }
    return (
    <>
  <div className="mb-6 text-center my-6 font-light">
          Tell me a product and I will generate tagline for you.
      </div>

        <input className="p-2 w-full rounded-md focus:outline-black-500 focus:outline text-slate-700"
            type="text" 
            placeholder="sandwich" 
            value= {props.prompt} 
            onChange={(e) => updatePromptValue(e.currentTarget.value)}>
        </input>

        <div className={statusColor + "flex justify-between my-2 mb-6 text-sm"}>
        <div>{statusText}</div>
            <div>
            {props.prompt.length}/{props.characterLimit}
            </div>
            </div>

          <button className="bg-gradient-to-r from-green-500 
        to-gray-400 disabled:opacity-50 w-full p-2 rounded-md text-lg" onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptValid}>
        Submit
      </button>
        </>
        );
    };
    export default Form;