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

    return (
    <>
        <p>
            Always here to help you find the best snippet for your brand. Go ahead and enter any product!
        </p>
        <input 
            type="text" 
            placeholder="cars" 
            value= {props.prompt} 
            onChange={(e) => updatePromptValue(e.currentTarget.value)}>
        </input>
        <div>{props.prompt.length}/{props.characterLimit}</div>
        <button onClick={props.onSubmit} disabled={props.isLoading || !isPromptValid}>
            Submit
        </button>
        </>
        );
    };
    export default Form;