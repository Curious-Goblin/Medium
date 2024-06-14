import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Singin = () => {
    try{
        return (
            <>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div>
                        <Auth type="signin"/>
                    </div>
                    <div className="hidden lg:block">
                        <Quote />
                    </div>
                </div>
            </>
        )
    }
    catch(error){
        alert(console.log(error))
        return(
            <div>
                Some error has occured please check you input format 
            </div>
        )
    }
}